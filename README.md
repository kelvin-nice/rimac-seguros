# Documentación del Proyecto Rimac Seguros

## 🛠️ Tecnologías utilizadas
- ⚛️ React
- ⚡ Vite
- 🎨 SASS (SCSS Modules)
- 📦 npm

---

## 📁 Estructura del proyecto

![image](https://github.com/user-attachments/assets/9062173d-c8e3-445f-8e3b-9704c84f58ca)

---

## Componentes Clave

### 1. CardPlans
Componente para mostrar los planes de seguro disponibles.

**Props:**

![image](https://github.com/user-attachments/assets/c6913f7b-1fa6-49c6-a2ac-dc8a02804474)

**Uso:**

![image](https://github.com/user-attachments/assets/f7eaf3ac-9995-42bc-ab7c-e82a80cb4d5a)

---

### 2. HomePage
Página principal con selección de planes.

**Features:**
- Muestra datos del usuario
- Permite seleccionar "Para mí" o "Para alguien más"
- Filtra planes según selección
- Aplica descuento del 5% para "Para alguien más"

---

### 3. LoginPage
Página de autenticación con validaciones.

**Validaciones:**
- Campos numéricos para DNI/RUC y celular
- Longitud correcta según tipo de documento
- Checkboxes obligatorios

**Credenciales hardcodeadas para demo:**
- DNI: `30216147`
- RUC: `10888692966`
- Celular: `5130216147`

---

## 🎨 Estilos y diseño

**Variables CSS:**

![image](https://github.com/user-attachments/assets/fafa0214-c310-4c79-9da9-ab7e2588ba5a)

---

## 📱 Breakpoints Responsive

- **Mobile:** < 768px
- **Tablet:** 768px - 970px
- **Desktop:** > 970px

---

## 🐞 Problemas Conocidos y Soluciones

1. **Imágenes no se muestran en GitHub Pages**
   - **Causa:** Rutas incorrectas en producción
   - **Solución:**
     ![image](https://github.com/user-attachments/assets/768f8fdc-3a1c-457c-ad3a-070a8876af46)

---

## 📦 Dependencias Clave

- React 18
- React Router DOM
- Sass
- Prop-types
- Vite

---

## 🧪 Tests

Este proyecto incluye tests automatizados para asegurar el correcto funcionamiento de los componentes principales, especialmente la página de selección de planes (`HomePage`) y el flujo de autenticación (`LoginPage`).

### 📄 Archivos de test

- `src/ui/pages/HomePage.test.jsx`:  
  Testea la lógica de selección de usuario y visualización de planes en el componente `HomePage`.
- `src/ui/pages/LoginPage.test.jsx`:  
  Testea el flujo de login, validaciones y navegación en el componente `LoginPage`.

### 🧪 Tecnologías utilizadas para testing

- [Vitest](https://vitest.dev/): Framework de testing.
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/): Utilidad para testear componentes React.
- [Jest DOM](https://github.com/testing-library/jest-dom): Matchers extendidos para assertions en el DOM.

### 🚀 ¿Cómo ejecutar los tests?

Ejecuta en la raíz del proyecto:

```bash
npm test
# o si usas yarn:
yarn test
# o si usas pnpm:
pnpm test
# o si usas Vitest directamente:
vitest
```

Para ejecutar solo los tests de un archivo específico:

```bash
npx vitest run src/ui/pages/HomePage.test.jsx
npx vitest run src/ui/pages/LoginPage.test.jsx
```

---

### ✅ ¿Qué cubre el test de HomePage?

- Renderizado y carga de datos de usuario.
- Visualización de las opciones "Para mí" y "Para alguien más".
- Renderizado dinámico de los planes según la selección.
- Cálculo de precios (con y sin descuento).
- Manejo de errores de carga.

### ✅ ¿Qué cubre el test de LoginPage?

- Renderizado de campos de documento, celular, selectores y checkboxes.
- Validación de solo números en DNI/RUC y celular.
- Cambio de tipo de documento limpia el input.
- Validación y control de checkboxes obligatorios.
- Validación y muestra de errores de credenciales incorrectas.
- Login exitoso navega a `/home` con credenciales correctas y checkboxes aceptados.
- Login con datos erróneos muestra el mensaje de error en ambos campos de error.
- Los tests mockean la navegación y los assets para garantizar consistencia.

---

### 🛠️ Notas sobre los tests

- Los tests mockean los datos y navegación para asegurar resultados consistentes.
- Si modificas los nombres de los planes, los testID o el flujo del Login, actualiza los tests correspondientes.
- Si un test falla, revisa el mensaje de error y asegúrate de que los mocks y los nombres de los planes coincidan exactamente con los que espera el código.
- En `LoginPage`, el mensaje de error de credenciales incorrectas aparece dos veces (una por cada campo de error), por lo que el test verifica ambas ocurrencias.

---

## 🏁 Conclusión

El proyecto implementa un flujo completo de cotización de seguros con:

- Autenticación
- Selección de beneficiario
- Visualización de planes
- Diseño responsive
- Validaciones de formulario

El código sigue buenas prácticas de React y arquitectura limpia, con oportunidades de mejora en testing y estado global.

---

## 👨‍💻 Autor

**Kelvin Huanca Arcos**  
Frontend developer

---
