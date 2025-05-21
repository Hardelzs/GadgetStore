import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)


// Electron main process code removed from React entry point.
// If you need Electron integration, place this code in your Electron main process file (e.g., main.js).