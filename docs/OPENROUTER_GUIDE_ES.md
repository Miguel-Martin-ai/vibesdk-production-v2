# Guía de OpenRouter para VibSDK (Español)

Esta guía te ayudará a configurar y usar OpenRouter como proveedor de IA en VibSDK.

## ¿Qué es OpenRouter?

OpenRouter es un servicio que te permite acceder a más de 100 modelos de IA de diferentes proveedores (OpenAI, Anthropic, Google, Meta, etc.) usando una sola clave API. Esto te permite:

- Acceder a múltiples modelos con una sola clave
- Comparar fácilmente diferentes modelos
- Tener respaldo automático si un modelo no está disponible
- Obtener precios competitivos entre proveedores

## Configuración Rápida

### 1. Obtén tu Clave API de OpenRouter

1. Visita [OpenRouter.ai](https://openrouter.ai/)
2. Crea una cuenta o inicia sesión
3. Ve a **Account** → **Keys**
4. Haz clic en **Create new key**
5. Copia tu clave API (comienza con `sk-or-`)

### 2. Configura VibSDK

**Opción A: Usando el script de configuración (Recomendado)**

```bash
# Instala las dependencias
bun install  # o npm install

# Ejecuta el script de configuración
bun run setup  # o npm run setup
```

Cuando te pregunte por los proveedores de IA, selecciona la opción 5 (OpenRouter) e ingresa tu clave API.

**Opción B: Configuración manual**

1. Copia el archivo de ejemplo:
```bash
cp .dev.vars.example .dev.vars
```

2. Edita `.dev.vars` y agrega tu clave API de OpenRouter:
```bash
OPENROUTER_API_KEY=sk-or-v1-tu-clave-aqui
```

### 3. Configura los Modelos (Opcional)

Por defecto, VibSDK usa los modelos de Google Gemini. Para usar modelos de OpenRouter:

1. Abre `worker/agents/inferutils/config.ts`

2. **Opción A:** Usa una de las configuraciones predefinidas:

```typescript
// Copia desde config.openrouter-example.ts
import { OPENROUTER_AGENT_CONFIG } from './config.openrouter-example';

export const AGENT_CONFIG = OPENROUTER_AGENT_CONFIG;
```

3. **Opción B:** O personaliza modelos específicos:

```typescript
export const AGENT_CONFIG: AgentConfig = {
    // Usa DeepSeek V3 de OpenRouter para generación de código
    phaseImplementation: {
        name: AIModels.OPENROUTER_DEEPSEEK_V3,
        max_tokens: 64000,
        temperature: 0.2,
        fallbackModel: AIModels.GEMINI_2_5_PRO,
    },
    // Usa Qwen Coder de OpenRouter para regeneración de archivos
    fileRegeneration: {
        name: AIModels.OPENROUTER_QWEN_3_CODER,
        max_tokens: 32000,
        temperature: 0,
    },
    // ... otras configuraciones
};
```

### 4. Inicia el Desarrollo

```bash
bun run dev  # o npm run dev
```

¡Tu instancia de VibSDK ahora está funcionando con OpenRouter!

## Modelos Disponibles

| Modelo | Mejor para | Costo |
|--------|------------|-------|
| `OPENROUTER_DEEPSEEK_V3` | Generación de código general | Bajo |
| `OPENROUTER_QWEN_3_CODER` | Tareas enfocadas en código | Bajo |
| `OPENROUTER_QWEN_2_5_72B` | Razonamiento complejo | Medio |
| `OPENROUTER_CLAUDE_SONNET` | Revisión de código de alta calidad | Alto |
| `OPENROUTER_GPT_4O` | Uso general | Alto |
| `OPENROUTER_GPT_4O_MINI` | Rápido y económico | Bajo |
| `OPENROUTER_DEEPSEEK_R1` | Razonamiento avanzado | Medio |
| `OPENROUTER_GEMINI_PRO` | Capacidades multimodales | Medio |
| `OPENROUTER_LLAMA_3_3_70B` | Alternativa de código abierto | Bajo |

## Configuraciones Recomendadas

### Configuración Económica

Mejor para proyectos personales y desarrollo:

```typescript
import { OPENROUTER_COST_OPTIMIZED_CONFIG } from './config.openrouter-example';

export const AGENT_CONFIG = OPENROUTER_COST_OPTIMIZED_CONFIG;
```

Usa principalmente modelos DeepSeek V3 y Qwen para el menor costo.

### Configuración Balanceada (Recomendada)

Buen balance entre calidad y costo:

```typescript
import { OPENROUTER_AGENT_CONFIG } from './config.openrouter-example';

export const AGENT_CONFIG = OPENROUTER_AGENT_CONFIG;
```

Usa una mezcla de modelos DeepSeek, Qwen, Claude y GPT.

### Configuración Premium

Máxima calidad, mayor costo:

```typescript
import { OPENROUTER_PREMIUM_CONFIG } from './config.openrouter-example';

export const AGENT_CONFIG = OPENROUTER_PREMIUM_CONFIG;
```

Usa Claude Sonnet, GPT-4o y Qwen 72B para los mejores resultados.

## Solución de Problemas

### Error "API key not found"

Asegúrate de que:
1. Tu archivo `.dev.vars` existe en la raíz del proyecto
2. La clave API comienza con `sk-or-`
3. Has reiniciado el servidor de desarrollo después de agregar la clave

### Los modelos no funcionan

1. Verifica que hayas editado `worker/agents/inferutils/config.ts`
2. Verifica que los nombres de los modelos coincidan exactamente (son sensibles a mayúsculas)
3. Revisa la página de estado de OpenRouter para verificar la disponibilidad del modelo

### Límite de tasa

OpenRouter tiene límites de tasa. Si los alcanzas:
1. Agrega retrasos entre solicitudes
2. Revisa tu panel de OpenRouter para ver los límites actuales
3. Considera actualizar tu plan de OpenRouter

## Documentación Adicional

- [Guía Completa de OpenRouter](./OPENROUTER_GUIDE.md) (en inglés)
- [Guía de Inicio Rápido](./OPENROUTER_QUICKSTART.md) (en inglés)
- [Resumen de Cambios](./OPENROUTER_CHANGES.md) (en inglés)
- [Lista de Modelos de OpenRouter](https://openrouter.ai/models)

## Beneficios de Usar OpenRouter

✅ **Una sola clave API** - Accede a más de 100 modelos de diferentes proveedores
✅ **Optimización de costos** - Elige los modelos más rentables para cada tarea
✅ **Flexibilidad** - Cambia fácilmente entre modelos y proveedores
✅ **Respaldo automático** - Failover automático a modelos alternativos
✅ **Sin bloqueo** - Fácil de combinar OpenRouter con otros proveedores

## Soporte

- Problemas con OpenRouter: [Discord de OpenRouter](https://discord.gg/openrouter)
- Problemas con VibSDK: [GitHub Issues](https://github.com/cloudflare/vibesdk/issues)
- Documentación de configuración: [setup.md](./setup.md)

## Próximos Pasos

1. Prueba diferentes modelos para encontrar el mejor para tus necesidades
2. Monitorea el uso y costos en el panel de OpenRouter
3. Lee la [Guía Completa](./OPENROUTER_GUIDE.md) para configuraciones avanzadas
4. Explora la [lista completa de modelos](https://openrouter.ai/models) disponibles

---

**¡Disfruta usando VibSDK con OpenRouter!** 🚀
