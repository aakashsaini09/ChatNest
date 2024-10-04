import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './pages/auth'
import Chat from './pages/chat'
import Profile from './pages/profile'
import { RecoilRoot } from 'recoil'

function App() {

  return (
    <>
     <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path='/auth' element={<Auth/>}/>
          <Route path='*' element={<Navigate to="/auth"/>}/>
          <Route path="/chat" element={<Chat/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
     </RecoilRoot>
    </>
  )
}

export default App
