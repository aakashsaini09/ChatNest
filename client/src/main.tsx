import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { RouterProvider } from 'react-router-dom'
import router from './routes/index.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
      {/* @ts-ignore */}
      <RouterProvider router={router}>
      <App />
      </RouterProvider>
    </StrictMode>
)
