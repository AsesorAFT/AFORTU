# Revisión de la aplicación AFORTU

## Fortalezas destacadas
- La página principal proyecta una estética premium consistente (paleta azul/dorado, tipografía elegante) y comunica con claridad la propuesta de valor centrada en IA, gestión patrimonial y seguridad.【F:src/app/page.tsx†L10-L169】
- El layout raíz ya incorpora metadatos completos (Open Graph, Twitter) y un acceso rápido por WhatsApp, lo que aporta bases sólidas para SEO y canales de contacto inmediato.【F:src/app/layout.tsx†L1-L92】

## Oportunidades de mejora
### Estructura y navegación
- El sidebar del dashboard lista rutas clave, pero muchas todavía no existen (`/asset-management`, `/contracts`, `/coordination`, `/consultoria`, etc.) y el usuario se mantiene “simulado”. Al desplegar esta vista en producción aparecerán enlaces rotos y ausencia de personalización real del cliente.【F:src/components/layout/Sidebar.tsx†L38-L121】
- El archivo `src/app/dashboard/page.tsx` está vacío, por lo que el panel principal carece de contenido inicial o widgets que materialicen las promesas de valor (portafolio, métricas, bitácora).【fe2344†L1-L2】
- Existen múltiples variantes y respaldos de páginas (`page-new.tsx`, `page-backup.tsx`, `page.tsx.backup`, `page 2.tsx`) mezclados en `src/app/`, lo cual dificulta mantener una sola fuente de verdad y sugiere conflictos no resueltos en el historial.【F:src/app/page.tsx.backup†L1-L70】

### Contenido y mensajes
- La sección de servicios utiliza descripciones y enlaces placeholder (`link: "#"`), por lo que el flujo de descubrimiento se corta y el cliente no puede profundizar en los productos clave sin intervención manual.【F:src/app/services/page.tsx†L15-L67】
- El chat “Asesor AFT” funciona con respuestas simuladas. Es útil para demos, pero en producción conviene conectar realmente con GenAI o, al menos, explicitar al usuario que se trata de un prototipo para evitar disonancia entre la promesa y la experiencia.【F:src/components/dashboard/chat-asesor.tsx†L17-L119】
- El CTA de la versión PRO en `page-new.tsx` envía a `/contact`, ruta que no existe todavía, generando un callejón sin salida para leads interesados.【F:src/app/page-new.tsx†L198-L214】【1f8dec†L1-L1】

### Secuencia y consistencia de la propuesta PRO
- La lógica de onboarding ya contempla banderas para cuentas PRO y distintos tipos de cuenta en Firestore, pero en la interfaz pública no se ve una comparación clara entre plan estándar vs. PRO, ni beneficios exclusivos conectados con dichas banderas técnicas.【F:src/lib/auth-service.ts†L13-L76】
- Reforzar la narrativa PRO con una ruta dedicada (por ejemplo `/pro`), testimonios o casos de uso y llamadas a la acción que concluyan en formularios funcionales ayudaría a conectar la promesa estratégica con la experiencia real.

## Recomendaciones priorizadas
1. **Consolidar el árbol de páginas**: decidir qué versión de landing quedará viva, eliminar respaldos y completar las rutas que aparecen en el sidebar.
2. **Definir el MVP del dashboard**: aunque sea con datos ficticios, mostrar widgets de activos, bitácora y acciones recomendadas dará coherencia con los mensajes de la home.
3. **Completar los flujos PRO**: habilitar las rutas/acciones (`/contact` o un formulario in-app) y presentar beneficios diferenciales y precios, aprovechando la bandera `accountType` ya disponible en la capa de datos.
4. **Plan de contenido para servicios**: reemplazar placeholders por fichas con beneficios tangibles, casos y CTAs medibles.
5. **Explicitar estado beta del chat IA** (o conectar con la API real) para alinear expectativas y evitar ruido regulatorio con clientes patrimoniales.
