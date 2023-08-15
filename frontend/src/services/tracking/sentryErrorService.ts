import * as Sentry from '@sentry/react'

export enum SeverityLevel {
  TRACE = 'trace',
  DEBUG = 'debug',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
}

class SentryService {
  private initialized: boolean = false
  private static instance: SentryService
  private enabled: boolean = true

  public static getInstance(): SentryService {
    if (!SentryService.instance) {
      SentryService.instance = new SentryService()
    }
    return SentryService.instance
  }

  public init(dsn: string, release: string, dist?: string): void {
    if (this.initialized) {
      console.warn('SentryService has already been initialized.')
      return
    }

    if (!dsn || !release) {
      this.enabled = false
      console.warn('SentryService is disabled. Missing DSN or RELEASE configuration.')
      return
    }

    try {
      Sentry.init({
        dsn,
        release,
        dist,
        integrations: [
          new Sentry.BrowserTracing({
            // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
            tracePropagationTargets: ['localhost', 'https://357f-77-137-71-27.ngrok-free.app/#/tinyurl'],
          }),
          new Sentry.Replay(),
        ],
      })

      this.initialized = true
    } catch (error) {
      this.enabled = false
      console.error('Error initializing Sentry:', error)
    }
  }

  public captureException(error: Error): void {
    if (!this.enabled) {
      console.warn('SentryService has not been enabled. Call setEnabled() or before capturing exceptions.')
      return
    }

    if (!this.initialized) {
      console.warn('SentryService has not been initialized. Call init() before capturing exceptions.')
      return
    }

    try {
      Sentry.captureException(error)
    } catch (error) {
      console.error('Error capturing exception with Sentry:', error)
    }
  }

  public captureEvent(event: Sentry.Event): void {
    if (!this.enabled) {
      console.warn('SentryService has not been enabled. Call setEnabled() or before capturing exceptions.')
      return
    }

    if (!this.initialized) {
      console.warn('SentryService has not been initialized. Call init() before capturing exceptions.')
      return
    }

    try {
      Sentry.captureEvent(event)
    } catch (error) {
      console.error('Error capturing event with Sentry:', error)
    }
  }

  public logBreadcrumb(message: string, category?: string): void {
    if (!this.enabled) {
      console.warn('SentryService has not been enabled. Call setEnabled() or before capturing exceptions.')
      return
    }

    if (!this.initialized) {
      console.warn('SentryService has not been initialized. Call init() before capturing exceptions.')
      return
    }

    try {
      Sentry.addBreadcrumb({
        message,
        category,
        level: SeverityLevel.INFO,
      })
    } catch (error) {
      console.error('Error setting user context with Sentry:', error)
    }
  }

  public setUserContext(user: { id: string; email: string; username: string }): void {
    if (!this.enabled) {
      console.warn('SentryService has not been enabled. Call setEnabled() or before capturing exceptions.')
      return
    }

    if (!this.initialized) {
      console.warn('SentryService has not been initialized. Call init() before capturing exceptions.')
      return
    }

    try {
      Sentry.setUser({
        id: user.id,
        email: user.email,
        username: user.username,
      })
    } catch (error) {
      console.error('Error setting user context with Sentry:', error)
    }
  }

  public setEnabled(enabled: boolean): void {
    this.enabled = enabled
  }
}

export default SentryService.getInstance()
