import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { vi, describe, test, expect, beforeEach } from 'vitest';
import LoginPage from './LoginPage';

// Mock Footer
vi.mock('../components/Footer', () => ({
  __esModule: true,
  default: () => <div data-testid="footer-mock" />,
}));

// Mock images
vi.mock('../assets/imagen-familia.png', () => ({ default: '' }));
vi.mock('../assets/check.svg', () => ({ default: '' }));
vi.mock('../assets/arrow-down-select.svg', () => ({ default: '' }));
vi.mock('../assets/blur-blue-d.png', () => ({ default: '' }));
vi.mock('../assets/blur-blue-s.png', () => ({ default: '' }));
vi.mock('../assets/blur-fuccia-d.png', () => ({ default: '' }));
vi.mock('../assets/blur-fuccia-s.png', () => ({ default: '' }));

// Mock useNavigate
const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
    MemoryRouter: actual.MemoryRouter,
  };
});

const setup = () => {
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );
  const inputDocument = screen.getByLabelText(/N° de Documento/i);
  const inputCelular = screen.getByLabelText(/Celular/i);
  const select = screen.getByRole('combobox');
  const checkPolitica = screen.getByLabelText(/privacidad/i);
  const checkComunicaciones = screen.getByLabelText(/Comunicaciones Comerciales/i);
  const submitBtn = screen.getByRole('button', { name: /Cotiza aquí/i });
  return { inputDocument, inputCelular, select, checkPolitica, checkComunicaciones, submitBtn };
};

describe('LoginPage', () => {
  beforeEach(() => {
    mockedNavigate.mockClear();
  });

  test('Renderiza campos, select y checkboxes', () => {
    const { inputDocument, inputCelular, select, checkPolitica, checkComunicaciones, submitBtn } = setup();
    expect(inputDocument).toBeInTheDocument();
    expect(inputCelular).toBeInTheDocument();
    expect(select).toBeInTheDocument();
    expect(checkPolitica).toBeInTheDocument();
    expect(checkComunicaciones).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
    expect(screen.getByTestId('footer-mock')).toBeInTheDocument();
  });

  test('Sólo permite números en DNI y celular', async () => {
    const { inputDocument, inputCelular } = setup();
    await userEvent.type(inputDocument, 'abc1234!@#567');
    expect(inputDocument.value).toBe('1234567'); // maxLength para DNI es 8
    await userEvent.type(inputCelular, 'celu123456!@#');
    expect(inputCelular.value).toBe('123456');
  });

  test('Cambiar de DNI a RUC limpia el input', async () => {
    const { inputDocument, select } = setup();
    await userEvent.type(inputDocument, '12345678');
    expect(inputDocument.value).toBe('12345678');
    fireEvent.change(select, { target: { value: 'ruc' } });
    expect(inputDocument.value).toBe('');
  });

  test('Muestra error si datos incorrectos', async () => {
    const { inputDocument, inputCelular, checkPolitica, checkComunicaciones, submitBtn } = setup();
    await userEvent.type(inputDocument, '11111111');
    await userEvent.type(inputCelular, '999999999');
    await userEvent.click(checkPolitica);
    await userEvent.click(checkComunicaciones);
    await act(async () => {
      await userEvent.click(submitBtn);
    });
    expect(screen.getAllByText(/Credenciales incorrectas/i)).toHaveLength(2);
    expect(mockedNavigate).not.toHaveBeenCalled();
  });

  test('Muestra error si no acepta políticas', async () => {
    const { inputDocument, inputCelular, submitBtn } = setup();
    await userEvent.type(inputDocument, '30216147');
    await userEvent.type(inputCelular, '5130216147');
    await act(async () => {
      await userEvent.click(submitBtn);
    });
    expect(screen.queryByText(/Credenciales incorrectas/i)).not.toBeInTheDocument();
    expect(mockedNavigate).not.toHaveBeenCalled();
  });

  test('Login exitoso navega a /home', async () => {
    const { inputDocument, inputCelular, checkPolitica, checkComunicaciones, submitBtn } = setup();
    await userEvent.type(inputDocument, '30216147');
    await userEvent.type(inputCelular, '5130216147');
    await userEvent.click(checkPolitica);
    await userEvent.click(checkComunicaciones);
    await act(async () => {
      await userEvent.click(submitBtn);
    });
    expect(mockedNavigate).toHaveBeenCalledWith('/home');
    expect(screen.queryByText(/Credenciales incorrectas/i)).not.toBeInTheDocument();
  });

  test('Login exitoso con RUC navega a /home', async () => {
    const { inputDocument, inputCelular, select, checkPolitica, checkComunicaciones, submitBtn } = setup();
    fireEvent.change(select, { target: { value: 'ruc' } });
    await userEvent.type(inputDocument, '10888692966');
    await userEvent.type(inputCelular, '5130216147');
    await userEvent.click(checkPolitica);
    await userEvent.click(checkComunicaciones);
    await act(async () => {
      await userEvent.click(submitBtn);
    });
    expect(mockedNavigate).toHaveBeenCalledWith('/home');
  });
});