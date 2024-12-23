import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { AuthProvider } from './context/authContext.jsx'
import { Toaster } from './components/ui/toaster.jsx'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2
    }
  }
})
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
axios.defaults.baseURL = API_BASE_URL + '/api/v1';
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <App />
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
  // </React.StrictMode>,
)
