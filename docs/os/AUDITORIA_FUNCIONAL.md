# Auditoría funcional: AFORTU y prototipo /os

Fecha: 15 de noviembre de 2026. Fuente auditada: `AsesorAFT/AFORTU`, rama `prototipo/afortu-os`, commit de referencia `964a4dd097aaf52d3a0b1bfdc1dbf0aa11be1107`.

## Alcance y límites de evidencia

Auditoría de código, no implementación ni certificación del portal publicado. Se inventariaron los 27 archivos `src/app/**/page.tsx`, los cinco `src/app/api/**/route.ts`, componentes de negocio, hooks, servicios, tipos y herramientas IA relacionados. Las referencias `archivo:líneas` corresponden al commit indicado. Las variantes `page-premium.tsx`, respaldos y componentes sin consumidor no se cuentan como rutas adicionales.

No se consultaron datos de clientes, no se iniciaron sesiones reales, no se enviaron formularios ni se ejecutaron operaciones Firestore, pagos, cargas de documentos o reservas. No se modificaron producción, permisos ni configuración. Se describen estructuras y comportamiento del código sin copiar identidades, contratos o información de clientes. Los escenarios de aceptación al final son propuestas con datos de demostración; no se presentan como pruebas ejecutadas.

| Fuente | Evidencia y relación | Límite |
| --- | --- | --- |
| `AsesorAFT/AFORTU` | Código Next.js 14 y Firebase; contiene páginas legacy, herramientas de configuración y el prototipo independiente `/os`. `package.json:5-29`; `src/app/os/layout.tsx:14-40`. | La existencia de código o de una ruta no demuestra que esté publicada ni que sus servicios estén operativos. |
| `/os` en esta rama | Inicio demo, estilos propios y cuatro pantallas provisionales. `src/app/os/page.tsx:23-60`; `src/components/os/pending-screen.tsx:4-14`. | **No es el portal en producción.** No tiene autenticación ni integración con datos de clientes. |
| Sites, aplicación `app.afortu.com.mx` | Dato proporcionado como verificado por el coordinador: proyecto `appgprj_6a667569b4b48191a423ada45d305e15`, versión guardada más reciente 437. Se incorporan abajo sus hallazgos de snapshot local y UI publicada. | No inspeccionada directamente por este auditor. El snapshot aportado es distinto de v437; la UI se observó en vista administrativa de solo lectura. No equiparar esas evidencias entre sí ni con el flujo cliente. |
| `afortu-ai/afortu-os` | `gh repo view` no resolvió el repositorio; `gh api repos/afortu-ai/afortu-os` devolvió HTTP 404 en esta sesión. | Sin acceso de lectura verificable: no se puede distinguir repositorio privado/inaccesible de inexistente ni comprobar arquitectura, relación o despliegue. |
| Documento de fusión existente | `docs/INVENTARIO_FUSION_AFORTU_OS.md:3-7` declara intención de portar a `apps/afortu-sites`, `api/portal/**` e Intelligence. | Es una intención documental, no prueba de migración ejecutada ni de correspondencia con Sites versión 437 o con el repositorio inaccesible. |

**Conclusión principal del repositorio AFORTU:** no se encontró reserva de cita de extremo a extremo. Hay enlaces de contacto, un formulario sin integración y un calendario mock, pero no disponibilidad real, reserva persistida o gestión de citas del cliente. Esto no contradice la existencia de reserva y Mis citas reportada por el coordinador en un snapshot local de Sites.

Leyenda: **UI local** = control o cálculo en navegador; **mock** = datos/respuestas estáticos o simulados; **integración en código** = llamada a un servicio, no verificada en ejecución; **placeholder** = acción/destino aún sin implementar.

## 1. Agenda: recorrido y brechas

Una **vía de contacto** abre un canal. Una **solicitud de cita** requiere un registro persistido y acuse, pero no garantiza horario. Una **reserva confirmada** exige disponibilidad validada, bloqueo del horario y confirmación persistida. Ningún enlace, toast o etiqueta estática demuestra estas últimas condiciones.

| Paso del cliente | Ruta / componente y evidencia | Acción disponible | Carencia comprobada en esta fuente |
| --- | --- | --- | --- |
| Entrar desde un servicio | `/services`, `src/app/services/page.tsx:179-197,250-259`; `/consultoria`, `src/app/consultoria/page.tsx:34-41`; `/`, `src/app/page.tsx:548`. | Enlaces “Agendar Consulta”, diagnóstico y contratar hacia `/contact` con parámetros. | No reservan ni crean solicitudes. `/contact` no lee `type`, `service` o `interest`; el contexto no se conserva en el formulario. |
| Elegir servicio / asesor | Catálogo y roles estáticos: `src/app/services/page.tsx:18-133`; menú demo: `src/components/os/account-menu.tsx:29-42`. | Lectura de servicios/roles; enlace a `/os/asesor`. | No selector de servicio/asesor elegible, modalidad, duración o asignación. `/os/asesor` muestra `PendingScreen`. |
| Ver disponibilidad | `/calendar`, `src/app/calendar/page.tsx:20-46,68-76`. | Elegir un día con `Calendar`; filtrar el array `mockAppointments`. | Elegir fecha no consulta horarios libres. No proveedor, reglas de horario, capacidad, zona horaria de cita o bloqueo de huecos localizado. |
| Solicitar cita | `/contact`, `src/app/contact/page.tsx:31-67`. | Campos con validación HTML básica y botón submit. | `<form>` sin `action`, método explícito ni handler. No API, persistencia, acuse o errores de envío. El submit nativo no constituye entrega al asesor. No se ejecutó. |
| Reservar | `/calendar`, `src/app/calendar/page.tsx:87-90`. | Botón “Nueva Cita”. | Sin `onClick`, enlace, diálogo o envío. No endpoint de booking entre los cinco Route Handlers inventariados. |
| Confirmación | `/calendar`, `src/app/calendar/page.tsx:12-27,110-113`. | Etiquetas `confirmada`, `pendiente`, `cancelada` en entradas mock. | No confirmación emitida por servidor, folio, detalle, enlace de reunión, invitación o comprobante. Las etiquetas no prueban una reserva. |
| Mis citas | `/calendar`, `src/app/calendar/page.tsx:41-46,80-120`. | Lista mock del día seleccionado; vacío si no hay entradas. | No consulta por cliente ni historial persistido. No listado futuro/pasado, detalle de cita o vínculo con servicio/contrato. |
| Reprogramar / cancelar | Misma lista `src/app/calendar/page.tsx:99-120`. | Ninguna acción de gestión. | No controles, política, validación de nuevo horario, liberación del anterior ni actualización de estado. |
| Recordatorios / sincronización | `/coordination`, `src/app/coordination/page.tsx:63-69`; `/profile`, `src/app/profile/page.tsx:104-135`. | Texto sobre sincronizar Google/Microsoft; switches visuales de notificación. | No conexión de calendario, programación de avisos, entrega, reintentos o cancelación de recordatorios localizada. |
| Contacto y soporte | `/contact`, `src/app/contact/page.tsx:73-100`; `src/app/layout.tsx:58-70`; `src/components/layout/Sidebar.tsx:116-123`. | `tel:`, `mailto:` y WhatsApp; soporte por correo. | Son canales externos; no agenda, ticket, solicitud registrada o confirmación de reserva. WhatsApp se oculta dentro de `/os`. |

Detalle adicional: `src/app/calendar/page.tsx:44` usa `toISOString()` para la clave diaria (UTC), mientras el título se muestra en fecha local. Debe probarse la coherencia día/zona horaria antes de reutilizarlo para agenda. No se diagnostica aquí un fallo de Sites.

### Evidencia aportada por el coordinador sobre Sites

Procedencia: comunicación del coordinador durante esta auditoría, no inspección propia. No se aportaron rutas de archivo/líneas, hash del snapshot, versión publicada o evidencia de ejecución cliente; los identificadores siguientes son los nombres comunicados, no referencias de código verificadas aquí. La consolidación y el contraste con v437 quedan a cargo del coordinador.

| Fuente diferenciada | Hallazgo aportado | Interpretación y límite |
| --- | --- | --- |
| Snapshot local de Sites, distinto de v437 | `ClientWeeklyAgenda` tiene reserva y Mis citas, pero no controles cliente para cancelar/reprogramar. | Hay evidencia aportada de esas capacidades en ese snapshot; no afirmar que Sites carece de reserva. Persistencia, confirmación, concurrencia y presencia en producción quedan por contrastar. |
| Mismo snapshot local | `clientCalendarScope` toma un solo administrador. | Comprobar cómo se elige ese administrador y si representa la disponibilidad del asesor/servicio seleccionado. No afirmar asignación multiasesor correcta ni incorrecta sin el contrato de negocio. |
| Mismo snapshot local | `externalCalendarBusy` es una copia fija de octubre, no sincronización viva. | No tratar ese dato como disponibilidad externa actual. Falta verificar actualización, caducidad y reconciliación; no atribuir automáticamente ese snapshot a producción. |
| UI publicada, Portal Studio solo lectura | Agenda visible con horarios fijos y controles deshabilitados por ser vista administrativa. | Observación de presentación y modo de vista. No permite concluir que el cliente no puede reservar ni probar la operación, disponibilidad real o cancelación/reprogramación. |
| Misma UI publicada | Servicios desaparece del menú cuando no hay casos clasificados. | Riesgo de descubrimiento: separar servicios contratados de catálogo disponible y contemplar estado vacío. No inferir que no existen servicios o casos fuera de la clasificación visible. |
| Misma UI publicada | Noticias muestra archivo manual de agosto. | Se observó contenido archivado/manual; no demostrar un feed actual o ausencia global de publicaciones posteriores. No se aportó el año ni política editorial. |
| Misma UI publicada | Análisis es accesos y cálculo simple de aportaciones. | Describe lo visible en ese modo. No demuestra capacidades completas de Atlas/Intelligence ni autoriza redefinirlas. |

## 2. Matriz de pantallas y módulos

Las rutas legacy siguientes son hermanas de `/dashboard`, no descendientes. `src/app/dashboard/layout.tsx:58-81` envuelve únicamente ese segmento; no se debe asumir que su sidebar o sesión cubren `/calendar`, `/contracts`, `/billing`, etc.

| Módulo / rutas | Componentes / evidencia | Acciones disponibles en código | Placeholders y carencias |
| --- | --- | --- | --- |
| Inicio público `/` | `LandingPage`, `src/app/page.tsx:314-349,422-470,540-618`. | Navegación a servicios, contacto, PRO, login y signup. | “Agendar” termina en contacto. Enlaces a anchors `gestion-activos`, `consultoria`, `ia`, `atencion` no coinciden con los IDs del catálogo actual (`src/app/services/page.tsx:18-104,211-216`). No confundir bloques/componentes anteriores del mismo archivo con la página exportada. |
| Información `/about`, `/pro` | `src/app/about/page.tsx:35-52,139-150`; `src/app/pro/page.tsx:58-80,151-160`. | Información institucional, catálogo de beneficios, enlaces a servicios/contacto y demo dashboard. | Contenido no demuestra provisión de beneficios, elegibilidad o contratación. |
| Textos legales `/privacy`, `/terms` | `src/app/privacy/page.tsx:6-18`; `src/app/terms/page.tsx:6-18`. | Lectura y volver a Inicio. | No demuestra mecanismos técnicos de privacidad, consentimiento o seguridad. No se evaluó su suficiencia legal. |
| Acceso `/login` | `src/app/login/page.tsx:16-46,90-116`. | Formularios y redirección simulada a dashboard. | No invoca autenticación Firebase; “login exitoso” viene de temporizadores. Recuperación es correo de contacto, no reset. No probado con credenciales. |
| Registro `/signup` | `src/app/(auth)/signup/page.tsx:11-40`; `SignupForm.tsx:25-77`; `src/lib/auth-service.ts:20-28,36-45,100-113`. | En código: registro email, perfil inicial y opción PRO/Standard en Firestore. | Importa `signupWithGoogle`, export inexistente en el servicio; error TypeScript preexistente. La disponibilidad de Firebase no fue verificada. |
| Dashboard `/dashboard` | `src/app/dashboard/page.tsx:24-115,157-180,484`; `src/app/dashboard/layout.tsx:23-52`. | Lectura de KPIs, objetivos, recomendaciones y timeline fijos; chat local. | Mensaje de actualización cada 15 minutos sin fuente dinámica en la página. Reporte mensual y otro CTA sin handler. Búsqueda global sin integración. |
| Navegación legacy | `Sidebar`, `src/components/layout/Sidebar.tsx:38-123`; `UserNav`, `src/components/layout/user-nav.tsx:22-36,69-88`. | Enlaces a módulos y settings. | Usuario simulado. Logout solo redirige; no `signOut`. En menú UserNav, Perfil y Facturación no tienen destino, aunque esas rutas sí existen. Sidebar desktop no implica navegación móvil equivalente. |
| Centro patrimonial `/asset-management` | `src/app/asset-management/page.tsx:29-75,105-126,171-187`; cards `src/components/inversiones/*`. | Periodo, granularidad, comparación, suavizado y moneda; enlaces a consultoría. | KPIs/FX mock; capital base `investedUsd` retorna 0. Tipos de cards incompatibles con CAV. No operación de compra, retiro, rebalanceo o apertura. |
| CAV `/cav` | `src/app/cav/page.tsx:27-46,145-155,211-262,294-297,381-396,433-444`; `useAfortuSettings`. | Filtros y recarga; resumen y contratos leídos desde el hook. | Nuevo contrato, documento, detalles, descarga e información sin handler. `/cav` y `/asset-management` llaman al hook sin userId: documento `afortu_settings/demo`; no se ha verificado como cartera del cliente. |
| Contratos `/contracts` | `src/app/contracts/page.tsx:15-65,101-130,159-180`. | Búsqueda y filtro de contratos estáticos. | Descargar solo genera toast “Descarga iniciada”; no archivo. Sin detalle por ID, firma, versionado o documentos vinculados. |
| Facturación `/billing` | `src/app/billing/page.tsx:34-54,64-150,157-249,253-272,309-415`. | Tabs; generación PDF local si existe usuario; diálogo de domiciliación; enlace general a contratos. | Facturas/constancias basadas en arrays de ejemplo, no CFDI oficial. PDF combina datos de sesión y ejemplo: no se generó en la auditoría. Plan deducible “descarga” mediante `alert`. Domiciliación cambia estado local antes de acreditar autorización del proveedor; endpoint de setup mock. |
| Metas `/objectives` | `src/app/objectives/page.tsx:9-25,36-64`; `FinancialGoalCard`, `src/components/FinancialGoalCard.tsx:13-36`. | Cálculo/visualización de progreso de dos metas de ejemplo. | Nueva Meta y Ver Reporte sin acción; simulador de liquidez vacío. No seguimiento persistido. |
| Servicios públicos `/services` | `src/app/services/page.tsx:18-104,179-197,250-259`. | Catálogo y enlaces a contacto con parámetro de servicio. | Contratar no contrata; no catálogo operativo, orden/caso, precio validado o entrega. |
| Consultoría `/consultoria` | `src/app/consultoria/page.tsx:7-22,34-41,61-91`. | Tres pilares y enlaces a contacto/PRO. | Data room, actas y roadmap son descripciones, no herramientas implementadas en la pantalla. |
| Casos / coordinación `/coordination` | `src/app/coordination/page.tsx:7-25,39-43,48-80`. | Lectura de entradas fijas; enlaces a calendario y contacto. | Sin creación/actualización de casos, adjuntos, comentarios ni sincronización. Expone responsables internos en las tarjetas; no trasladar a vista cliente de `/os`. |
| Análisis `/analysis` | `src/app/analysis/page.tsx:1-9`; `ChatClient`, `src/components/analysis/chat-client.tsx:21,64-92,105-132`. | UI de chat y prompts rápidos en código. | `unified-advisor.ts` vacío: import roto, error preexistente. Promesas de noticias, cálculos y movimientos no demuestran ejecución. No es Atlas/Intelligence. |
| Perfil `/profile` | `src/app/profile/page.tsx:10-16,36-52,67-90,104-135`. | Inputs demo y switches locales. | 2FA, accesos delegados y preferencias no tienen integración; botones de guardar/permisos sin handler. No prueba de MFA activo. |
| Configuración `/settings` | `src/app/settings/page.tsx:25-73,121-143,160-163`. | Sesión requerida, formulario validado, selección de tema/notificaciones. | Guardar espera un segundo y muestra éxito; no persistencia ni actualización real de perfil. |
| Herramientas `/tools` | `src/app/tools/page.tsx:29-62,84-200,215-232`. | Integración en código: guardar métricas/tasa/capital; agregar/eliminar activos y bitácora; vaciar portafolio con batch. | No es agenda aunque tenga contador `newAppointments`. Usa `users/{uid}`; sus datos no alimentan automáticamente todos los mocks legacy. No ejecutar como parte de una auditoría cliente. |
| Prototipo Inicio `/os` | `src/app/os/page.tsx:23-60`; `WealthCards`, `src/components/os/wealth-cards.tsx:33-230`; `AccountList`, `src/components/os/account-list.tsx:30-112`. | Tarjetas/deslizamiento, enmascarado de importes/porcentajes/gráfica, menú y navegación demo. | Cuentas son filas de lectura, no enlace a detalle por contrato. Sin operaciones, documentos o movimientos. Fecha y fuente ficticia visibles. |
| Prototipo `/os/cuentas`, `/os/servicios`, `/os/plus`, `/os/asesor` | Cada `src/app/os/{cuentas,servicios,plus,asesor}/page.tsx:1-10` devuelve `PendingScreen`; `src/components/os/pending-screen.tsx:4-14`. | Volver a Inicio. | Cuatro destinos provisionales, sin flujo del módulo. No agenda desde Asesor. |
| Casos y OS+ en Inicio demo | `CasesPanel`, `src/components/os/cases-panel.tsx:11-48`; `ForYou`, `src/components/os/for-you.tsx:24-61`; `src/lib/os/demo-data.ts:97-172`. | Muestra de etapas/siguiente paso y publicaciones con fecha/fuente demo. | Sin acciones sobre casos, lectura de artículo completo, seguir temas o herramientas ejecutables. Atlas/Intelligence/Análisis son etiquetas “Integración pendiente”, no enlaces individuales. |
| Privacidad/estados demo | `src/components/os/privacy.tsx:19-34,85-144`; `src/app/os/layout.tsx:24-40`; `src/app/os/loading.tsx:1-26`; `src/app/os/error.tsx:5-16`. | Preferencia cookie para `/os`, enmascarado, skeleton y reintentar. | Enmascarar es privacidad visual, no control de acceso: datos demo se envían al navegador. No pruebas de carga/error remoto en esta auditoría. |

## 3. Tipos de cuenta y productos: no equiparar modelos

| Tipo / clasificación | Evidencia | Qué hay | Qué falta o debe comprobarse |
| --- | --- | --- | --- |
| Inversiones / mandato / Asset Management | Demo: `src/lib/os/demo-data.ts:28-37`; legacy: `src/components/inversiones/AssetManagementCard.tsx:24-68`; activos: `src/app/tools/page.tsx:44-54,145-175`. | Resumen demo y CRUD de posiciones en herramienta legacy. | Cuenta operativa, custodio, contrato canónico, movimientos, documentos y operaciones por verificar en Sites. |
| Fondos | `src/lib/os/portfolio.ts:6-11,44-50`; `src/lib/os/demo-data.ts:39-47`. | Grupo/cuenta demo en `/os`. | No se localizó página de fondo, suscripción/rescate o documentos del fondo en este árbol de rutas. |
| Acciones | `src/lib/os/demo-data.ts:49-57`; `src/app/tools/page.tsx:44-54,145-175`; `src/services/stock-price-service.ts:13-54`. | Cuenta demo, posiciones con símbolo/títulos/precio de compra y adaptador de cotización. | No orden de compraventa o confirmación de ejecución. Cotización no equivale a valoración completa de cartera. |
| Capital creciente / CAV / tasa fija-variable | Demo: `src/lib/os/demo-data.ts:59-87`; legacy: `src/types/cav.ts:5-18`; `src/hooks/use-afortu-settings.ts:51-55,99-132`. | Tres plazos demo; CAV modela `fixed-rate`/`variable-rate`, MXN/USD/EUR. | No asumir equivalencia comercial entre nombres. Demo describe base 360; hook legacy calcula base 365. Definir contrato/fórmula antes de fusionar. El resumen legacy suma monedas sin conversión (`use-afortu-settings.ts:73-91`). |
| Planes de aportación | `src/components/inversiones/ContributionPlansCard.tsx:15-18,43-64`; `src/types/cav.ts:30-40`. | Card y enlace “Crear nuevo plan” hacia consultoría. | Card espera saldo/frecuencia/aportación/status que `InvestmentPlan` no define. El tipo actual es catálogo de condiciones, no cuenta del cliente. |
| BitForward / activos digitales | `src/lib/os/demo-data.ts:89-95`; `src/lib/os/portfolio.ts:6-11`. | Cuenta demo conservada. | No cartera cripto, custodia, transacciones, tokenización o educación integrada verificada aquí. No eliminar ni redefinir por el README de una academia. |
| Liquidez estructurada | `src/app/api/transactions/route.ts:4-10`; `src/components/analysis/chat-client.tsx:128-130`. | Movimiento estático y descripción de capacidad del chat. | No flujo localizado de solicitud, evaluación, autorización o desembolso. No es una cuenta operativa demostrada. |
| Retiro / planes deducibles / seguros | `src/app/billing/page.tsx:43-46,374-415`; `src/services/user-data-service.ts:88-91`. | Ejemplos de planes/pólizas y aportaciones. | No contratación, actualización de beneficiarios o cuenta vinculada verificada. |
| PRO / Standard | `src/lib/auth-service.ts:36-45`; `src/app/profile/page.tsx:10-16`. | Clasificación de registro y badge demo. | Son niveles de cuenta/acceso, no clases de activo. No demuestran derechos, precio ni permisos efectivos. |

Para Servicios, el catálogo legacy se organiza en Gestión Patrimonial, Optimización Fiscal, Asesoría Legal y Consultoría Estratégica; el brief futuro exige Patrimonio, Legado, Retiro, Empresas, Fiscal y Contable, Inmuebles y espacio BitForward. El mapeo y la disponibilidad comercial deben acordarse con Sites; no hay aquí un catálogo operativo completo de esas familias (`src/app/services/page.tsx:18-104`; `docs/os/PROTOTIPO_AFORTU_OS.md:5-13` recoge dirección visual, no catálogo).

## 4. APIs, herramientas y fuentes de datos

| Superficie | Evidencia | Estado y límite funcional |
| --- | --- | --- |
| `GET /api/metrics` | `src/app/api/metrics/route.ts:4-34`. | Mock por rango; `newAppointments` es un contador fijo, no agenda. |
| `GET /api/transactions` | `src/app/api/transactions/route.ts:4-15`. | Array fijo con aportación, pago, retiro, depósito pendiente, vencimiento y ajuste. No registro contable, reporte de depósito o conciliación. |
| `GET /api/chart` | `src/app/api/chart/route.ts:6-57`. | Proyección calculada con capital/tasa/plazo de query; no historial de movimientos ni rendimiento realizado. |
| `GET /api/stock-price` | `src/app/api/stock-price/route.ts:6-34`; `src/services/stock-price-service.ts:13-54`. | Adaptador Alpha Vantage y errores HTTP en código. No se invocó el proveedor. Devuelve símbolo/precio sin fecha de cotización en su contrato. |
| `POST /api/paypal/setup-billing` | `src/app/api/paypal/setup-billing/route.ts:13-44`. | Setup sandbox y respuesta mock de éxito; no creación de suscripción, cobro acreditado o webhook implementado en este handler. |
| Hook de CAV | `src/hooks/use-afortu-settings.ts:42-49,99-141,147-255`. | Lectura/escritura a Firestore; crea valores por defecto si falta documento y usa defaults en error. No se montó para evitar escrituras automáticas. Sus funciones CRUD no hacen operativos los botones vacíos de `/cav`. |
| KPI, FX y preferencias | `src/hooks/use-kpi-series-extended.ts:52-125`; `src/hooks/use-fx-latest.ts:14-63`; `src/hooks/use-user-preferences.ts:22-58`. | Series y FX simulados; controles cambian parámetros/metadatos pero cifras mock no representan series reales. Preferencias se guardan en localStorage, no perfil remoto. `prefetch` solo registra en consola. |
| Controles/helpers de inversiones | `src/components/dashboard/KpiControlsPro.tsx:68-143`; `src/components/inversiones/PreferencesBar.tsx:10-23`; `src/components/inversiones/Hotkeys.tsx:9-27`. | Controles de estado local; botón Preferencias sin acción; hotkeys solo logging. Cards de resumen/badge/skeleton son presentación, no servicios nuevos. |
| Tablas/gráficas de movimientos | `src/components/dashboard/transactions-table.tsx:20`; `src/components/dashboard/recent-transactions.tsx:29-36`. | Componentes reciben datos por props. No consumidor localizado en las páginas exportadas auditadas; no contarlos como una pantalla de movimientos operativa. |
| Noticias externas | `src/components/dashboard/tradingview-timeline-widget.tsx:6-29`. | Componente crea embed TradingView; no consumidor localizado en las páginas exportadas. No demuestra proveedor activo de noticias de `/os` o Sites. |
| Cliente HTTP genérico | `src/lib/afortu/apiClient.ts:33-105,126-178`. | Helpers GET/POST/PUT/PATCH/DELETE, timeout y retries; ejemplo de consumo comentado, sin consumidor operativo localizado. No prueba de endpoints de agenda. |
| Datos para herramientas IA | `src/services/user-data-service.ts:16-28,31-53,56-128`. | Portafolio lee Firestore con identificador de ejemplo, no sesión resuelta. Negocio/metas/facturas/contratos/planes/bitácora devuelven contenido fijo. No consultar como datos oficiales. |
| Herramientas Genkit | `src/ai/tools/user-data-tools.ts:11-92`; `src/ai/tools/stock-tool.ts:12-30`; `src/ai/genkit.ts:4-20`. | Declaradas: `getUserPortfolio`, `getBusinessData`, `getBusinessGoals`, `getUserInvoices`, `getUserContracts`, `getUserInvestmentPlans`, `getAccountLog`, `getStockPrice`. `ai` mock no define `defineTool`; no son herramientas ejecutables verificadas. Ninguna reserva citas. |
| Flows de análisis/chat | `src/ai/flows/portfolio.analyzer.ts:14-54`; `market-trend-analyzer.ts:16-51`; `generate-business-insights.ts:17-51`; `business-insights-from-portfolio-data.ts:42-70`; `conversational-advisor.ts:28-59`; `conversational-advirsor.ts:28-56` (todos bajo `src/ai/flows/`). | Prompts/flows declarados sobre `ai` mock, sin `definePrompt`/`defineFlow`. Duplicados/variantes no son capacidades publicadas. `unified-advisor.ts` tiene cero líneas; su variante `unified-advisor-disabled.ts:10` no repara el consumidor que importa el archivo vacío. |
| Chat de dashboard | `src/components/dashboard/chat-asesor.tsx:95-150`. | Respuestas locales simuladas por texto y temporizador; no conversación con asesor humano ni agenda. |
| Atlas / Intelligence / Análisis OS+ | `src/lib/os/demo-data.ts:167-172`; `src/components/os/for-you.tsx:49-61`. | Nombres y estados pendientes. No se redefine su función a partir de flows legacy o de marketing. |
| Depósitos reportados / documentos cargados | Inventario de cinco APIs anterior; `src/app/contracts/page.tsx:159-180`; `src/app/tools/page.tsx:44-62,126-200`. | No se localizó formulario de reporte con comprobante, carga de documentos, acuse, revisión o conciliación en las rutas/componentes auditados. El depósito del array de transacciones no satisface ese flujo. |

## 5. Sesión, seguridad funcional y soporte

Hay integración Firebase Auth en el servicio (`src/lib/auth-service.ts:100-113,118-191`) para email, Google, teléfono y Salesforce, pero el login exportado no la usa. Autenticación por teléfono no demuestra MFA. El checkbox PRO no demuestra permisos. No se hizo análisis de vulnerabilidades, pentest ni verificación de reglas desplegadas.

Perfil anuncia 2FA/accesos delegados sin handlers y logout legacy es redirección. Antes de unir módulos, se debe verificar la sesión efectiva, autorización por contrato/documento, perfil y cierre de sesión en **la fuente Sites**. `/tools` presenta funciones de edición de datos: distinguir herramientas internas de capacidades del cliente, sin cambiar aquí sus permisos.

Soporte disponible en código: correo, teléfono y WhatsApp; no se localizó bandeja de tickets o chat humano con seguimiento. En `/os`, Asesor es provisional y el menú solo navega hacia él.

### Títulos de Movimientos y tarjetas documentales: requisito del usuario

El título principal debe describir el **tipo y estado verificados del evento/documento**, en español comprensible, sin usar el nombre del archivo como título. Conservar el archivo original sin renombrarlo ni sustituirlo; mostrar nombre original, referencia, fuente y metadatos disponibles en el detalle. El título es una capa de presentación: nunca modifica saldos, naturaleza contable, moneda, signo, importes o estado.

| Ejemplo de título | Condición para usarlo | No confundir con |
| --- | --- | --- |
| Aportación reportada | Existe un reporte/aportación pendiente de conciliación. | Aportación acreditada o depósito confirmado. |
| Depósito recibido | El depósito está confirmado por la fuente autorizada. | Carga de comprobante, solicitud o reporte pendiente. |
| Intereses registrados | Existe registro de intereses en la fuente contable. | Proyección, estimación de rendimiento o cambio de valuación. |
| Compra de acciones | El evento corresponde a una compra ejecutada, con su estado conservado. | Orden solicitada, transferencia o actualización de precio. |
| Actualización de valuación | El evento representa una revisión de valor. | Movimiento de efectivo, depósito, compra o interés acreditado. |

Si el tipo o estado no están verificados, usar un título neutral y un estado explícito de revisión, sin inventar confirmación. Para documentos que no sean movimientos, describir su clase y estado real (por ejemplo, contrato pendiente de firma) sin convertirlos en eventos contables.

Evidencia local relacionada: `RecentTransactions` muestra `description`/`type`/`status` (`src/components/dashboard/recent-transactions.tsx:63-80`); `TransactionsTable` usa los mismos campos pero textos/estados esperados en inglés (`src/components/dashboard/transactions-table.tsx:24-54`), distintos de los estados españoles del mock (`src/app/api/transactions/route.ts:4-10`). `/contracts` y `/billing` usan IDs y arrays, no un modelo documental completo. No se verificó aquí una tarjeta de Sites titulada por nombre de archivo: este es un requisito aportado, no un defecto observado personalmente. La armonización de etiquetas debe respetar los estados originales, no traducirlos a un estado distinto.

### Ajuste visual de tarjeta patrimonial y BitForward: requisito del usuario

Procedencia: pedido del usuario, no observación propia del componente publicado. El coordinador implementará y comprobará la mejora en la fuente Sites local; no se atribuye el resultado a v437 ni a producción hasta verificar versión y publicación. Esta entrega solo actualiza documentación; no cambia componentes legacy.

| Elemento | Criterio aprobado para la mejora | Invariante |
| --- | --- | --- |
| Tarjeta patrimonial objetivo de Sites | Conservar metal y emblema discreto; sustituir matiz morado por azul noche, reflejos azul rey y cromo suave. | Emblema oficial sin redibujar ni alterar proporciones. Dorado reservado a las tarjetas aprobadas; no cambiar el dorado de las tres tarjetas `/os`. |
| BitForward: jerarquía | Menos bloques de texto; gráficas y métricas protagonistas, cifras alineadas, fuente/fecha y condición demo visibles. | No inventar cotizaciones, series, activos negociables ni datos disponibles. Información pendiente tiene estado explícito; gráfica ilustrativa identificada como demo. |
| BitForward: herramientas | Agrupar visualmente las herramientas disponibles con nombres claros y acceso comprensible. | No crear ni redefinir funciones/integraciones por un ajuste de presentación. Mantener visibles los estados pendientes reales. |
| Monedas y reflejos | Movimiento decorativo sutil, pausable/reanudable mediante control accesible; presentación estática con `prefers-reduced-motion`. | Ningún cambio/animación de valores, series o estados que aparente cotización, actividad o actualización en vivo. La pausa se mantiene hasta reanudar; elementos puramente decorativos no añaden ruido al lector de pantalla. |

## 6. Brechas priorizadas para comparar con Sites

Prioridad indica orden de decisión, no autorización para implementar.

| Prioridad | Brecha | Decisión / evidencia necesaria antes de avanzar |
| --- | --- | --- |
| P0 | Fuente operativa y contrato de identidad no reconciliados. | Comparar Sites versión 437/UI con esta matriz; confirmar versión publicada, rutas y backend canónicos. No migrar mocks ni asumir que legacy sea producción. |
| P0 | No reserva end-to-end en esta fuente; solicitudes/contacto sin acuse. | Confirmar si Sites ya tiene agenda. Definir selección, disponibilidad autorizada, persistencia, estados y política de cambios; distinguir “Solicitud recibida” de “Reserva confirmada”. |
| P0 | Éxitos aparentes en login, configuración, descargas y domiciliación. | Contrastar con Sites y exigir que éxito dependa de sesión/archivo/persistencia/proveedor; no copiar temporizadores, toasts o estados locales como integración. |
| P1 | Mis citas persistidas, reprogramación, cancelación y recordatorios no implementados en AFORTU. | Definir gestión posterior, zonas horarias, permisos, canales, consentimiento, entrega y reintentos; contrastar con las capacidades de Sites antes de implementar. |
| P1 | Contraste de agenda Sites: reserva/Mis citas aportados, sin gestión cliente de cambios en el snapshot. | Verificar contra v437 y experiencia cliente; revisar administrador elegido y vigencia del calendario externo. No tomar controles administrativos deshabilitados como prueba de ausencia cliente. |
| P1 | Cuentas/contratos/documentos/movimientos/depósitos no conforman un flujo coherente. | Identificadores canónicos; resumen/movimientos/documentos/análisis por contrato; reporte de depósito separado de acreditación y conciliación. |
| P1 | Títulos comprensibles de Movimientos y tarjetas documentales. | Etiquetar por tipo/estado verificados; archivo original, referencia y fuente en detalle. No alterar registros financieros por redacción. |
| P1 | Datos mock y modelos/cálculos financieros divergentes. | Reconciliar `users/{uid}`, `userSettings/{uid}` y `afortu_settings`; moneda, fecha/fuente, intereses 360/365 y estados. No modificar saldos actuales. |
| P1 | Servicios/casos son catálogos o muestras en AFORTU; ocultación del menú sin casos reportada en UI Sites. | Validar familias contratables, solicitud/caso, siguiente paso, documentos y comunicaciones; catálogo accesible también sin casos. Retirar responsables internos de la vista cliente futura. |
| P2 | OS+ carece de lectura/seguimiento y herramientas integradas en `/os`; archivo manual y análisis limitado reportados en UI Sites. | Comprobar funciones reales de Atlas/Intelligence; validar publicaciones, fuente/fecha, permisos y temas; distinguir archivo editorial de actualidad. Aplicar brief aprobado sin redefinir herramientas. |
| P2 | Perfil/soporte/navegación incompletos y destinos provisionales. | Verificar acciones reales, navegación móvil y desktop y estados de error/vacío antes de ampliar pantallas. |
| P2 | Ajuste visual solicitado de tarjeta patrimonial Sites y BitForward. | El coordinador aplicará azul noche/rey/cromo sin morado y reforzará gráficas/métricas y agrupación; conservar emblema y dorado aprobado. Verificar pausa/reduced-motion y datos intactos, sin simular información en vivo. |

La entrega previa de `/os` dejó 8 pruebas focalizadas aprobadas y TypeScript con 43 errores preexistentes idénticos a la línea base, sin errores en archivos nuevos/modificados. Es evidencia de esa entrega, no validación de los flujos legacy de esta auditoría. No se reejecutaron pruebas ni build para este documento. Los checks Vercel fallidos y sus límites están separados en la sección «Diagnóstico de Vercel» de `docs/os/PROTOTIPO_AFORTU_OS.md`; no se alteró el despliegue.

## 7. Pruebas de aceptación propuestas

Ejecutar solo tras comparar fuentes y acordar alcance, con usuarios, cuentas, asesores, documentos y horarios de demostración; sin clientes ni pagos reales. Son criterios futuros, no resultados ejecutados.

| ID | Escenario concreto | Resultado exigido |
| --- | --- | --- |
| A01 | Entrar desde un servicio y elegir asesor/modalidad. | El servicio se conserva; solo se muestran asesores elegibles; quedan visibles modalidad, duración y zona horaria. Si solo hay contacto, el CTA dice contacto, no reservar. |
| A02 | Consultar un día sin huecos y cambiar de zona horaria. | Vacío honesto con alternativa; horarios provienen de la fuente acordada. Fecha/hora coinciden en selector, resumen y confirmación, incluidos límites de día. |
| A03 | Dos clientes demo intentan reservar el mismo hueco. | Una única reserva confirmada; el otro recibe conflicto explícito y disponibilidad actualizada. No doble confirmación. |
| A04 | Repetir submit o reintentar tras corte de red. | Idempotencia: una reserva/solicitud. Mientras no haya respuesta persistida, no mostrar éxito ni folio inventado. Error recuperable sin perder selección. |
| A05 | Enviar solicitud sin horario confirmado. | Acuse con identificador persistido y estado pendiente; no aparece como confirmada. Al fallar el envío, no se anuncia “recibida”. |
| A06 | Completar reserva y recargar / abrir Mis citas. | Mismo ID y detalle persistidos, servicio/asesor/hora/zona/modalidad/estado. Confirmación e invitación, si se acordaron, concuerdan. No datos de otro usuario demo. |
| A07 | Reprogramar a hueco libre y luego a ocupado. | Libre: nuevo horario confirmado y anterior liberado de forma consistente. Ocupado: error; cita original intacta. Cambios visibles al recargar. |
| A08 | Cancelar dentro y fuera de política. | Dentro: estado cancelado persistido, horario liberado y acuse. Fuera: motivo y alternativa, sin éxito falso. Cita pasada no editable indebidamente. |
| A09 | Activar recordatorio, reprogramar y cancelar. | Aviso único del horario vigente; el antiguo se invalida. Cancelada no recibe recordatorio activo. Fallo de entrega registrado con reintentos/estado, según política acordada. |
| A10 | Abrir un contrato demo, sus movimientos y un documento. | Identidad del contrato visible en todas las pestañas; archivo correcto realmente descargable. No toast de descarga sin archivo ni otro contrato/usuario. |
| A11 | Reportar depósito con comprobante demo y revisar estado. | Acuse persistido y archivo asociado al contrato; estado “reportado/pendiente”, no acreditado automáticamente. Conciliación autorizada cambia estado sin duplicar movimiento. |
| A12 | Cambiar perfil/preferencia, cerrar sesión y recuperar acceso demo. | Persistencia comprobable tras recarga; logout invalida sesión efectiva. MFA solo aparece activo tras verificación real del flujo acordado, no por switch local. |
| A13 | Consultar servicio/caso y contenido OS+. | Solo servicios disponibles; siguiente paso accionable; responsables internos fuera de vista cliente. Fuente/fecha visibles; demo marcado. Atlas/Intelligence pendientes no aparentan ejecutarse. |
| A14 | Repetir agenda y cuentas en 320/390 px, escritorio, teclado y movimiento reducido. | Sin desbordamiento; foco visible y orden coherente; errores y confirmaciones accesibles. Ocultar saldos elimina importes, variaciones y segmentos de gráfica visibles, sin presentarse como control de acceso. |
| A15 | Presentar aportación pendiente, depósito confirmado, intereses, compra y valuación demo, con archivos de nombres técnicos. | Títulos semánticos según el tipo/estado; solo confirmado usa “Depósito recibido”. Nombre original, referencia y fuente disponibles en detalle; archivo intacto. |
| A16 | Comparar registros antes/después de cambiar la redacción de títulos. | Importes, moneda, signo, saldo, naturaleza, estado e identificadores idénticos. Una valuación no se contabiliza como depósito o interés; un reporte no pasa a recibido. Tipo desconocido no produce confirmación inventada. |
| A17 | Contrastar dos asesores demo y un bloque externo modificado después del snapshot. | Selección usa el calendario/scope acordado para el asesor; actualización o caducidad explícita del busy externo. No confirmar sobre una copia obsoleta como si fuera sincronización viva. Verificar en vista cliente, no solo administrativa. |
| A18 | Cliente demo sin casos clasificados abre Servicios y Noticias/Análisis. | Catálogo disponible sigue accesible con estado vacío de casos. Noticias archivadas muestran fuente/fecha y no aparentan actualidad; cálculo y accesos no se presentan como herramientas completas no verificadas. |
| A19 | Comparar la tarjeta patrimonial objetivo de Sites antes/después en móvil y escritorio. | Sin matiz morado; azul noche, reflejos azul rey y cromo suave. Metal y emblema discreto conservados, geometría/proporciones oficiales intactas. Dorado solo en tarjetas aprobadas; sin cambios a las tres tarjetas `/os`. |
| A20 | Abrir BitForward con métricas/gráficas demo y herramientas disponibles o pendientes. | Menos bloques de texto; métricas y gráficas legibles y protagonistas, herramientas agrupadas y estados honestos. Sin desbordamiento a 320/390 px; fuente/fecha/demo visibles, sin presentar una integración inexistente como activa. |
| A21 | Pausar y reanudar monedas/reflejos con teclado y tacto; activar reduced-motion. | Pausa detiene todo movimiento decorativo y permanece hasta reanudar; control con foco y estado accesibles. Reduced-motion muestra la variante estática desde el inicio. La lectura y las acciones no dependen de la animación. |
| A22 | Dejar BitForward abierto con datos demo sin nuevas entradas y comparar antes/después del ajuste visual. | Cifras, series, fechas, saldos, cálculos, naturaleza y estados no cambian. Sin cotizaciones inventadas, interpolación de valores ni indicadores de actividad en vivo. Si falta información, pendiente/no disponible en vez de dato fabricado. |

**Puerta de salida de la auditoría:** completar una columna de contraste con Sites (presente, parcial, ausente o no verificable) y acordar qué fuente y contratos se reutilizan. Hasta entonces, esta entrega añade únicamente documentación al PR #47.
