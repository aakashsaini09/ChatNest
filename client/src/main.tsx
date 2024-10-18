import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from './components/ui/sonner.tsx'
import { RecoilRoot } from 'recoil'

createRoot(document.getElementById('root')!).render(
  <>
  <RecoilRoot>
    <App />
    <Toaster closeButton/>
  </RecoilRoot>
  </>
)
