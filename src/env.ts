import { z } from "zod";

/**
 * Environment Variable Validation with Zod
 *
 * This file provides comprehensive environment variable validation with clear
 * separation between server-side and client-side variables. Server-side secrets
 * are never exposed to the browser bundle.
 */

// Server-side only environment variables (never exposed to browser)
const serverSchema = z.object({
  // Gemini API Keys - Server-side only for security
  GEMINI_API_KEY: z
    .string()
    .min(1, "GEMINI_API_KEY is required for server operations"),
  GEMINI_API_KEY_STAGING: z.string().optional(),
  GEMINI_API_KEY_PROD: z.string().optional(),

  // Firebase server-side configuration (for CI/CD and server operations)
  FIREBASE_PROJECT_ID: z.string().optional(),

  // Node environment
  NODE_ENV: z
    .enum(["development", "production", "test", "staging"])
    .default("development"),
});

// Client-side safe environment variables (prefixed with NEXT_PUBLIC_)
const clientSchema = z.object({
  // Firebase client configuration - safe for browser
  NEXT_PUBLIC_FIREBASE_API_KEY: z
    .string()
    .min(1, "Firebase API Key is required"),
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z
    .string()
    .min(1, "Firebase Auth Domain is required"),
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: z
    .string()
    .min(1, "Firebase Project ID is required"),
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z
    .string()
    .min(1, "Firebase Storage Bucket is required"),
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z
    .string()
    .min(1, "Firebase Messaging Sender ID is required"),
  NEXT_PUBLIC_FIREBASE_APP_ID: z.string().min(1, "Firebase App ID is required"),

  // Application configuration
  NEXT_PUBLIC_APP_VERSION: z.string().default("1.0.0"),
  NEXT_PUBLIC_LOG_LEVEL: z
    .enum(["debug", "info", "warn", "error"])
    .default("info"),

  // Backend configuration
  NEXT_PUBLIC_BACKEND_URL: z.string().url().optional(),
  NEXT_PUBLIC_USE_BACKEND: z
    .string()
    .transform((val) => val === "true")
    .default("false"),
  NEXT_PUBLIC_FALLBACK_DIRECT: z
    .string()
    .transform((val) => val === "true")
    .default("true"),

  // Gemini model configuration (client-safe)
  NEXT_PUBLIC_GEMINI_MODEL: z.string().default("gemini-2.0-flash-exp"),

  // Optional analytics configuration
  NEXT_PUBLIC_GA4_MEASUREMENT_ID: z.string().optional(),
  NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),
});

/**
 * Runtime environment validation with security checks
 */
function validateEnvironment() {
  // Server-side validation
  const serverResult = serverSchema.safeParse(process.env);

  // Client-side validation
  const clientResult = clientSchema.safeParse(process.env);

  // Environment-specific validation logic (only check on server)
  if (typeof window === "undefined" && serverResult.success) {
    const isProduction = serverResult.data.NODE_ENV === "production";
    const isStaging = serverResult.data.NODE_ENV === "staging";

    // Production environment requires production API key
    if (isProduction && !process.env.GEMINI_API_KEY_PROD) {
      console.warn(
        "Warning: GEMINI_API_KEY_PROD not set in production environment"
      );
    }

    // Staging environment should use staging API key if available
    if (isStaging && !process.env.GEMINI_API_KEY_STAGING) {
      console.warn(
        "Warning: GEMINI_API_KEY_STAGING not set in staging environment"
      );
    }
  }

  // Security validation: Ensure no server secrets are exposed to client
  if (typeof window !== "undefined") {
    // Running in browser - validate client variables only
    if (!clientResult.success) {
      console.error(
        "❌ Client environment validation failed:",
        clientResult.error.format()
      );
      throw new Error("Invalid client environment configuration");
    }

    // Security check: Ensure no server secrets leaked to browser
    const dangerousVars = Object.keys(process.env).filter(
      (key) =>
        key.startsWith("GEMINI_API_KEY") && !key.startsWith("NEXT_PUBLIC_")
    );

    if (dangerousVars.length > 0) {
      console.error("❌ Server secrets exposed to browser:", dangerousVars);
      throw new Error("Security violation: Server secrets exposed to client");
    }

    return { client: clientResult.data, server: {} };
  } else {
    // Running on server - validate both client and server variables
    if (!serverResult.success) {
      console.error(
        "❌ Server environment validation failed:",
        serverResult.error.format()
      );
      throw new Error("Invalid server environment configuration");
    }

    if (!clientResult.success) {
      console.error(
        "❌ Client environment validation failed:",
        clientResult.error.format()
      );
      throw new Error("Invalid client environment configuration");
    }

    return {
      server: serverResult.data,
      client: clientResult.data,
    };
  }
}

/**
 * Get the appropriate Gemini API key based on environment
 */
function getGeminiApiKey(serverEnv: z.infer<typeof serverSchema>): string {
  switch (serverEnv.NODE_ENV) {
    case "production":
      return serverEnv.GEMINI_API_KEY_PROD || serverEnv.GEMINI_API_KEY;
    case "test":
      return serverEnv.GEMINI_API_KEY_STAGING || serverEnv.GEMINI_API_KEY;
    default:
      return serverEnv.GEMINI_API_KEY;
  }
}

// Validate environment on module load
const env = validateEnvironment();

// Export type-safe environment variables
export const serverEnv = env.server as z.infer<typeof serverSchema>;
export const clientEnv = env.client as z.infer<typeof clientSchema>;

// Helper function to get the correct Gemini API key (server-side only)
export const getApiKey = () => {
  if (typeof window !== "undefined") {
    throw new Error("getApiKey() can only be called on the server side");
  }
  return getGeminiApiKey(serverEnv);
};

// Type exports for external usage
export type ServerEnv = z.infer<typeof serverSchema>;
export type ClientEnv = z.infer<typeof clientSchema>;

// Runtime validation function for dynamic checks
export const revalidateEnvironment = validateEnvironment;

// Security utility to check if running in secure context
export const isSecureContext = () => {
  return typeof window === "undefined" || window.isSecureContext;
};

// Firebase configuration getter (client-safe)
export const getFirebaseConfig = () => ({
  apiKey: clientEnv.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: clientEnv.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: clientEnv.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: clientEnv.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: clientEnv.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: clientEnv.NEXT_PUBLIC_FIREBASE_APP_ID,
});

// Environment info for debugging (safe for client)
export const getEnvironmentInfo = () => ({
  nodeEnv: typeof window !== "undefined" ? "client" : serverEnv.NODE_ENV,
  appVersion: clientEnv.NEXT_PUBLIC_APP_VERSION,
  logLevel: clientEnv.NEXT_PUBLIC_LOG_LEVEL,
  isProduction:
    typeof window === "undefined" ? serverEnv.NODE_ENV === "production" : false,
  timestamp: new Date().toISOString(),
});

// Development helpers
if (process.env.NODE_ENV === "development") {
  console.log("🔧 Environment validation successful");
  console.log("📊 Environment info:", getEnvironmentInfo());
}
