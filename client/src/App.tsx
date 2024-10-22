import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './pages/auth'
import Chat from './pages/chat'
import Profile from './pages/profile'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userDataState } from './store/slices/auth-slice'
import { useEffect, useState } from 'react'
import { apiClient } from './lib/api-client'
import { GET_USER_INFO } from './utils/constants'
import { toast } from 'sonner'

const PrivateRoute = ({ children }: any) => {
  const userdata = useRecoilValue(userDataState);
  console.log("userdata is: ", userdata)
  const isAuthenticated = !!userdata;
  return isAuthenticated ? children : <Navigate to={'/auth'}/>;
}
const AuthRoute = ({ children }: any) => {
  const userdata = useRecoilValue(userDataState);
  const isAuthenticated = !!userdata;
  return isAuthenticated ? children : <Navigate to={'/chat'}/>;
}
function App() {
  const [userData, setUserData] = useRecoilState(userDataState);
const [loading, setloading] = useState(true)
useEffect(() => {
  const getUserData = async () => {
    try {
      const res = await apiClient.get(GET_USER_INFO, {
        withCredentials: true,
      })
      console.log("res is: ", res)
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong.")
    }
  }
  if(!userData){
    getUserData()
  }else{
    setloading(false)
  }
}, [])
if(loading){
  return <div>Loaidng...</div>;
}
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/auth' element={
            // <AuthRoute>
              <Auth/>
            // </AuthRoute>
            }/>
          <Route path="/chat" element={
            // <PrivateRoute>
              <Chat/>
            // </PrivateRoute>
              }/>
          <Route path="/profile" element={
            // <PrivateRoute>
              <Profile/>
            // </PrivateRoute>
            }/>
          <Route path='*' element={<Navigate to="/auth"/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
