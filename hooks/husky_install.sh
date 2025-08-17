#!/usr/bin/env bash
# Bootstrap Husky + añade invocación del escáner local al pre-commit.
set -euo pipefail
npx husky-init && npm pkg set scripts.prepare="husky install"
# Append custom scanner (non-blocking example: change || exit 1 to enforce)
echo 'node scripts/scan-secrets.ts || exit 1' >> .husky/pre-commit
echo "Husky pre-commit secret scan hooked."