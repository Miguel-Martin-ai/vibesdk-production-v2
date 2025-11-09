/* eslint-disable */
// Extension of worker-configuration.d.ts to include secret environment variables
// These are not in wrangler.jsonc because they are secrets

declare namespace Cloudflare {
	interface Env {
		// Authentication secrets
		JWT_SECRET: string;
		GOOGLE_CLIENT_ID: string;
		GOOGLE_CLIENT_SECRET: string;
		GITHUB_CLIENT_ID: string;
		GITHUB_CLIENT_SECRET: string;
		GITHUB_EXPORTER_CLIENT_ID: string;
		GITHUB_EXPORTER_CLIENT_SECRET: string;
		
		// Cloudflare API
		CLOUDFLARE_ACCOUNT_ID: string;
		CLOUDFLARE_API_TOKEN: string;
		CLOUDFLARE_AI_GATEWAY_URL?: string;
		CLOUDFLARE_AI_GATEWAY_TOKEN?: string;
		
		// AI Provider API Keys
		OPENROUTER_API_KEY?: string;
		GOOGLE_AI_STUDIO_API_KEY?: string;
		ANTHROPIC_API_KEY?: string;
		
		// Monitoring
		SENTRY_DSN?: string;
		
		// Cloudflare Access
		CF_ACCESS_ID?: string;
		CF_ACCESS_SECRET?: string;
		
		// Secrets
		SECRETS_ENCRYPTION_KEY: string;
		
		// AI Proxy
		AI_PROXY_JWT_SECRET: string;
		
		// Search
		SERPAPI_KEY?: string;
		
		// Sandbox
		SANDBOX_SERVICE_TYPE?: string;
		SANDBOX_SERVICE_URL?: string;
		SANDBOX_SERVICE_API_KEY?: string;
		ALLOCATION_STRATEGY?: string;
		USE_TUNNEL_FOR_PREVIEW?: string;
		
		// Environment
		ENVIRONMENT?: string;
		
		// Custom domains
		CUSTOM_PREVIEW_DOMAIN?: string;
	}
}
