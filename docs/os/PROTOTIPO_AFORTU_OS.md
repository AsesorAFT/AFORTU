# Prototipo AFORTU OS

Prototipo independiente en `/os`, con cliente, contratos, saldos, casos y publicaciones ficticios. No es una actualización del portal de producción ni está conectado a datos de clientes.

## Brief visual para las siguientes fases

Referencias preferidas: Interactive Brokers, Bursanet, BlackRock, Chase y JPMorgan. Orientan criterios de presentación, no la copia de sus interfaces ni la incorporación de funciones no verificadas:

- Interactive Brokers y Bursanet: claridad de cuentas, contratos, cifras y análisis; jerarquía legible y cantidades alineadas.
- BlackRock: composición editorial de noticias e informes, con fuentes y fechas visibles.
- Chase y JPMorgan: navegación familiar y presentación institucional, con acciones claras y estados comprensibles.

Estos criterios guiarán las siguientes fases de Servicios y OS+. Se conserva la identidad propia de AFORTU: emblema oficial sin alterar su geometría, encabezado grafito, azul rey y cromo pulido, y las tres tarjetas doradas aprobadas. No se reabre la exploración visual ni se rediseña esta primera pantalla.

## Vista previa

Con las dependencias instaladas, ejecuta `npm run dev` y abre `http://localhost:3001/os`. Las demás secciones del menú conducen a pantallas provisionales.

La opción de ocultar saldos es una preferencia visual guardada en una cookie para `/os`; no es un mecanismo de seguridad ni evita que los datos de demostración se envíen al navegador.

## Integraciones y recursos pendientes

- Atlas, Intelligence y Análisis son accesos informativos sin integración ni funcionalidad definida en este prototipo.
- BitForward conserva una cuenta ficticia de activos digitales; su integración real con el portal está pendiente de comprobar.
- El emblema y el logotipo completo son recortes sin alterar del recurso oficial `logo-afortu-oficial.png` disponible en el repositorio. Sus cajas en el original son respectivamente `(102, 85, 344, 327)` y `(105, 92, 343, 424)`.
- Faltan por confirmar el emblema vectorial, su versión oficial para fondo oscuro, la tipografía del wordmark y los códigos oficiales de color. Se utiliza el PNG disponible y Montserrat como aproximación tipográfica.
- Las fuentes se solicitan mediante la configuración existente del layout raíz. Para las capturas se instalaron Inter y Montserrat localmente en el entorno de revisión; no se añadieron dependencias al proyecto.

## Comprobaciones

`npx jest src/lib/os/portfolio.test.ts --runInBand --coverage=false` ejecuta las pruebas focalizadas. El repositorio presenta 43 errores TypeScript preexistentes; no se han desactivado las comprobaciones.

## Diagnóstico de Vercel

Los seis despliegues del commit `7f2f942` reportaron fallo. El check `Vercel – afortu-ulxw` enlaza al diagnóstico `https://vercel.link/functions-and-builds`: `vercel.json` declara simultáneamente `builds` (constructor legado `@vercel/next`) y `functions` (duración de las rutas API), opciones incompatibles. Ambas declaraciones ya existen en `main`; este prototipo no modifica ese archivo.

Los otros cinco checks solo indican que el despliegue falló y remiten a sus logs. No se confirma que compartan la misma causa: la consulta a Vercel está bloqueada en este entorno por resolución DNS (`Could not resolve host: vercel.com`, también para `vercel.link`). Los 43 errores TypeScript son un bloqueo independiente conocido; no se atribuyen a esos despliegues sin leer sus logs.

La vista local respondió HTTP 200. No hay una vista previa remota verificada. No se cambiaron permisos, planes, ajustes de proyectos ni configuración de producción.
