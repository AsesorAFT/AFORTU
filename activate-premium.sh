#!/bin/bash

# 🚀 Script de Activación - AFORTU Premium Design
# Este script activa el nuevo diseño premium en tu aplicación

echo "🎨 AFORTU Premium Design - Activación"
echo "======================================"
echo ""

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Backup del dashboard actual
echo -e "${BLUE}📦 Creando backup del dashboard actual...${NC}"
if [ -f "src/app/dashboard/page.tsx" ]; then
    cp src/app/dashboard/page.tsx src/app/dashboard/page.backup.$(date +%Y%m%d_%H%M%S).tsx
    echo -e "${GREEN}✓ Backup creado${NC}"
else
    echo -e "${YELLOW}! Dashboard actual no encontrado${NC}"
fi

# 2. Activar dashboard premium
echo -e "${BLUE}🎨 Activando dashboard premium...${NC}"
if [ -f "src/app/dashboard/page-premium.tsx" ]; then
    cp src/app/dashboard/page-premium.tsx src/app/dashboard/page.tsx
    echo -e "${GREEN}✓ Dashboard premium activado${NC}"
else
    echo -e "${YELLOW}! Dashboard premium no encontrado${NC}"
    exit 1
fi

# 3. Verificar archivos necesarios
echo -e "${BLUE}🔍 Verificando archivos del sistema de diseño...${NC}"

FILES=(
    "src/lib/theme/colors.ts"
    "src/lib/theme/animations.ts"
    "src/lib/theme/typography.ts"
    "src/lib/theme/spacing.ts"
    "src/components/ui/premium-card.tsx"
    "src/components/ui/premium-button.tsx"
    "src/components/ui/stat-card.tsx"
    "src/components/ui/skeleton.tsx"
    "src/hooks/use-interactions.ts"
    "src/hooks/use-performance.ts"
)

ALL_PRESENT=true
for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $file"
    else
        echo -e "${YELLOW}✗${NC} $file ${YELLOW}(faltante)${NC}"
        ALL_PRESENT=false
    fi
done

if [ "$ALL_PRESENT" = false ]; then
    echo -e "${YELLOW}⚠️  Algunos archivos faltan. Verifica la instalación.${NC}"
else
    echo -e "${GREEN}✓ Todos los archivos presentes${NC}"
fi

echo ""
echo -e "${GREEN}✓ Activación completada!${NC}"
echo ""
echo "📝 Próximos pasos:"
echo "  1. npm run dev       → Iniciar servidor de desarrollo"
echo "  2. Abrir http://localhost:3000/dashboard"
echo "  3. Verificar el nuevo diseño premium"
echo ""
echo "📚 Documentación:"
echo "  - docs/DESIGN_SYSTEM.md"
echo "  - docs/IMPLEMENTACION.md"
echo "  - MEJORAS_IMPLEMENTADAS.md"
echo ""
echo "🎉 ¡Disfruta del nuevo diseño premium de AFORTU!"
