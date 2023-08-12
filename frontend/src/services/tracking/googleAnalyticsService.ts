import ReactGA4 from 'react-ga4'

class GoogleAnalyticsService {
  private static instance: GoogleAnalyticsService
  private initialized: boolean = false
  private constructor() {}

  public static getInstance(): GoogleAnalyticsService {
    if (!GoogleAnalyticsService.instance) {
      GoogleAnalyticsService.instance = new GoogleAnalyticsService()
    }
    return GoogleAnalyticsService.instance
  }

  private checkInitialized(): void {
    if (!this.initialized) {
      throw new Error('Google Analytics is not initialized. Call init() with the tracking ID first.')
    }
  }

  public init(trackingId: string): void {
    if (this.initialized) {
      console.warn('Google Analytics is already initialized.')
      return
    }

    if (!trackingId || typeof trackingId !== 'string') {
      throw new Error('Invalid Google Analytics tracking ID. Please provide a valid tracking ID.')
    }

    try {
      ReactGA4.initialize(trackingId)
      this.initialized = true
    } catch (error) {
      console.error('Error initializing Google Analytics:', error)
    }
  }

  public trackEvent(
    category: string,
    action: string,
    label?: string,
    value?: number,
    nonInteraction?: boolean,
    transport?: 'beacon' | 'xhr' | 'image'
  ): void {
    this.checkInitialized()
    ReactGA4.event({
      category, // Specify the category of the event (e.g., "Button Click")
      action, // Specify the action associated with the event (e.g., "Submit Form")
      label, // Optional - Specify a label to provide more context to the event
      value, // Optional - If applicable, provide a numeric value associated with the event
      nonInteraction, // optional, true/false
      transport, // optional, beacon/xhr/image
    })
  }

  public trackPageView(pagePathName: string, title: string): void {
    this.checkInitialized()
    ReactGA4.send({ hitType: 'pageview', page: pagePathName, title: title })
  }

  public trackException(description: string, fatal?: boolean): void {
    this.checkInitialized()
    // Track exceptions (errors) using custom dimensions
    ReactGA4.send({
      hitType: 'exception',
      exDescription: description,
      exFatal: fatal ? true : false,
    })
  }
}

const googleAnalyticsService = GoogleAnalyticsService.getInstance()
export default googleAnalyticsService
