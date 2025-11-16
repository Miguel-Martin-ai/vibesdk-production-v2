#!/bin/bash

# Script de Pre-Despliegue para VibSDK
# Verifica y prepara todo antes del despliegue

set -e

echo "🚀 VibSDK - Verificación Pre-Despliegue"
echo "======================================"
echo ""

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Funciones auxiliares
function check_command() {
    if command -v $1 &> /dev/null; then
        echo -e "${GREEN}✓${NC} $1 está instalado"
        return 0
    else
        echo -e "${RED}✗${NC} $1 NO está instalado"
        return 1
    fi
}

function check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1 existe"
        return 0
    else
        echo -e "${RED}✗${NC} $1 NO existe"
        return 1
    fi
}

function check_env_var() {
    if [ -z "${!1}" ]; then
        echo -e "${RED}✗${NC} $1 no está configurado"
        return 1
    else
        echo -e "${GREEN}✓${NC} $1 está configurado"
        return 0
    fi
}

# 1. Verificar herramientas necesarias
echo -e "${BLUE}1. Verificando herramientas...${NC}"
TOOLS_OK=true

if ! check_command "node"; then
    TOOLS_OK=false
fi

if ! check_command "npm" && ! check_command "bun"; then
    echo -e "${RED}✗${NC} Necesitas npm o bun instalado"
    TOOLS_OK=false
else
    echo -e "${GREEN}✓${NC} Gestor de paquetes disponible"
fi

if ! check_command "git"; then
    TOOLS_OK=false
fi

echo ""

# 2. Verificar archivos críticos
echo -e "${BLUE}2. Verificando archivos del proyecto...${NC}"
FILES_OK=true

if ! check_file "package.json"; then
    FILES_OK=false
fi

if ! check_file "wrangler.jsonc"; then
    FILES_OK=false
fi

if ! check_file "worker/index.ts"; then
    FILES_OK=false
fi

echo ""

# 3. Verificar variables de entorno
echo -e "${BLUE}3. Verificando variables de entorno...${NC}"

# Cargar .prod.vars si existe
if [ -f ".prod.vars" ]; then
    echo -e "${GREEN}✓${NC} Archivo .prod.vars encontrado"
    export $(cat .prod.vars | grep -v '^#' | xargs)
else
    echo -e "${YELLOW}⚠${NC} Archivo .prod.vars no encontrado"
    echo "   Se verificarán variables de entorno del sistema"
fi

ENV_OK=true

# Variables críticas
echo ""
echo "Variables críticas:"
if ! check_env_var "CLOUDFLARE_API_TOKEN"; then
    ENV_OK=false
fi

if ! check_env_var "CLOUDFLARE_ACCOUNT_ID"; then
    ENV_OK=false
fi

# Al menos un proveedor de IA
echo ""
echo "Proveedores de IA (al menos uno requerido):"
AI_PROVIDER_OK=false

if check_env_var "OPENROUTER_API_KEY"; then
    AI_PROVIDER_OK=true
fi

if check_env_var "GOOGLE_AI_STUDIO_API_KEY"; then
    AI_PROVIDER_OK=true
fi

if check_env_var "OPENAI_API_KEY"; then
    AI_PROVIDER_OK=true
fi

if check_env_var "ANTHROPIC_API_KEY"; then
    AI_PROVIDER_OK=true
fi

if [ "$AI_PROVIDER_OK" = false ]; then
    echo -e "${RED}✗${NC} No se encontró ninguna clave de proveedor de IA"
    ENV_OK=false
else
    echo -e "${GREEN}✓${NC} Al menos un proveedor de IA configurado"
fi

# Seguridad
echo ""
echo "Variables de seguridad:"
check_env_var "JWT_SECRET" || ENV_OK=false
check_env_var "SECRETS_ENCRYPTION_KEY" || ENV_OK=false

# Dominio
echo ""
echo "Configuración de dominio:"
check_env_var "CUSTOM_DOMAIN" || ENV_OK=false

echo ""

# 4. Verificar estado de Git
echo -e "${BLUE}4. Verificando estado de Git...${NC}"
GIT_OK=true

if [ -d ".git" ]; then
    echo -e "${GREEN}✓${NC} Repositorio Git encontrado"
    
    # Verificar si hay cambios sin commit
    if [ -n "$(git status --porcelain)" ]; then
        echo -e "${YELLOW}⚠${NC} Hay cambios sin commit"
        echo "   Archivos modificados:"
        git status --short
    else
        echo -e "${GREEN}✓${NC} No hay cambios sin commit"
    fi
else
    echo -e "${YELLOW}⚠${NC} No es un repositorio Git"
fi

echo ""

# 5. Resumen
echo -e "${BLUE}======================================"
echo "RESUMEN DE VERIFICACIÓN"
echo -e "======================================${NC}"
echo ""

ALL_OK=true

if [ "$TOOLS_OK" = true ]; then
    echo -e "${GREEN}✓${NC} Herramientas: OK"
else
    echo -e "${RED}✗${NC} Herramientas: FALTA INSTALAR"
    ALL_OK=false
fi

if [ "$FILES_OK" = true ]; then
    echo -e "${GREEN}✓${NC} Archivos: OK"
else
    echo -e "${RED}✗${NC} Archivos: FALTAN ARCHIVOS"
    ALL_OK=false
fi

if [ "$ENV_OK" = true ]; then
    echo -e "${GREEN}✓${NC} Variables de Entorno: OK"
else
    echo -e "${RED}✗${NC} Variables de Entorno: FALTAN VARIABLES"
    ALL_OK=false
fi

echo ""

if [ "$ALL_OK" = true ]; then
    echo -e "${GREEN}🎉 ¡Todo listo para desplegar!${NC}"
    echo ""
    echo "Para desplegar, ejecuta:"
    echo -e "  ${BLUE}bun run deploy${NC}"
    echo "o"
    echo -e "  ${BLUE}npm run deploy${NC}"
    echo ""
    
    # Preguntar si quiere continuar
    read -p "¿Deseas continuar con el despliegue ahora? (s/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[SsYy]$ ]]; then
        echo ""
        echo -e "${BLUE}Iniciando despliegue...${NC}"
        echo ""
        
        # Detectar gestor de paquetes
        if command -v bun &> /dev/null; then
            bun run deploy
        else
            npm run deploy
        fi
    else
        echo "Despliegue cancelado"
    fi
else
    echo -e "${RED}❌ No se puede desplegar aún${NC}"
    echo ""
    echo "Por favor, resuelve los problemas indicados arriba antes de desplegar."
    echo ""
    echo "Para ayuda, consulta:"
    echo "  - docs/DEPLOYMENT_GUIDE_ES.md"
    echo "  - docs/OPENROUTER_GUIDE_ES.md"
    echo ""
    exit 1
fi
