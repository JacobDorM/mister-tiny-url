import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from 'react-query'
import { App } from './App'
import reportWebVitals from './reportWebVitals'
import { store } from './store/index'
import { HashRouter as Router } from 'react-router-dom'
import './assets/scss/global.scss'
import { ErrorBoundary } from '@sentry/react'
import SentryService from './services/tracking/sentryErrorService';
import { config } from './config/config';

// Usage example:
// import { MyErrorBoundary } from './components/errorBoundary/MyErrorBoundary'
// import { WinstonProvider } from 'winston-react';
// import { logger } from './services/loggerService'

const queryClient = new QueryClient()

SentryService.init(config.sentry.dsn, config.sentry.project, '0.1.0');
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <Router>
        <ErrorBoundary fallback={({ error }) => <div>Error: {error.message}</div>}>
          {/* <WinstonProvider logger={logger} > */}
          <App />
          {/* </WinstonProvider> */}
        </ErrorBoundary>
      </Router>
    </QueryClientProvider>
  </Provider>
  // </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
