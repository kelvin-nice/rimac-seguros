import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import HomePage from '../../ui/pages/HomePage';
import { vi, describe, test, expect, beforeEach } from 'vitest';

import { fetchPlans } from '../../application/getPlansUseCase';
import { fetchUser } from '../../application/getUserUseCase';

// Mocks
vi.mock('../../application/getPlansUseCase', () => ({
  fetchPlans: vi.fn(),
}));

vi.mock('../../application/getUserUseCase', () => ({
  fetchUser: vi.fn(),
}));

const renderWithRouter = (ui) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

// Datos de prueba
const mockUser = { name: 'Rocío' };
const mockPlans = {
  list: [
    { 
      name: 'Plan en Casa', 
      description: ['Desc 1', 'Desc 2', 'Desc 3'], 
      price: 100,
      age: 30
    },
    { 
      name: 'Plan en Casa y Clínica', 
      description: ['Desc 1', 'Desc 2', 'Desc 3'], 
      price: 200,
      age: 30,
      additionalIcon: 'plan-recomendado.svg'
    },
    { 
      name: 'Plan en Casa + Chequeo ', // <-- espacio al final
      description: ['Desc 1', 'Desc 2', 'Desc 3'], 
      price: 300,
      age: 30
    }
  ]
};

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    fetchUser.mockResolvedValue(mockUser);
  });

  test('debe mostrar el loading inicial', async () => {
    fetchUser.mockResolvedValueOnce(null);

    await act(async () => {
      renderWithRouter(<HomePage />);
    });

    expect(screen.getByText('Cargando datos del usuario...')).toBeInTheDocument();
  });

  test('debe mostrar el nombre del usuario cuando se cargan los datos', async () => {
    await act(async () => {
      renderWithRouter(<HomePage />);
    });

    expect(await screen.findByText('Rocío, ¿Para quién deseas cotizar?')).toBeInTheDocument();
  });

  test('debe mostrar las opciones "Para mí" y "Para alguien más"', async () => {
    await act(async () => {
      renderWithRouter(<HomePage />);
    });

    expect(await screen.findByText('Para mí')).toBeInTheDocument();
    expect(await screen.findByText('Para alguien más')).toBeInTheDocument();
  });

  test('debe filtrar los planes correctamente cuando se selecciona "Para mí"', async () => {
    fetchPlans.mockResolvedValue(mockPlans);

    await act(async () => {
      renderWithRouter(<HomePage />);
    });

    // Esperar a que cargue el usuario
    await screen.findByText('Rocío, ¿Para quién deseas cotizar?');

    const paraMiOption = await screen.findByText('Para mí');

    await act(async () => {
      await userEvent.click(paraMiOption);
    });

    // -----> Bloque para debug <-----
    const allTestIds = screen.queryAllByTestId(/plan-card-/).map(node => node.getAttribute('data-testid'));
    console.log('TestIDs encontrados:', allTestIds);

    // Verificar que los planes se muestren correctamente
    await waitFor(async () => {
      expect(fetchPlans).toHaveBeenCalledTimes(1);

      expect(await screen.findByTestId('plan-card-plan-en-casa')).toBeInTheDocument();
      expect(await screen.findByTestId('plan-card-plan-en-casa-y-clínica')).toBeInTheDocument();
      // El testid correcto según el log: 'plan-card-plan-en-casa-+-chequeo-'
      expect(await screen.findByTestId('plan-card-plan-en-casa-+-chequeo-')).toBeInTheDocument();

      expect(await screen.findByTestId('plan-price-plan-en-casa')).toHaveTextContent('$100.00 al mes');
      expect(await screen.findByTestId('plan-price-plan-en-casa-y-clínica')).toHaveTextContent('$200.00 al mes');
      expect(await screen.findByTestId('plan-price-plan-en-casa-+-chequeo-')).toHaveTextContent('$300.00 al mes');
    }, { timeout: 5000 });
  });

  test('debe aplicar descuento del 5% cuando se selecciona "Para alguien más"', async () => {
    fetchPlans.mockResolvedValue({
      list: mockPlans.list.slice(0, 2) // Solo primeros dos planes
    });

    await act(async () => {
      renderWithRouter(<HomePage />);
    });

    await screen.findByText('Rocío, ¿Para quién deseas cotizar?');

    const paraOtroOption = await screen.findByText('Para alguien más');

    await act(async () => {
      await userEvent.click(paraOtroOption);
    });

    await waitFor(async () => {
      const priceElement1 = await screen.findByTestId('plan-price-plan-en-casa');
      expect(priceElement1).toHaveTextContent('$95.00 al mes');

      const priceElement2 = await screen.findByTestId('plan-price-plan-en-casa-y-clínica');
      expect(priceElement2).toHaveTextContent('$190.00 al mes');
    }, { timeout: 5000 });
  });

  test('debe manejar errores al cargar datos del usuario', async () => {
    fetchUser.mockRejectedValueOnce(new Error('Error de red'));

    await act(async () => {
      renderWithRouter(<HomePage />);
    });

    expect(screen.getByText('Cargando datos del usuario...')).toBeInTheDocument();
  });
});
