# AI Provider Support

This document describes how to configure and use different AI providers in the VibeCoder SDK.

## Supported Providers

The platform supports multiple AI providers, each with their own strengths:

### Platform-Level Providers (via Environment Variables)

1. **OpenAI** - GPT-4, GPT-5, O-series models
2. **Anthropic** - Claude 3.5, Claude 4 models
3. **Google AI Studio** - Gemini 2.0, 2.5 models
4. **Cerebras** - High-performance inference
5. **Groq** - Ultra-fast LLM inference
6. **Together AI** - Open-source models (Llama, Mixtral, DeepSeek, Qwen)

### BYOK (Bring Your Own Key) Support

Users can add their own API keys for any of the supported providers via the BYOK system. This allows:
- Personal API key usage
- Custom rate limits
- Direct billing to user accounts

## Configuration

### Environment Variables

Add provider API keys to your `.dev.vars` or production environment:

```env
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_AI_STUDIO_API_KEY=AIza...
CEREBRAS_API_KEY=csk-...
GROQ_API_KEY=gsk_...
TOGETHER_API_KEY=...
```

### Model Configuration

Models are configured in `worker/agents/inferutils/config.ts`:

```typescript
export const AGENT_CONFIG: AgentConfig = {
  conversationalResponse: {
    name: AIModels.TOGETHER_DEEPSEEK_V3,
    providerOverride: "together",
    reasoning_effort: "low",
    max_tokens: 4000,
    temperature: 0,
    fallbackModel: AIModels.TOGETHER_DEEPSEEK_V3,
  },
  // ... other configs
}
```

### Provider Override

Use `providerOverride` to force a specific provider for a model:

- `"together"` - Use Together AI's API directly
- `"direct"` - Use provider's direct API (bypasses AI Gateway)
- `undefined` - Use Cloudflare AI Gateway (default)

## Adding New Models

1. Add model to `AIModels` enum in `config.types.ts`:
```typescript
export enum AIModels {
  TOGETHER_NEW_MODEL = 'together/provider/model-name',
}
```

2. Update provider list in `byokHelper.ts` if adding a new provider:
```typescript
const providerList = [
  'anthropic',
  'openai',
  // ... add new provider
];
```

3. Add BYOK template in `secretsTemplates.ts`:
```typescript
{
  id: 'NEW_PROVIDER_API_KEY_BYOK',
  displayName: 'New Provider (BYOK)',
  envVarName: 'NEW_PROVIDER_API_KEY_BYOK',
  provider: 'new-provider',
  icon: '🆕',
  description: 'Use your API key for New Provider',
  instructions: 'Go to Provider → API Keys → Create',
  placeholder: 'your-key...',
  validation: '^.{10,}$',
  required: false,
  category: 'byok',
}
```

4. Add provider handling in `core.ts` `getConfigurationForModel()`:
```typescript
if (provider === 'new-provider') {
  return {
    baseURL: 'https://api.newprovider.com/v1',
    apiKey: env.NEW_PROVIDER_API_KEY,
  };
}
```

## Together AI Integration

Together AI is now fully integrated with support for:

- **DeepSeek V3** - High-quality open model
- **Llama 3 70B** - Meta's flagship model
- **Mixtral 8x7B** - Mixture of experts architecture
- **Qwen 2.5 Coder** - Specialized coding model

Example usage:
```typescript
const config: ModelConfig = {
  name: AIModels.TOGETHER_DEEPSEEK_V3,
  providerOverride: 'together',
  max_tokens: 4000,
  temperature: 0,
};
```

## API Gateway vs Direct Access

### Cloudflare AI Gateway (Default)
- Caching
- Analytics
- Rate limiting
- Cost tracking
- Unified interface

### Direct Access (providerOverride)
- Lower latency
- Provider-specific features
- Direct billing

## Best Practices

1. **Use fallback models** - Always configure a fallback for reliability
2. **Set appropriate token limits** - Different models have different context windows
3. **Choose the right model** - Balance cost, speed, and quality
4. **Monitor usage** - Track costs via AI Gateway analytics
5. **Secure API keys** - Use BYOK for sensitive applications

## Troubleshooting

### "Provider requires API key" error
- Ensure the provider's API key is set in environment variables
- For BYOK, verify the user has added their API key in settings

### Model not available
- Check if the model is in the AIModels enum
- Verify provider is in the provider list
- Ensure API key is valid and active

### Slow response times
- Consider using a faster model (e.g., Groq, Cerebras)
- Check if AI Gateway caching can help
- Use smaller context windows when possible
