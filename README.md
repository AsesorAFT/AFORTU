# AFORTU

Sitio institucional y base de aplicación de AFORTU. La experiencia pública
presenta un modelo de coordinación para decisiones de patrimonio, retiro y
legado; no promete rendimientos ni sustituye a profesionales autorizados en
materias reservadas.

## Experiencia pública

- `/` — propuesta institucional, método, alcances y límites.
- `/personas-y-familias` — ruta para decisiones familiares.
- `/empresas` — ruta para empresa, socios y continuidad.
- `/oficina-patrimonial` — gobierno y seguimiento patrimonial.
- `/patrimonio`, `/retiro`, `/legado` — dimensiones de solución.
- `/modelo-afortu` — modelo de coordinación.
- `/conocimiento` — archivo editorial migrado.
- `/contact` — canales de contacto.
- `/privacy`, `/terms` — información de confianza y alcance.

Las rutas históricas del blog cuentan con redirecciones permanentes hacia el
Centro de Conocimiento. Los 43 artículos migrados permanecen en revisión
editorial y con `noindex` hasta validar vigencia, fuentes y afirmaciones.

## Desarrollo

Requisitos:

- Node.js 20 o superior.
- npm.

```bash
npm ci
npm run dev
```

El script de desarrollo utiliza el puerto `3001`.

Validación completa:

```bash
npm run check
npm test
npm run build
```

Validación del contenido migrado:

```bash
npm run content:verify
npm run content:audit
```

`content:migrate` vuelve a leer las fuentes públicas del sitio anterior y debe
ejecutarse de manera intencional, pues reemplaza los artefactos generados en
`src/content/`.

## Configuración

Copie `.env.example` a `.env.local` y complete únicamente las variables
necesarias. Nunca suba credenciales al repositorio.

La captación vía Salesforce no está activa. Su configuración queda reservada
hasta definir el responsable del tratamiento, el aviso de privacidad integral,
el objeto de destino y los campos aprobados. Mientras tanto, el sitio utiliza
WhatsApp, teléfono y correo como canales directos.

## Arquitectura

- Next.js 16 con App Router.
- React, TypeScript estricto y Tailwind CSS.
- Componentes Radix UI y Lucide.
- Vercel como configuración de despliegue actual.
- Firebase y módulos privados conservados como infraestructura separada de la
  experiencia institucional pública.

El dominio canónico es `https://afortu.com.mx`; `www` debe redirigir de manera
permanente al dominio raíz.

## Publicación

Los cambios públicos se trabajan mediante pull request. No se debe fusionar a
`main`, reasignar dominios ni cambiar DNS sin autorización expresa y sin cerrar
antes los controles editoriales, legales, de privacidad y seguridad.

## Contacto

- Sitio: [afortu.com.mx](https://afortu.com.mx)
- Correo: [contacto@afortu.com.mx](mailto:contacto@afortu.com.mx)
