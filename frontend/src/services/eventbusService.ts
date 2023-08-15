type EventName = 'userLoggedIn' | 'dataUpdated' | 'modalOpened' | 'modalClosed'

type EventCallback<T> = (payload: T) => void

class EventBus {
  private events: Record<EventName, EventCallback<any>[]> = {
    userLoggedIn: [],
    dataUpdated: [],
    modalOpened: [],
    modalClosed: [],
  }

  on<T>(eventName: EventName, callback: EventCallback<T>): void {
    if (!this.events[eventName]) {
      this.events[eventName] = []
    }
    this.events[eventName].push(callback)
  }

  off<T>(eventName: EventName, callback: EventCallback<T>): void {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter((cb) => cb !== callback)
    }
  }

  emit<T>(eventName: EventName, payload: T): void {
    const callbacks = this.events[eventName]
    if (callbacks) {
      callbacks.forEach((callback) => {
        try {
          callback(payload)
        } catch (error) {
          console.error(`Error handling event ${eventName}:`, error)
        }
      })
    }
  }

  once<T>(eventName: EventName, callback: EventCallback<T>): void {
    const onceCallback: EventCallback<T> = (payload: T) => {
      callback(payload)
      this.off(eventName, onceCallback)
    }
    this.on(eventName, onceCallback)
  }
}

const eventBus = new EventBus()

export default eventBus
