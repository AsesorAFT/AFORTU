# Arquitectura y Hardening de IAM en AFORTU

Este documento establece la estrategia de Gestión de Identidades y Accesos (IAM) para el proyecto **AFORTU**, con foco en:
- Principio de mínimo privilegio
- Trazabilidad y auditoría
- Separación de responsabilidades
- Reducción de superficie de ataque (eliminación de roles amplios y credenciales largas)

Estado: Draft (alineado con Issue #13)

## 1. Estado Actual (Baseline) y Riesgos

Hallazgos iniciales:
- Uso del rol `roles/editor` en la service account por defecto de Compute Engine.
- Cuenta de GitHub Actions con permisos amplios (Auth admin, API Keys Viewer).
- Falta de configuración explícita de Audit Logs para acceso a datos (Firestore / IAM / Secret Manager).
- Asignación de `roles/owner` a un usuario individual en lugar de a un grupo.
- Ausencia de proceso formal de rotación / revisión de cuentas y permisos.

Riesgos clave:
| Riesgo | Descripción | Impacto | Mitigación |
| ------ | ----------- | ------- | ---------- |
| Privilegios excesivos | SA con `Editor` puede modificar casi cualquier recurso | Alto | Eliminar roles amplios, crear roles personalizados |
| Exfiltración de secretos | CI/CD con acceso innecesario a claves | Alto | WIF + Secret Manager + eliminación de API Keys Viewer |
| Acceso no auditado | Falta de Data Access Logs dificulta forense | Medio/Alto | Activar Audit Logs y retención centralizada |
| Escalada lateral | SA multiuso utilizada por varias funciones | Medio | Separar workloads por SA dedicada |
| Abuso AI / costos | Sin límites y visibilidad en prompts e invocaciones | Medio | Issues #10–#12 (historial, coste, moderación) |

## 2. Estado Objetivo (Target IAM Model)

### 2.1. Principios

1. **Una función / pipeline = una Service Account (SA) dedicada**
2. **Roles mínimos**: solo permisos requeridos para la operación normal.
3. **No se usan cuentas de servicio por defecto** (Compute, App Engine) en producción.
4. **Credenciales efímeras** via Workload Identity Federation (OIDC) para CI/CD.
5. **Auditoría exhaustiva**: IAM policy changes, Service Account key creation, Data Access.
6. **Separación de deberes**: deploy ≠ seguridad ≠ operación de secretos.

### 2.2. Cuentas de Servicio Propuestas

| Service Account | Roles (mínimos recomendados) | Notas |
| --------------- | ---------------------------- | ----- |
| `sa-runtime-core@...` | `roles/run.invoker`, `roles/logging.logWriter`, `roles/monitoring.metricWriter`, `roles/datastore.user`, `roles/secretmanager.secretAccessor` | Backend runtime (Cloud Run / Functions) |
| `sa-ai-worker@...` | Igual que runtime + (si aplica) acceso a APIs AI externas vía secretos | Procesamiento AI / colas |
| `sa-github-deploy@...` | `roles/run.developer` (o `run.admin` si crea servicios), `roles/firebasehosting.admin` (si Hosting), `roles/artifactregistry.writer`, `roles/cloudbuild.builds.editor`, `roles/iam.workloadIdentityUser` (binding WIF) | CI/CD (deploy) |
| `sa-github-read@...` (opcional) | `roles/logging.viewer`, `roles/cloudrun.viewer` | Pipelines de inspección |
| `firebase-adminsdk-<hash>@...` | Revisar y limitar a: `roles/datastore.user`, `roles/firebaseauth.admin` (solo si crea/gestiona usuarios), remover `serviceAccountTokenCreator` salvo uso real | Evitar otorgar permisos no usados |
| (Eliminar) `PROJECT_NUMBER-compute@developer.gserviceaccount.com` | — | Quitar `roles/editor` y bloquear su uso |

Notas:
- Agregar roles más específicos (p.ej. Firestore granular) requiere o reglas de seguridad o segmentación por proyecto.
- Si se necesita lectura de secretos granular, usar secretos por dominio (ej. `AI_OPENAI_KEY`, `PAYMENTS_STRIPE_KEY`) y conceder `secretAccessor` solo a quienes proceda.

### 2.3. Grupos y Acceso Humano

| Grupo | Roles | Justificación |
| ----- | ----- | ------------- |
| `afortu-owners@` | `roles/owner` | 2–3 personas clave; no cuentas personales directas |
| `afortu-developers@` | `roles/run.developer`, `roles/firebasehosting.viewer`, `roles/logging.viewer`, (si necesario) `roles/artifactregistry.reader` | Despliegue y depuración |
| `afortu-security@` | `roles/iam.securityReviewer`, `roles/logging.privateLogViewer`, `roles/secretmanager.viewer` (si auditoría de secretos) | Revisión de configuración |
| `afortu-observers@` (opcional) | `roles/viewer` | Lectura pasiva |

Break-glass:
- Crear `afortu-breakglass@` (cuenta controlada) protegida con MFA hardware.  
- Uso documentado y registrado (ticket + justificación + tiempo limitado).

### 2.4. Políticas de Organización (si disponible)

| Política | Valor | Objetivo |
| -------- | ----- | -------- |
| `constraints/iam.disableServiceAccountKeyCreation` | Enforce | Evitar claves largas |
| `constraints/iam.disableServiceAccountKeyUpload` | Enforce | Prevenir inyección de claves externas |
| `constraints/iam.allowedPolicyMemberDomains` | Lista dominios corporativos | Evitar miembros externos accidentales |
| `constraints/compute.disableSerialPortAccess` | Enforce | Reducir superficie debug no auditada |
| (Futuro) VPC-SC | Definir perímetros | Aislar datos sensibles |

## 3. Plan de Implementación

### Fase 1: Inventario y Limpieza
1. Exportar IAM actual:
   ```bash
   gcloud projects get-iam-policy afortu --format=json > backup/iam-policy-$(date +%F).json
   ```
2. Listar bindings con roles amplios:
   ```bash
   gcloud projects get-iam-policy afortu --flatten="bindings[].members" \
     --filter="bindings.role:roles/editor OR bindings.role:roles/owner" \
     --format="table(bindings.role, bindings.members)"
   ```
3. Confirmar servicios activos: Firestore vs Realtime DB, Hosting, Cloud Run, Functions, Secret Manager.

### Fase 2: Cuentas de Servicio Específicas
1. Crear SAs:
   ```bash
   gcloud iam service-accounts create sa-runtime-core --display-name="Runtime Core"
   gcloud iam service-accounts create sa-github-deploy --display-name="GitHub Deploy"
   ```
2. Asignar roles mínimos (iterar y ajustar tras pruebas):
   ```bash
   gcloud projects add-iam-policy-binding afortu \
     --member="serviceAccount:sa-runtime-core@afortu.iam.gserviceaccount.com" \
     --role="roles/run.invoker"
   # (repetir para cada rol)
   ```
3. Remover `Editor` de la default compute SA (tras validar dependencias):
   ```bash
   gcloud projects remove-iam-policy-binding afortu \
     --member="serviceAccount:PROJECT_NUMBER-compute@developer.gserviceaccount.com" \
     --role="roles/editor"
   ```

### Fase 3: Workload Identity Federation (CI/CD)
1. Crear pool y proveedor OIDC (GitHub Actions).
2. Añadir binding `roles/iam.workloadIdentityUser` a `sa-github-deploy`.
3. Actualizar workflows:
   ```yaml
   permissions:
     id-token: write
     contents: read
   - uses: google-github-actions/auth@v2
     with:
       workload_identity_provider: projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/github-pool/providers/github
       service_account: sa-github-deploy@afortu.iam.gserviceaccount.com
   ```

### Fase 4: Auditoría y Logging
1. Activar Data Access Logs (Firestore, Secret Manager, IAM).  
2. Crear sink BigQuery:
   ```bash
   gcloud logging sinks create audit-bq \
     bigquery.googleapis.com/projects/afortu/datasets/audit_logs \
     --log-filter='protoPayload.serviceName=("firestore.googleapis.com" OR "iam.googleapis.com" OR "secretmanager.googleapis.com")'
   ```
3. Alertas:
   - Cambios IAM > N por hora.
   - Creación de claves de SA (should be zero).
   - Aumento PERMISSION_DENIED > umbral.

### Fase 5: Secretos y Eliminación de Claves
1. Migrar variables sensibles a Secret Manager.
2. Otorgar `secretAccessor` solo a runtime y workers necesarios.
3. Verificar no hay claves de servicio activas:
   ```bash
   gcloud iam service-accounts keys list --iam-account=sa-runtime-core@afortu.iam.gserviceaccount.com
   ```

### Fase 6: Validación y Observabilidad
1. Tests de despliegue (dry-run + canary).
2. Validar que logs y métricas se generan.
3. Simular incidente (remover rol crítico) y medir tiempo de recuperación.

## 4. Revisión Periódica

Frecuencia: Semestral o bajo eventos gatillo:
- Nuevo dominio funcional (AI ampliado, pagos, PII).
- Incidente de seguridad.
- Cambio de modelo de costos o compliance.

Checklist de revisión:
- [ ] 0 roles `Editor` activos
- [ ] 0 claves de servicio nuevas desde revisión anterior
- [ ] 100% pipelines CI por OIDC
- [ ] Auditoría de group membership (joiners/leavers)
- [ ] Revisión de permisos de Admin SDK SA
- [ ] Confirmación de rotación de secretos críticos (< 180 días)

## 5. Métricas y KPIs (Security Posture)

| KPI | Objetivo | Fuente |
| --- | -------- | ------ |
| Claves de SA vigentes | 0 | gcloud / Audit Logs |
| Tiempo revocación acceso tras offboarding | < 24h | Tickets / IAM logs |
| Despliegues por OIDC (%) | 100% | Pipelines GHA |
| Errores PERMISSION_DENIED / total reqs | < 1% | Cloud Logging |
| Alertas de IAM respondidas < SLA | 100% en < 4h | Monitoring |

## 6. Registro de Decisiones (ADR-Lite)

| ID | Decisión | Fecha | Motivo | Revisión |
| -- | -------- | ----- | ------ | -------- |
| ADR-001 | Adoptar WIF para CI/CD | 2025-08 | Eliminar credenciales largas | 2026-02 |
| ADR-002 | Separar SAs por workload | 2025-08 | Minimizar blast radius | 2026-02 |

## 7. Próximos Pasos Relacionados con Issues AI

- Integrar en README (Issue #13) un resumen (no todo el detalle).
- Issues #10–#12 deben registrar en Firestore: userId, tokens, coste, flags de moderación para correlacionar con auditoría IAM.
- Añadir sección "AI Access Boundaries" si se define un tope de gasto diario por usuario.

## 8. Anexos (Opcional Futuro)

- Ejemplos de políticas de organización.
- Snippets Terraform / IaC equivalentes.
- Playbook de brecha IAM (Incident Response).

---

Última actualización: (poner fecha al publicar)