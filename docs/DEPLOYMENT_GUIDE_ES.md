# Guía de Despliegue de VibSDK con OpenRouter

Esta guía te ayudará a desplegar VibSDK a producción en Cloudflare Workers con soporte de OpenRouter.

## Prerrequisitos

Antes de desplegar, asegúrate de tener:

### 1. Cuenta y Plan de Cloudflare
- **Cloudflare Workers Paid Plan** - Requerido para Workers ilimitados
- **Workers for Platforms** (opcional) - Para características de despliegue de apps
- **Advanced Certificate Manager** (opcional) - Si usas subdominios de primer nivel

### 2. Claves API

Como mínimo necesitas **una** de estas claves de proveedor de IA:

- **OpenRouter API Key** (Recomendado) - `sk-or-v1-...` desde [OpenRouter.ai](https://openrouter.ai/)
- **Google Gemini API Key** - desde [ai.google.dev](https://ai.google.dev/)
- **OpenAI API Key** - desde [platform.openai.com](https://platform.openai.com/)
- **Anthropic API Key** - desde [console.anthropic.com](https://console.anthropic.com/)

### 3. Información de Cloudflare

- **Account ID** - Encuéntralo en tu panel de Cloudflare (barra lateral)
- **API Token** - Créalo en "My Profile" → "API Tokens"
  - Usa la plantilla "Edit Cloudflare Workers" y agrega permisos adicionales:
    - Workers KV Storage:Edit
    - Workers Scripts:Edit
    - D1:Edit
    - R2:Edit
    - AI Gateway:Read, Edit, Run
    - Y otros según necesites

### 4. Dominio Personalizado (Requerido para Producción)

- Un dominio configurado en Cloudflare
- Ejemplo: `flowkers.com` o `app.tudominio.com`

## Paso 1: Preparar Variables de Entorno

### Opción A: Crear archivo .prod.vars manualmente

Crea un archivo `.prod.vars` en la raíz del proyecto:

```bash
# Copia el ejemplo
cp .dev.vars.example .prod.vars
```

Edita `.prod.vars` con tus valores reales:

```bash
# ==================== 
# CLOUDFLARE (Requerido)
# ====================
CLOUDFLARE_ACCOUNT_ID=tu_account_id_aqui
CLOUDFLARE_API_TOKEN=tu_api_token_aqui
CLOUDFLARE_AI_GATEWAY=vibesdk-gateway
CLOUDFLARE_AI_GATEWAY_TOKEN=tu_api_token_aqui

# ====================
# AI PROVIDER (Al menos uno requerido)
# ====================
# OpenRouter (Recomendado - acceso a 100+ modelos)
OPENROUTER_API_KEY=sk-or-v1-tu-clave-aqui

# O usa otros proveedores:
# GOOGLE_AI_STUDIO_API_KEY=tu_google_key_aqui
# OPENAI_API_KEY=tu_openai_key_aqui
# ANTHROPIC_API_KEY=tu_anthropic_key_aqui

# ====================
# SEGURIDAD (Requerido)
# ====================
# Genera con: openssl rand -base64 32
JWT_SECRET=tu_jwt_secret_generado
SECRETS_ENCRYPTION_KEY=tu_encryption_key_generado
ENTROPY_KEY=tu_entropy_key_generado

# ====================
# DOMINIO (Requerido)
# ====================
CUSTOM_DOMAIN=tu-dominio.com

# ====================
# CONFIGURACIÓN DE SANDBOX
# ====================
SANDBOX_SERVICE_API_KEY=tu_sandbox_api_key
MAX_SANDBOX_INSTANCES=10
SANDBOX_INSTANCE_TYPE=standard-3

# ====================
# OAUTH (Opcional - para login con Google/GitHub)
# ====================
GOOGLE_CLIENT_ID=tu_google_client_id
GOOGLE_CLIENT_SECRET=tu_google_client_secret
GITHUB_CLIENT_ID=tu_github_client_id
GITHUB_CLIENT_SECRET=tu_github_client_secret
```

### Opción B: El script creará .prod.vars automáticamente

Si tienes las variables en tu entorno (CI/CD), el script de despliegue creará `.prod.vars` automáticamente.

## Paso 2: Configurar Modelos de OpenRouter (Opcional)

Si quieres usar modelos de OpenRouter, edita `worker/agents/inferutils/config.ts`:

```typescript
// Opción 1: Usar configuración predefinida
import { OPENROUTER_AGENT_CONFIG } from './config.openrouter-example';
export const AGENT_CONFIG = OPENROUTER_AGENT_CONFIG;

// Opción 2: Personalizar modelos específicos
export const AGENT_CONFIG: AgentConfig = {
    phaseImplementation: {
        name: AIModels.OPENROUTER_DEEPSEEK_V3,
        max_tokens: 64000,
        temperature: 0.2,
    },
    codeReview: {
        name: AIModels.OPENROUTER_CLAUDE_SONNET,
        max_tokens: 32000,
        temperature: 0.1,
    },
    // ... resto de configuración
};
```

Ver `worker/agents/inferutils/config.openrouter-example.ts` para ejemplos completos.

## Paso 3: Verificar Configuración de wrangler.jsonc

Asegúrate de que `wrangler.jsonc` tenga:

```jsonc
{
    "vars": {
        "CUSTOM_DOMAIN": "tu-dominio.com",
        "CLOUDFLARE_AI_GATEWAY": "vibesdk-gateway",
        "MAX_SANDBOX_INSTANCES": "10",
        // ... otras variables
    },
    "routes": [
        {
            "pattern": "tu-dominio.com/*",
            "zone_id": "tu_zone_id" // Se detectará automáticamente
        }
    ]
}
```

## Paso 4: Compilar el Proyecto

```bash
# Instalar dependencias
npm install
# o
bun install

# Compilar TypeScript y frontend
npm run build
# o
bun run build
```

## Paso 5: Desplegar

```bash
# Desplegar con bun (recomendado)
bun run deploy

# O con npm
npm run deploy
```

## ¿Qué Hace el Script de Despliegue?

El script automáticamente:

1. ✅ Valida variables de entorno
2. ✅ Actualiza configuración de wrangler.jsonc
3. ✅ Detecta zona de Cloudflare para tu dominio
4. ✅ Configura rutas personalizadas
5. ✅ Actualiza configuración de containers
6. ✅ Crea AI Gateway si es necesario
7. ✅ Despliega plantillas a R2
8. ✅ Ejecuta migraciones de base de datos D1
9. ✅ Sube secretos a Cloudflare
10. ✅ Despliega el Worker

## Verificar el Despliegue

Después del despliegue exitoso:

1. **Visita tu dominio**: `https://tu-dominio.com`
2. **Verifica AI Gateway**: Panel de Cloudflare → AI → AI Gateway
3. **Verifica Worker**: Panel de Cloudflare → Workers & Pages
4. **Verifica D1**: Panel de Cloudflare → D1
5. **Verifica R2**: Panel de Cloudflare → R2

## Configuración DNS

Para que las previews funcionen, agrega un registro DNS:

```
Tipo: CNAME
Nombre: *
Destino: tu-dominio.com
Proxy: Activado (nube naranja)
```

## Solución de Problemas Comunes

### Error: "Missing required build variables"

**Solución**: Asegúrate de que `CLOUDFLARE_API_TOKEN` esté configurado:
```bash
export CLOUDFLARE_API_TOKEN=tu_token_aqui
bun run deploy
```

### Error: "Failed to detect zone for custom domain"

**Solución**: 
1. Verifica que el dominio esté agregado a Cloudflare
2. Verifica que tu API token tenga permisos de zona
3. El dominio debe estar activo (no en "pending")

### Error: "You do not have access to dispatch namespaces"

**Causa**: Workers for Platforms no está habilitado
**Solución**: El despliegue continuará sin esta característica. Para habilitarla:
- Ve a https://dash.cloudflare.com/workers-for-platforms
- O contacta a tu equipo de cuenta si eres cliente Enterprise

### Error: "wrangler secret bulk failed"

**Solución**:
1. Verifica que `.prod.vars` exista y tenga el formato correcto
2. Asegúrate de que no haya caracteres especiales sin escapar
3. Verifica permisos del API token

### Los modelos de OpenRouter no funcionan

**Verificar**:
1. `OPENROUTER_API_KEY` está en `.prod.vars`
2. Has editado `worker/agents/inferutils/config.ts` para usar modelos de OpenRouter
3. La clave API comienza con `sk-or-`
4. Tu cuenta de OpenRouter tiene créditos

## Redeployar Cambios

Para redesplegar después de hacer cambios:

```bash
# 1. Commit tus cambios
git add .
git commit -m "Tu mensaje de commit"

# 2. Recompilar
bun run build

# 3. Redesplegar
bun run deploy
```

## Despliegue Continuo (CI/CD)

Para configurar despliegue automático:

### GitHub Actions

Agrega estos secrets en tu repositorio:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `OPENROUTER_API_KEY` (o tu proveedor de IA preferido)
- `JWT_SECRET`
- `SECRETS_ENCRYPTION_KEY`
- Otros secretos necesarios

Crea `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Bun
        uses: oven-sh/setup-bun@v1
        
      - name: Install dependencies
        run: bun install
        
      - name: Build
        run: bun run build
        
      - name: Deploy
        run: bun run deploy
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          OPENROUTER_API_KEY: ${{ secrets.OPENROUTER_API_KEY }}
          JWT_SECRET: ${{ secrets.JWT_SECRET }}
          SECRETS_ENCRYPTION_KEY: ${{ secrets.SECRETS_ENCRYPTION_KEY }}
          # ... otros secretos
```

## Monitoreo Post-Despliegue

### 1. Logs en Tiempo Real

```bash
npx wrangler tail
```

### 2. Analytics

- Ve a Cloudflare Dashboard → Workers → Tu Worker → Analytics

### 3. AI Gateway Analytics

- Ve a Cloudflare Dashboard → AI → AI Gateway
- Revisa uso de modelos, latencia y costos

### 4. Errores

- Revisa logs en Cloudflare Dashboard
- Configura Sentry (opcional) para tracking de errores

## Comandos Útiles

```bash
# Ver logs en tiempo real
npx wrangler tail

# Ver lista de secretos (nombres, no valores)
npx wrangler secret list

# Actualizar un secreto individual
npx wrangler secret put NOMBRE_SECRETO

# Ver lista de Workers
npx wrangler deployments list

# Rollback a despliegue anterior
npx wrangler rollback

# Ver migraciones de D1
npx wrangler d1 migrations list vibesdk-db

# Ejecutar migraciones manualmente
npm run db:migrate:remote
```

## Costos Estimados

### Cloudflare
- **Workers Paid Plan**: $5/mes (10M requests incluidas)
- **Workers for Platforms**: Variable según uso
- **D1**: Gratis hasta 100K escrituras/día
- **R2**: Gratis hasta 10GB almacenamiento

### AI Providers (con OpenRouter)
- **DeepSeek V3**: ~$0.27 por 1M tokens (muy económico)
- **Qwen Coder**: ~$0.40 por 1M tokens
- **Claude Sonnet**: ~$3 por 1M tokens
- **GPT-4o**: ~$2.50-$10 por 1M tokens

**Tip**: Usa modelos económicos para desarrollo y modelos premium solo para producción crítica.

## Próximos Pasos

1. ✅ Configura tu dominio personalizado
2. ✅ Configura OAuth para login social
3. ✅ Optimiza selección de modelos según presupuesto
4. ✅ Configura monitoreo y alertas
5. ✅ Implementa CI/CD para despliegues automáticos

## Soporte

- **Problemas de Cloudflare**: [Cloudflare Community](https://community.cloudflare.com/)
- **Problemas de OpenRouter**: [Discord de OpenRouter](https://discord.gg/openrouter)
- **Problemas de VibSDK**: [GitHub Issues](https://github.com/cloudflare/vibesdk/issues)

---

**¡Listo para desplegar!** 🚀

Para más información:
- [Guía de OpenRouter](./OPENROUTER_GUIDE_ES.md)
- [Guía de Setup](./setup.md)
- [README Principal](../README.md)
