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

// const PrivateRoute = ({ Children }: any) => {
//   const userdata = useRecoilValue(userDataState);
//   const isAuthenticated = !!userdata;
//   return isAuthenticated ? Children : <Navigate to={'/auth'}/>;
// }
// const AuthRoute = ({ Children }: any) => {
//   const userdata = useRecoilValue(userDataState);
//   const isAuthenticated = !!userdata;
//   return isAuthenticated ? <Navigate to={'/chat'}/> : Children;
// }
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
      
    }
  }
  if(!userData){
    getUserData()
  }else{
    setloading(false)
  }
}, [userData, setUserData])
if(loading){
  return <div>Loaidng</div>;
}
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/auth' element={
              <Auth/>
            }/>
          <Route path="/chat" element={<Chat/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path='*' element={<Navigate to="/auth"/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
