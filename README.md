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
**1. CardPlans**
Componente para mostrar los planes de seguro disponibles.

Props:

![image](https://github.com/user-attachments/assets/c6913f7b-1fa6-49c6-a2ac-dc8a02804474)


Uso:

![image](https://github.com/user-attachments/assets/f7eaf3ac-9995-42bc-ab7c-e82a80cb4d5a)


**2. HomePage**
    Página principal con selección de planes.
    
    Features:
    
    Muestra datos del usuario
    
    Permite seleccionar "Para mí" o "Para alguien más"
    
    Filtra planes según selección
    
    Aplica descuento del 5% para "Para alguien más"

**3. LoginPage**
    Página de autenticación con validaciones.
    
    Validaciones:
    
    Campos numéricos para DNI/RUC y celular
    
    Longitud correcta según tipo de documento
    
    Checkboxes obligatorios
    
    Credenciales hardcodeadas para demo:
    
    DNI: 30216147
    
    RUC: 10888692966
    
    Celular: 5130216147


**Estilos y diseño**
Variables CSS

![image](https://github.com/user-attachments/assets/fafa0214-c310-4c79-9da9-ab7e2588ba5a)


## Breakpoints Responsive
Mobile: < 768px

Tablet: 768px - 970px

Desktop: > 970px

## Problemas 
Conocidos y Soluciones
1. Imágenes no se muestran en GitHub Pages
Causa: Rutas incorrectas en producción
Solución:

![image](https://github.com/user-attachments/assets/768f8fdc-3a1c-457c-ad3a-070a8876af46)

## Dependencias Clave
React 18

React Router DOM

Sass

Prop-types

Vite

## Conclusión
El proyecto implementa un flujo completo de cotización de seguros con:

Autenticación

Selección de beneficiario

Visualización de planes

Diseño responsive

Validaciones de formulario

El código sigue buenas prácticas de React y arquitectura limpia, con oportunidades de mejora en testing y estado global.

## autor
**Kelvin Huanca Arcos**
**Frontend developer**
