class ConfigManager {
  private static instance: ConfigManager
  private config

  private constructor() {

    this.config = {
      path: `.env.${process.env.NODE_ENV}`,
      sentry: { dsn: process.env.REACT_APP_SENTRY_DSN  || "", project: process.env.REACT_APP_SENTRY_PROJECT  || "" },
      apiBaseUrl: process.env.REACT_APP_API_BASE_URL  || "",
      featureFlags: {
        enableFeatureA: process.env.REACT_APP_ENABLE_FEATURE_A === 'true',
        enableFeatureB: process.env.REACT_APP_ENABLE_FEATURE_B === 'true',
        // Add more feature flags as needed...
      },
    }
  }

  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager()
    }
    return ConfigManager.instance
  }

  public getConfig() {
    return this.config
  }

  // You can add methods for loading environment-specific configuration if needed
}

const configManager = ConfigManager.getInstance()
export const config = configManager.getConfig()
