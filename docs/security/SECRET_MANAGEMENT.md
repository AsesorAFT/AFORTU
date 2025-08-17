# Gestión de Secretos y Claves

## Objetivo
Prevenir exposición accidental de credenciales (API keys, claves privadas) y establecer un proceso de detección temprana y rotación.

## Riesgos comunes
- Commit de `.env` o claves inline.
- Copiar/pegar secrets en issues, PRs o README.
- Logs que imprimen variables sensibles.
- Archivos de servicio subidos (ej: serviceAccount.json).

## Herramientas
1. detect-secrets (pre-commit)
2. Gitleaks (CI)
3. Script local `scripts/scan-secrets.ts`
4. Secret Scanning de GitHub (habilitar en el repo)

## Flujo de trabajo
1. Añadir secret en `.env.local` (ignorado por git).
2. Ejecutar `pre-commit install`.
3. Commits: detect-secrets valida nuevas exposiciones.
4. PR: Gitleaks ejecuta escaneo extendido.
5. Revisar alertas y remediar.

## Variables críticas (ejemplos)
- GEMINI_API_KEY
- AFORTU_API_KEY
- (futuras) Claves de DB / Redis / proveedores externos.

## Rotación si se compromete una clave
1. Revocar/regenerar en el proveedor.
2. Reemplazar en entorno (local & producción).
3. Limpiar historial (filter-repo) si estuvo comiteada.
4. Forzar push y avisar al equipo.
5. Revisar métricas de uso y facturación.

## Limpieza de historial (ejemplo)
```bash
pip install git-filter-repo
echo 'regex:AIza[0-9A-Za-z\-_]{35}==>REDACTED_GOOGLE_KEY' > replacements.txt
git filter-repo --replace-text replacements.txt
git push --force origin main
```

## Pre-commit (detect-secrets)
- Baseline inicial: `.secrets.baseline`
- Nuevos hallazgos deben auditarse (flag `--fail-on-unaudited`).

## Script rápido
```bash
pnpm ts-node scripts/scan-secrets.ts
```

## CI (Gitleaks)
- Escanea cambios y puede revisar historial completo (fetch-depth: 0).

## Falsos positivos
- Auditar y añadir al baseline o ajustar reglas en `.gitleaks.toml`.

## Política sugerida de rotación
| Tipo | Ejemplos | Rotación |
|------|----------|----------|
| Críticas | Claves DB root, service accounts | 90 días |
| Estándar | API keys de terceros | 90-180 días |
| Baja | Tokens temporales de test | Ad hoc |

## Checklist
- [ ] `.env*` ignorados
- [ ] Pre-commit instalado
- [ ] CI scanning activo
- [ ] Secret Scanning habilitado
- [ ] Procedimiento de rotación documentado
- [ ] Sin claves expuestas en commits recientes