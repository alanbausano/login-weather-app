import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider } from 'styled-components'

import App from './App'
import { AuthContextProvider } from './context/authContext'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import { theme } from './styles/theme'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true
    }
  }
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ThemeProvider>
  </QueryClientProvider>
)

serviceWorkerRegistration.register()
