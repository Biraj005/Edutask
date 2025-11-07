import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer, toast } from "react-toastify";
import './index.css'
import App from './App.jsx'
import AuthContextProvider from './Store/AuthContext.jsx';
import { ThemeContextProvider } from './Store/ThemeContext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ThemeContextProvider>
  </StrictMode>

)
