# AFORTU Asset Management

<div align="center">
  <img src="https://raw.githubusercontent.com/AsesorAFT/AFORTU/main/logo.png" alt="Logo de AFORTU" width="300"/>
</div>

<div align="center">
  
**Construyendo tu legado, asegurando tu futuro.**

</div>

[![Estado del Proyecto](https://img.shields.io/badge/Estado-Activo-success)](https://github.com/AsesorAFT/AFORTU)
[![Sitio Web](https://img.shields.io/badge/Sitio_Web-afortu.com.mx-blue)](https://www.afortu.com.mx)
[![Licencia](https://img.shields.io/badge/Licencia-MIT-lightgrey.svg)](LICENSE)

## 📋 Descripción

**AFORTU** es una plataforma exclusiva de Asset Management diseñada para ofrecer una experiencia de servicio superior a clientes de alto patrimonio y a sus empresas. Integramos un equipo de asesores expertos con tecnología de vanguardia para proporcionar soluciones integrales en gestión patrimonial, planeación de legado y estrategias de retiro.

Nuestra misión es construir el equipo de asesores que tus negocios necesitan, guiándote desde la planeación inicial hasta la consolidación de tu retiro y la sucesión de tu legado.

## ✨ Características Principales

- **Asesoría Integral y Especializada**:
  - Accede a un **asesor principal** y a un equipo de especialistas dedicados a tus necesidades.
  - Cubrimos áreas clave: **patrimonial, legado, retiro, legal, fiscal y de inversión**.

- **Gestión de Inversiones a Medida**:
  - **Asset Management** a través de contratos de mandato para una gestión transparente y profesional de tus activos.
  - **Contratos Cerrados a Vencimiento (CCV)** con tasa APR pactada e inversión en tasa fija para un rendimiento predecible y seguro.

- **Planeación de Legado y Sucesión**:
  - Estrategias completas para **herencia, sucesión y planeación de `Family Office`**, asegurando la continuidad y protección de tu patrimonio para las futuras generaciones.

- **Asesor AFT (Inteligencia Artificial)**:
  - Potenciado por **Gemini 2.5 Pro**, nuestro asistente de IA **Asesor AFT** mejora la experiencia del cliente, ofreciendo análisis avanzados y soporte proactivo en todas las áreas de servicio.

- **Bitácora Digital**:
  - Toda la interacción y seguimiento se gestiona a través de una **bitácora centralizada**, garantizando una comunicación clara y transparente entre tú y tu equipo de asesores.

- **🎨 Diseño Premium de Alto Patrimonio** (NUEVO):
  - Sistema de diseño elegante con colores de riqueza (oro, navy, piedras preciosas)
  - Efectos de glassmorphism y animaciones fluidas
  - Componentes optimizados con React.memo y hooks de performance
  - Micro-interacciones y feedback visual premium
  - Skeleton loaders elegantes para estados de carga

## 🚀 Empezando

Este repositorio contiene el código fuente y la documentación de la aplicación AFORTU. Para empezar a desarrollar o contribuir, sigue estos pasos.

### Prerrequisitos

*(Aquí listarías las herramientas necesarias, por ejemplo:)*
- Node.js v18+
- Python 3.10+
- Docker

### Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/AsesorAFT/AFORTU.git
   cd AFORTU
   ```

2. Instala las dependencias del proyecto (aplicación Next.js en la raíz):
   ```bash
   npm install
   ```

3. Crea un archivo `.env.local` tomando como referencia `.env.example` y completa las variables necesarias.

4. Inicia la aplicación en modo desarrollo y ábrela en tu navegador:
   ```bash
   npm run dev
   ```

   El servidor local queda disponible en `http://localhost:3000`. Desde ahí puedes navegar a:

   - `http://localhost:3000/` — **Landing page** pública con las CTA principales.
   - `http://localhost:3000/services` — Catálogo de servicios con vínculos internos.
   - `http://localhost:3000/pro` — Sección dedicada a AFORTU PRO y su comparativa de planes.
   - `http://localhost:3000/contact` — Formulario de contacto con seguimiento específico para clientes PRO.
   - `http://localhost:3000/dashboard` — Vista del panel con métricas, objetivos y recomendaciones.
   - `http://localhost:3000/asset-management`, `/consultoria`, `/coordination`, `/profile` — Rutas auxiliares enlazadas desde el dashboard.

   > 💡 Si trabajas dentro de un contenedor o túnel remoto, recuerda publicar el puerto 3000 para acceder al navegador.

5. Para validar la build de producción ejecuta:
   ```bash
   npm run build
   npm start
   ```

   Esto levanta la aplicación optimizada en `http://localhost:3000`.

## 🔧 Tecnologías Clave

- **Frontend**: [Next.js 14](https://nextjs.org/) con [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/) y [Tailwind CSS](https://tailwindcss.com/).
- **Componentes UI**: [Shadcn/ui](https://ui.shadcn.com/) y [Lucide Icons](https://lucide.dev/).
- **Sistema de Diseño**: Sistema Fortune con colores premium, glassmorphism y animaciones optimizadas.
- **Gestión de estado/server actions**: Hooks de React, Server Components y acciones de Next.js.
- **Autenticación y datos**: Integración prevista con Firebase Authentication y Firestore (ver reglas en `/firestore.rules`).
- **Infraestructura**: Configuraciones listas para despliegue en Vercel/Firebase Hosting (`vercel.json`, `firebase.json`).
- **Inteligencia Artificial**: Asistente conversacional **Asesor AFT** alimentado por Google Gemini 2.5 Pro.
- **Performance**: Componentes memoizados, lazy loading, y hooks optimizados para máximo rendimiento.

## 🎨 Sistema de Diseño Premium

AFORTU cuenta con un sistema de diseño completo enfocado en clientes de alto patrimonio:

- **Colores Fortune**: Paleta dorada (#D4AF37), navy luxury (#0A1628), y acentos de piedras preciosas
- **Glassmorphism**: Efectos de vidrio esmerilado con backdrop-blur para elegancia moderna
- **Animaciones Fluidas**: Transiciones suaves, números animados, y efectos de hover premium
- **Componentes Premium**: PremiumCard, StatCard, PremiumButton con micro-interacciones
- **Loading States**: Skeleton loaders con animación shimmer elegante
- **Performance Optimizada**: Memoización, lazy loading, y hooks de optimización

📚 Ver documentación completa en [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) y [`docs/IMPLEMENTACION.md`](docs/IMPLEMENTACION.md)

## 👥 Contribución

¡Tu contribución es fundamental para mejorar AFORTU! Si deseas colaborar:

1. Haz un **Fork** de este repositorio.
2. Crea una nueva rama para tu funcionalidad (`git checkout -b feature/MiFuncionalidad`).
3. Realiza tus cambios y haz **Commit** (`git commit -m 'Añadir MiFuncionalidad'`).
4. Sube tus cambios a tu fork (`git push origin feature/MiFuncionalidad`).
5. Abre un **Pull Request** hacia la rama `main` de este repositorio.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

## 📞 Contacto

- **Organización**: AsesorAFT
- **Sitio Web**: [www.afortu.com.mx](https://www.afortu.com.mx)
- **Email**: [tu-email@afortu.com.mx](mailto:tu-email@afortu.com.mx)
