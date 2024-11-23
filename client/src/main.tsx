import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { RouterProvider } from 'react-router-dom'
import router from './routes/index.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Provider store={store}>
        {/* @ts-ignore */}
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </Provider>
    </StrictMode>
)