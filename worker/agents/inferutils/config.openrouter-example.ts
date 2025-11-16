import { AgentConfig, AIModels } from "./config.types";

/**
 * Example configuration using OpenRouter models
 * 
 * This configuration demonstrates how to use OpenRouter as the primary AI provider.
 * OpenRouter provides access to 100+ models from multiple providers through a single API key.
 * 
 * To use this configuration:
 * 1. Get an OpenRouter API key from https://openrouter.ai/
 * 2. Add it to your .dev.vars file: OPENROUTER_API_KEY=sk-or-...
 * 3. Copy this configuration to worker/agents/inferutils/config.ts
 * 
 * Benefits of using OpenRouter:
 * - Access to multiple model providers with one API key
 * - Automatic fallback to alternative models
 * - Competitive pricing across providers
 * - Easy model comparison and testing
 */

export const OPENROUTER_AGENT_CONFIG: AgentConfig = {
    // Template selection - fast and cost-effective
    templateSelection: {
        name: AIModels.OPENROUTER_GPT_4O_MINI,
        max_tokens: 2000,
        fallbackModel: AIModels.OPENROUTER_GEMINI_PRO,
        temperature: 0.6,
    },

    // Blueprint generation - high quality for planning
    blueprint: {
        name: AIModels.OPENROUTER_DEEPSEEK_V3,
        reasoning_effort: 'medium',
        max_tokens: 64000,
        fallbackModel: AIModels.OPENROUTER_CLAUDE_SONNET,
        temperature: 0.7,
    },

    // Project setup - precise and structured
    projectSetup: {
        name: AIModels.OPENROUTER_GPT_4O_MINI,
        reasoning_effort: 'low',
        max_tokens: 10000,
        temperature: 0.2,
        fallbackModel: AIModels.OPENROUTER_DEEPSEEK_V3,
    },

    // Phase generation - planning and structure
    phaseGeneration: {
        name: AIModels.OPENROUTER_QWEN_2_5_72B,
        reasoning_effort: 'low',
        max_tokens: 32000,
        temperature: 0.2,
        fallbackModel: AIModels.OPENROUTER_DEEPSEEK_V3,
    },

    // First phase implementation - high quality start
    firstPhaseImplementation: {
        name: AIModels.OPENROUTER_QWEN_3_CODER,
        reasoning_effort: 'low',
        max_tokens: 64000,
        temperature: 0.2,
        fallbackModel: AIModels.OPENROUTER_DEEPSEEK_V3,
    },

    // Phase implementation - code generation
    phaseImplementation: {
        name: AIModels.OPENROUTER_QWEN_3_CODER,
        reasoning_effort: 'low',
        max_tokens: 64000,
        temperature: 0.2,
        fallbackModel: AIModels.OPENROUTER_DEEPSEEK_V3,
    },

    // Realtime code fixer - fast responses
    realtimeCodeFixer: {
        name: AIModels.OPENROUTER_GPT_4O_MINI,
        reasoning_effort: 'low',
        max_tokens: 32000,
        temperature: 0.5,
        fallbackModel: AIModels.OPENROUTER_DEEPSEEK_V3,
    },

    // Fast code fixer - quick fixes
    fastCodeFixer: {
        name: AIModels.OPENROUTER_DEEPSEEK_V3,
        reasoning_effort: undefined,
        max_tokens: 64000,
        temperature: 0.0,
        fallbackModel: AIModels.OPENROUTER_GPT_4O_MINI,
    },

    // Conversational response - natural interaction
    conversationalResponse: {
        name: AIModels.OPENROUTER_DEEPSEEK_V3,
        reasoning_effort: "low",
        max_tokens: 4000,
        temperature: 0.7,
        fallbackModel: AIModels.OPENROUTER_GPT_4O_MINI,
    },

    // Code review - high quality analysis
    codeReview: {
        name: AIModels.OPENROUTER_CLAUDE_SONNET,
        reasoning_effort: 'medium',
        max_tokens: 32000,
        temperature: 0.1,
        fallbackModel: AIModels.OPENROUTER_DEEPSEEK_R1,
    },

    // File regeneration - precise code generation
    fileRegeneration: {
        name: AIModels.OPENROUTER_QWEN_3_CODER,
        reasoning_effort: 'low',
        max_tokens: 32000,
        temperature: 0,
        fallbackModel: AIModels.OPENROUTER_DEEPSEEK_V3,
    },

    // Screenshot analysis - multimodal understanding
    screenshotAnalysis: {
        name: AIModels.OPENROUTER_GEMINI_PRO,
        reasoning_effort: 'medium',
        max_tokens: 8000,
        temperature: 0.1,
        fallbackModel: AIModels.OPENROUTER_GPT_4O,
    },
};

/**
 * Alternative cost-optimized configuration
 * Focused on minimizing costs while maintaining good quality
 */
export const OPENROUTER_COST_OPTIMIZED_CONFIG: AgentConfig = {
    templateSelection: {
        name: AIModels.OPENROUTER_GPT_4O_MINI,
        max_tokens: 2000,
        fallbackModel: AIModels.OPENROUTER_DEEPSEEK_V3,
        temperature: 0.6,
    },
    blueprint: {
        name: AIModels.OPENROUTER_DEEPSEEK_V3,
        reasoning_effort: 'medium',
        max_tokens: 64000,
        fallbackModel: AIModels.OPENROUTER_GPT_4O_MINI,
        temperature: 0.7,
    },
    projectSetup: {
        name: AIModels.OPENROUTER_DEEPSEEK_V3,
        reasoning_effort: 'low',
        max_tokens: 10000,
        temperature: 0.2,
        fallbackModel: AIModels.OPENROUTER_GPT_4O_MINI,
    },
    phaseGeneration: {
        name: AIModels.OPENROUTER_DEEPSEEK_V3,
        reasoning_effort: 'low',
        max_tokens: 32000,
        temperature: 0.2,
        fallbackModel: AIModels.OPENROUTER_GPT_4O_MINI,
    },
    firstPhaseImplementation: {
        name: AIModels.OPENROUTER_QWEN_3_CODER,
        reasoning_effort: 'low',
        max_tokens: 64000,
        temperature: 0.2,
        fallbackModel: AIModels.OPENROUTER_DEEPSEEK_V3,
    },
    phaseImplementation: {
        name: AIModels.OPENROUTER_QWEN_3_CODER,
        reasoning_effort: 'low',
        max_tokens: 64000,
        temperature: 0.2,
        fallbackModel: AIModels.OPENROUTER_DEEPSEEK_V3,
    },
    realtimeCodeFixer: {
        name: AIModels.OPENROUTER_DEEPSEEK_V3,
        reasoning_effort: 'low',
        max_tokens: 32000,
        temperature: 0.5,
        fallbackModel: AIModels.OPENROUTER_GPT_4O_MINI,
    },
    fastCodeFixer: {
        name: AIModels.OPENROUTER_DEEPSEEK_V3,
        reasoning_effort: undefined,
        max_tokens: 64000,
        temperature: 0.0,
        fallbackModel: AIModels.OPENROUTER_GPT_4O_MINI,
    },
    conversationalResponse: {
        name: AIModels.OPENROUTER_DEEPSEEK_V3,
        reasoning_effort: "low",
        max_tokens: 4000,
        temperature: 0.7,
        fallbackModel: AIModels.OPENROUTER_GPT_4O_MINI,
    },
    codeReview: {
        name: AIModels.OPENROUTER_DEEPSEEK_V3,
        reasoning_effort: 'medium',
        max_tokens: 32000,
        temperature: 0.1,
        fallbackModel: AIModels.OPENROUTER_GPT_4O_MINI,
    },
    fileRegeneration: {
        name: AIModels.OPENROUTER_QWEN_3_CODER,
        reasoning_effort: 'low',
        max_tokens: 32000,
        temperature: 0,
        fallbackModel: AIModels.OPENROUTER_DEEPSEEK_V3,
    },
    screenshotAnalysis: {
        name: AIModels.OPENROUTER_GPT_4O_MINI,
        reasoning_effort: 'medium',
        max_tokens: 8000,
        temperature: 0.1,
        fallbackModel: AIModels.OPENROUTER_DEEPSEEK_V3,
    },
};

/**
 * Premium quality configuration
 * Uses the highest quality models for best results
 */
export const OPENROUTER_PREMIUM_CONFIG: AgentConfig = {
    templateSelection: {
        name: AIModels.OPENROUTER_GPT_4O,
        max_tokens: 2000,
        fallbackModel: AIModels.OPENROUTER_CLAUDE_SONNET,
        temperature: 0.6,
    },
    blueprint: {
        name: AIModels.OPENROUTER_CLAUDE_SONNET,
        reasoning_effort: 'medium',
        max_tokens: 64000,
        fallbackModel: AIModels.OPENROUTER_GPT_4O,
        temperature: 0.7,
    },
    projectSetup: {
        name: AIModels.OPENROUTER_GPT_4O,
        reasoning_effort: 'low',
        max_tokens: 10000,
        temperature: 0.2,
        fallbackModel: AIModels.OPENROUTER_CLAUDE_SONNET,
    },
    phaseGeneration: {
        name: AIModels.OPENROUTER_QWEN_2_5_72B,
        reasoning_effort: 'low',
        max_tokens: 32000,
        temperature: 0.2,
        fallbackModel: AIModels.OPENROUTER_CLAUDE_SONNET,
    },
    firstPhaseImplementation: {
        name: AIModels.OPENROUTER_QWEN_2_5_72B,
        reasoning_effort: 'low',
        max_tokens: 64000,
        temperature: 0.2,
        fallbackModel: AIModels.OPENROUTER_CLAUDE_SONNET,
    },
    phaseImplementation: {
        name: AIModels.OPENROUTER_QWEN_2_5_72B,
        reasoning_effort: 'low',
        max_tokens: 64000,
        temperature: 0.2,
        fallbackModel: AIModels.OPENROUTER_CLAUDE_SONNET,
    },
    realtimeCodeFixer: {
        name: AIModels.OPENROUTER_GPT_4O,
        reasoning_effort: 'low',
        max_tokens: 32000,
        temperature: 0.5,
        fallbackModel: AIModels.OPENROUTER_CLAUDE_SONNET,
    },
    fastCodeFixer: {
        name: AIModels.OPENROUTER_DEEPSEEK_R1,
        reasoning_effort: undefined,
        max_tokens: 64000,
        temperature: 0.0,
        fallbackModel: AIModels.OPENROUTER_CLAUDE_SONNET,
    },
    conversationalResponse: {
        name: AIModels.OPENROUTER_GPT_4O,
        reasoning_effort: "low",
        max_tokens: 4000,
        temperature: 0.7,
        fallbackModel: AIModels.OPENROUTER_CLAUDE_SONNET,
    },
    codeReview: {
        name: AIModels.OPENROUTER_CLAUDE_SONNET,
        reasoning_effort: 'medium',
        max_tokens: 32000,
        temperature: 0.1,
        fallbackModel: AIModels.OPENROUTER_DEEPSEEK_R1,
    },
    fileRegeneration: {
        name: AIModels.OPENROUTER_CLAUDE_SONNET,
        reasoning_effort: 'low',
        max_tokens: 32000,
        temperature: 0,
        fallbackModel: AIModels.OPENROUTER_QWEN_2_5_72B,
    },
    screenshotAnalysis: {
        name: AIModels.OPENROUTER_GEMINI_PRO,
        reasoning_effort: 'medium',
        max_tokens: 8000,
        temperature: 0.1,
        fallbackModel: AIModels.OPENROUTER_GPT_4O,
    },
};
