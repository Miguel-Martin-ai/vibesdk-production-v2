# OpenRouter Integration Guide

This guide explains how to use OpenRouter as an AI provider with VibSDK.

## What is OpenRouter?

OpenRouter provides a unified API to access multiple AI models from different providers (OpenAI, Anthropic, Google, Meta, etc.) through a single endpoint. This allows you to:

- Access models from multiple providers with one API key
- Compare different models easily
- Fall back to alternative models if one is unavailable
- Get competitive pricing across providers

## Setup

### 1. Get Your OpenRouter API Key

1. Visit [OpenRouter.ai](https://openrouter.ai/)
2. Sign up or log in to your account
3. Go to **Account** → **Keys**
4. Click **Create new key**
5. Copy your API key (starts with `sk-or-...`)

### 2. Configure VibSDK

During the setup process (`bun run setup`), when asked to select AI providers:

```
Available AI Providers:
   1. OpenAI (for GPT models)
   2. Anthropic (for Claude models)
   3. Google AI Studio (for Gemini models)
   4. Cerebras (for open source models)
   5. OpenRouter (for various models)  ← Select this option
   
Enter provider number(s) (comma-separated, e.g., 3,5): 5
```

Then enter your OpenRouter API key when prompted:

```
Enter your OpenRouter API Key: sk-or-v1-your-api-key-here
```

Alternatively, add it manually to your `.dev.vars` file:

```bash
OPENROUTER_API_KEY=sk-or-v1-your-api-key-here
```

## Available Models

VibSDK includes the following pre-configured OpenRouter models:

| Model | Description | Use Case |
|-------|-------------|----------|
| `OPENROUTER_QWEN_3_CODER` | Qwen 2.5 Coder 32B | Code generation and debugging |
| `OPENROUTER_QWEN_2_5_72B` | Qwen 2.5 72B Instruct | General purpose, large context |
| `OPENROUTER_DEEPSEEK_V3` | DeepSeek Chat | Fast, cost-effective coding |
| `OPENROUTER_DEEPSEEK_R1` | DeepSeek R1 | Advanced reasoning tasks |
| `OPENROUTER_CLAUDE_SONNET` | Claude 3.5 Sonnet | High-quality code review |
| `OPENROUTER_GPT_4O` | GPT-4o | General purpose tasks |
| `OPENROUTER_GPT_4O_MINI` | GPT-4o Mini | Fast, cost-effective |
| `OPENROUTER_GEMINI_PRO` | Gemini Pro 1.5 | Multimodal capabilities |
| `OPENROUTER_LLAMA_3_3_70B` | Llama 3.3 70B | Open source alternative |

## Configuration

### Using OpenRouter Models

Edit `worker/agents/inferutils/config.ts` to use OpenRouter models:

```typescript
import { AgentConfig, AIModels } from "./config.types";

export const AGENT_CONFIG: AgentConfig = {
    blueprint: {
        name: AIModels.OPENROUTER_DEEPSEEK_V3,
        reasoning_effort: 'medium',
        max_tokens: 16000,
        fallbackModel: AIModels.GEMINI_2_5_FLASH,
        temperature: 0.7,
    },
    phaseImplementation: {
        name: AIModels.OPENROUTER_QWEN_3_CODER,
        reasoning_effort: 'low',
        max_tokens: 32000,
        temperature: 0.2,
        fallbackModel: AIModels.GEMINI_2_5_PRO,
    },
    codeReview: {
        name: AIModels.OPENROUTER_CLAUDE_SONNET,
        reasoning_effort: 'medium',
        max_tokens: 32000,
        temperature: 0.1,
        fallbackModel: AIModels.GEMINI_2_5_PRO,
    },
    // ... other configurations
};
```

### Using Custom OpenRouter Models

You can use any model available on OpenRouter by specifying it with the `[openrouter]` prefix:

```typescript
conversationalResponse: {
    name: '[openrouter]anthropic/claude-3-opus',
    reasoning_effort: 'high',
    max_tokens: 8000,
    temperature: 0.7,
}
```

The `[openrouter]` prefix tells VibSDK to route the request directly to OpenRouter's API endpoint.

## Recommended Configurations

### Cost-Effective Setup

For development or personal use where cost is a concern:

```typescript
export const AGENT_CONFIG: AgentConfig = {
    blueprint: AIModels.OPENROUTER_GPT_4O_MINI,
    phaseGeneration: AIModels.OPENROUTER_DEEPSEEK_V3,
    phaseImplementation: AIModels.OPENROUTER_QWEN_3_CODER,
    codeReview: AIModels.OPENROUTER_DEEPSEEK_V3,
    // ...
};
```

### High-Quality Setup

For production or when quality is paramount:

```typescript
export const AGENT_CONFIG: AgentConfig = {
    blueprint: AIModels.OPENROUTER_CLAUDE_SONNET,
    phaseGeneration: AIModels.OPENROUTER_GPT_4O,
    phaseImplementation: AIModels.OPENROUTER_QWEN_2_5_72B,
    codeReview: AIModels.OPENROUTER_CLAUDE_SONNET,
    // ...
};
```

### Balanced Setup

Best balance of quality and cost:

```typescript
export const AGENT_CONFIG: AgentConfig = {
    blueprint: AIModels.OPENROUTER_DEEPSEEK_V3,
    phaseGeneration: AIModels.OPENROUTER_QWEN_2_5_72B,
    phaseImplementation: AIModels.OPENROUTER_QWEN_3_CODER,
    codeReview: AIModels.OPENROUTER_DEEPSEEK_R1,
    // ...
};
```

## Advanced Usage

### Model Fallbacks

Always configure fallback models to ensure reliability:

```typescript
blueprint: {
    name: AIModels.OPENROUTER_CLAUDE_SONNET,
    fallbackModel: AIModels.OPENROUTER_GPT_4O,  // Fallback to another OpenRouter model
    // or fallback to a different provider:
    // fallbackModel: AIModels.GEMINI_2_5_FLASH,
}
```

### Using with AI Gateway

OpenRouter works seamlessly with Cloudflare AI Gateway when configured. The gateway provides:
- Request caching
- Rate limiting
- Analytics and monitoring
- Cost tracking

No additional configuration needed - it's handled automatically if AI Gateway is set up.

## Troubleshooting

### API Key Not Working

1. Verify your API key is correct in `.dev.vars`
2. Check that the key starts with `sk-or-`
3. Ensure your OpenRouter account has credits

### Model Not Available

If a specific model returns errors:
1. Check [OpenRouter's model list](https://openrouter.ai/models) for availability
2. Verify the model name format: `provider/model-name`
3. Ensure your API key has access to that model

### Rate Limiting

OpenRouter has its own rate limits. If you hit them:
1. Add delays between requests
2. Use fallback models
3. Consider upgrading your OpenRouter plan

## Cost Optimization

Tips for managing costs with OpenRouter:

1. **Use appropriate models** - Don't use expensive models for simple tasks
2. **Configure max_tokens** - Limit response length where possible
3. **Monitor usage** - Check OpenRouter dashboard regularly
4. **Use caching** - Enable AI Gateway caching for repeated requests
5. **Fallback wisely** - Set cheaper models as fallbacks

## Additional Resources

- [OpenRouter Documentation](https://openrouter.ai/docs)
- [OpenRouter Models](https://openrouter.ai/models)
- [OpenRouter Pricing](https://openrouter.ai/models?order=newest)
- [VibSDK Setup Guide](./setup.md)

## Support

For OpenRouter-specific issues:
- [OpenRouter Discord](https://discord.gg/openrouter)
- [OpenRouter GitHub](https://github.com/OpenRouterTeam/openrouter-runner)

For VibSDK integration issues:
- [VibSDK Issues](https://github.com/cloudflare/vibesdk/issues)
