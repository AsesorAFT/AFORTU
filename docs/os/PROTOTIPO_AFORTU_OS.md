# Prototipo AFORTU OS

Prototipo independiente en `/os`, con cliente, contratos, saldos, casos y publicaciones ficticios. No es una actualización del portal de producción ni está conectado a datos de clientes.

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
