# Quick Start: Using OpenRouter with VibSDK

This guide will help you quickly set up and start using OpenRouter with VibSDK.

## What You'll Need

1. An OpenRouter API key (get one at https://openrouter.ai/)
2. VibSDK repository cloned locally

## Step-by-Step Setup

### 1. Get Your OpenRouter API Key

1. Visit [OpenRouter.ai](https://openrouter.ai/)
2. Sign up or log in
3. Navigate to **Account** → **Keys**
4. Click **Create new key**
5. Copy your API key (starts with `sk-or-`)

### 2. Configure VibSDK

**Option A: Using the setup script (Recommended)**

```bash
# Install dependencies
bun install  # or npm install

# Run the setup script
bun run setup  # or npm run setup
```

When prompted for AI providers, select option 5 (OpenRouter) and enter your API key.

**Option B: Manual configuration**

1. Copy the example file:
```bash
cp .dev.vars.example .dev.vars
```

2. Edit `.dev.vars` and add your OpenRouter API key:
```bash
OPENROUTER_API_KEY=sk-or-v1-your-actual-key-here
```

### 3. Configure Models (Optional)

By default, VibSDK uses Google Gemini models. To use OpenRouter models:

1. Open `worker/agents/inferutils/config.ts`

2. **Option A:** Use one of the pre-made configurations:

```typescript
// Copy from config.openrouter-example.ts
import { OPENROUTER_AGENT_CONFIG } from './config.openrouter-example';

export const AGENT_CONFIG = OPENROUTER_AGENT_CONFIG;
```

3. **Option B:** Or customize specific models:

```typescript
export const AGENT_CONFIG: AgentConfig = {
    // Use OpenRouter's DeepSeek V3 for code generation
    phaseImplementation: {
        name: AIModels.OPENROUTER_DEEPSEEK_V3,
        max_tokens: 64000,
        temperature: 0.2,
        fallbackModel: AIModels.GEMINI_2_5_PRO,
    },
    // Use OpenRouter's Qwen Coder for file regeneration
    fileRegeneration: {
        name: AIModels.OPENROUTER_QWEN_3_CODER,
        max_tokens: 32000,
        temperature: 0,
    },
    // ... other configurations
};
```

### 4. Start Development

```bash
bun run dev  # or npm run dev
```

Your VibSDK instance is now running with OpenRouter!

## Quick Configuration Templates

### Cost-Effective Setup

Best for personal projects and development:

```typescript
import { OPENROUTER_COST_OPTIMIZED_CONFIG } from './config.openrouter-example';

export const AGENT_CONFIG = OPENROUTER_COST_OPTIMIZED_CONFIG;
```

Uses primarily DeepSeek V3 and Qwen models for lowest cost.

### Balanced Setup (Recommended)

Good balance of quality and cost:

```typescript
import { OPENROUTER_AGENT_CONFIG } from './config.openrouter-example';

export const AGENT_CONFIG = OPENROUTER_AGENT_CONFIG;
```

Uses a mix of DeepSeek, Qwen, Claude, and GPT models.

### Premium Setup

Highest quality, higher cost:

```typescript
import { OPENROUTER_PREMIUM_CONFIG } from './config.openrouter-example';

export const AGENT_CONFIG = OPENROUTER_PREMIUM_CONFIG;
```

Uses Claude Sonnet, GPT-4o, and Qwen 72B for best results.

## Testing Your Setup

1. Start the development server:
```bash
bun run dev
```

2. Open your browser to `http://localhost:5173`

3. Try generating a simple app to test the configuration

4. Check the console logs to see which models are being used

## Available OpenRouter Models

| Model | Best For | Cost |
|-------|----------|------|
| `OPENROUTER_DEEPSEEK_V3` | General code generation | Low |
| `OPENROUTER_QWEN_3_CODER` | Code-focused tasks | Low |
| `OPENROUTER_QWEN_2_5_72B` | Complex reasoning | Medium |
| `OPENROUTER_CLAUDE_SONNET` | High-quality code review | High |
| `OPENROUTER_GPT_4O` | General purpose | High |
| `OPENROUTER_GPT_4O_MINI` | Fast, cost-effective | Low |
| `OPENROUTER_DEEPSEEK_R1` | Advanced reasoning | Medium |

## Troubleshooting

### "API key not found" error

Make sure:
1. Your `.dev.vars` file exists in the project root
2. The API key starts with `sk-or-`
3. You've restarted the development server after adding the key

### Models not working

1. Check that you've edited `worker/agents/inferutils/config.ts`
2. Verify model names match exactly (they're case-sensitive)
3. Check OpenRouter's status page for model availability

### Rate limiting

OpenRouter has rate limits. If you hit them:
1. Add delays between requests
2. Check your OpenRouter dashboard for current limits
3. Consider upgrading your OpenRouter plan

## Next Steps

- Read the full [OpenRouter Guide](./OPENROUTER_GUIDE.md) for advanced usage
- Explore [OpenRouter's model list](https://openrouter.ai/models) for more options
- Check the [Setup Guide](./setup.md) for production deployment

## Support

- OpenRouter issues: [OpenRouter Discord](https://discord.gg/openrouter)
- VibSDK issues: [GitHub Issues](https://github.com/cloudflare/vibesdk/issues)
