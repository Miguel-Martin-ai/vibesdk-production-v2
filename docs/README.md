# Documentación de VibSDK

Índice de documentación disponible para VibSDK con soporte de OpenRouter.

## 🚀 Para Empezar

### Español

1. **[Resumen de Despliegue](RESUMEN_DESPLIEGUE.md)** ⭐
   - Resumen ejecutivo de todo lo necesario para desplegar
   - Inicio rápido en 5 minutos
   - Lista de verificación completa

2. **[Guía de OpenRouter](OPENROUTER_GUIDE_ES.md)**
   - Configuración completa de OpenRouter
   - Modelos disponibles y casos de uso
   - Optimización de costos
   - Solución de problemas

3. **[Guía de Despliegue](DEPLOYMENT_GUIDE_ES.md)**
   - Guía paso a paso para producción
   - Configuración de CI/CD
   - Monitoreo post-despliegue
   - Comandos útiles

### English

1. **[OpenRouter Quick Start](OPENROUTER_QUICKSTART.md)** ⭐
   - 5-minute setup guide
   - Quick configuration templates
   - Common troubleshooting

2. **[OpenRouter Complete Guide](OPENROUTER_GUIDE.md)**
   - Full setup instructions
   - Available models with use cases
   - Cost optimization strategies
   - Advanced usage patterns

3. **[OpenRouter Changes Summary](OPENROUTER_CHANGES.md)**
   - Technical summary of all changes
   - Migration guide
   - File modifications list

## 📋 Guías por Tema

### Configuración Inicial

- **[Setup Guide](setup.md)** - Configuración local inicial (English)
- **[.dev.vars.example](../.dev.vars.example)** - Plantilla de variables de entorno

### AI Providers

| Proveedor | Documentación | Guía |
|-----------|---------------|------|
| **OpenRouter** | [ES](OPENROUTER_GUIDE_ES.md) / [EN](OPENROUTER_GUIDE.md) | ⭐ Recomendado |
| **Google Gemini** | [setup.md](setup.md#ai-provider-selection) | Por defecto |
| **OpenAI** | [setup.md](setup.md#ai-provider-selection) | - |
| **Anthropic** | [setup.md](setup.md#ai-provider-selection) | - |

### Despliegue

- **[Deployment Guide (ES)](DEPLOYMENT_GUIDE_ES.md)** - Guía completa de despliegue
- **[Resumen de Despliegue](RESUMEN_DESPLIEGUE.md)** - Resumen ejecutivo
- **[../scripts/pre-deploy-check.sh](../scripts/pre-deploy-check.sh)** - Script de verificación

### Configuración de Modelos

- **[config.openrouter-example.ts](../worker/agents/inferutils/config.openrouter-example.ts)** - 3 configuraciones completas
- **[config.ts](../worker/agents/inferutils/config.ts)** - Configuración activa

## 🔧 Herramientas y Scripts

| Script | Comando | Descripción |
|--------|---------|-------------|
| Setup | `npm run setup` | Configuración inicial interactiva |
| Pre-deploy Check | `npm run predeploy` | Verificación pre-despliegue |
| Deploy | `npm run deploy` | Despliegue a producción |
| Dev | `npm run dev` | Desarrollo local |
| Build | `npm run build` | Compilar proyecto |

## 📊 Ejemplos de Configuración

### OpenRouter - Balance (Recomendado)

```typescript
import { OPENROUTER_AGENT_CONFIG } from './config.openrouter-example';
export const AGENT_CONFIG = OPENROUTER_AGENT_CONFIG;
```

### OpenRouter - Económico

```typescript
import { OPENROUTER_COST_OPTIMIZED_CONFIG } from './config.openrouter-example';
export const AGENT_CONFIG = OPENROUTER_COST_OPTIMIZED_CONFIG;
```

### OpenRouter - Premium

```typescript
import { OPENROUTER_PREMIUM_CONFIG } from './config.openrouter-example';
export const AGENT_CONFIG = OPENROUTER_PREMIUM_CONFIG;
```

## 🆘 Ayuda Rápida

### Problema Común: Modelos no funcionan

**Solución:**
1. Verifica que tengas la clave API: `OPENROUTER_API_KEY` en `.dev.vars`
2. Verifica que hayas editado `worker/agents/inferutils/config.ts`
3. Reinicia el servidor de desarrollo

### Problema Común: Error al desplegar

**Solución:**
1. Ejecuta `npm run predeploy` para identificar problemas
2. Verifica que todas las variables requeridas estén en `.prod.vars`
3. Consulta [DEPLOYMENT_GUIDE_ES.md](DEPLOYMENT_GUIDE_ES.md)

### Problema Común: Costos altos

**Solución:**
1. Cambia a modelos más económicos (DeepSeek V3, Qwen Coder)
2. Usa `OPENROUTER_COST_OPTIMIZED_CONFIG`
3. Revisa [OPENROUTER_GUIDE_ES.md](OPENROUTER_GUIDE_ES.md#optimización-de-costos)

## 🔗 Enlaces Útiles

### Externos
- [OpenRouter](https://openrouter.ai/) - Plataforma de IA
- [OpenRouter Models](https://openrouter.ai/models) - Lista de modelos
- [Cloudflare Dashboard](https://dash.cloudflare.com/) - Panel de control
- [Google AI Studio](https://ai.google.dev/) - Gemini API

### Soporte
- [Discord OpenRouter](https://discord.gg/openrouter)
- [Cloudflare Community](https://community.cloudflare.com/)
- [VibSDK GitHub Issues](https://github.com/cloudflare/vibesdk/issues)

## 📚 Documentación Técnica

- **[Architecture Diagrams](architecture-diagrams.md)** - Diagramas de arquitectura
- **[Postman Collection](POSTMAN_COLLECTION_README.md)** - Colección de API

## 🎯 Rutas de Aprendizaje

### Para Desarrolladores Nuevos
1. Lee [RESUMEN_DESPLIEGUE.md](RESUMEN_DESPLIEGUE.md)
2. Configura local con [setup.md](setup.md)
3. Prueba OpenRouter con [OPENROUTER_QUICKSTART.md](OPENROUTER_QUICKSTART.md)

### Para Despliegue a Producción
1. Lee [DEPLOYMENT_GUIDE_ES.md](DEPLOYMENT_GUIDE_ES.md)
2. Ejecuta `npm run predeploy`
3. Sigue los pasos de despliegue

### Para Optimización de Costos
1. Lee [OPENROUTER_GUIDE_ES.md](OPENROUTER_GUIDE_ES.md)
2. Revisa configuración en `config.openrouter-example.ts`
3. Monitorea uso en dashboard de OpenRouter

---

**¿Necesitas ayuda?** Abre un issue en GitHub o consulta las guías específicas arriba.
