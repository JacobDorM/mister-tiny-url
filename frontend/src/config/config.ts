class ConfigManager {
  private static instance: ConfigManager
  private config

  private constructor() {
    this.config = {
      path: `.env.${process.env.NODE_ENV}`,
      sentry: { dsn: process.env.REACT_APP_SENTRY_DSN || '', project: process.env.REACT_APP_SENTRY_PROJECT || '' },
      logstash: { baseUrl: process.env.REACT_APP_LOGSTASH_BASE_URL || '' },
      robohash: { baseUrl: process.env.REACT_APP_ROBOHASH_BASE_URL || '' },
      socket: { apiBaseUrl: process.env.REACT_APP_SOCKET_BACKEND_BASE_URL || '' },
      apiBaseUrl: process.env.REACT_APP_API_BASE_URL || '',
      backendBaseUrl: process.env.REACT_APP_BACKEND_BASE_URL || '',
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
