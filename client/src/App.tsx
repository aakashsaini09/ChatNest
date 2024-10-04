import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './pages/auth'
import Chat from './pages/chat'
import Profile from './pages/profile'
import { RecoilRoot, useRecoilValue } from 'recoil'
import { userDataState } from './store/slices/auth-slice'

const PrivateRoute = ({ Children }: any) => {
  const userdata = useRecoilValue(userDataState);
  const isAuthenticated = !!userdata;
  return isAuthenticated ? Children : <Navigate to={'/auth'}/>;
}
const AuthRoute = ({ Children }: any) => {
  const userdata = useRecoilValue(userDataState);
  const isAuthenticated = !!userdata;
  return isAuthenticated ? <Navigate to={'/chat'}/> : Children;
}
function App() {

  return (
    <>
     <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path='/auth' element={
              <Auth/>
            }/>
          <Route path="/chat" element={<PrivateRoute><Chat/></PrivateRoute>}/>
          <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>}/>
          <Route path='*' element={<Navigate to="/auth"/>}/>
        </Routes>
      </BrowserRouter>
     </RecoilRoot>
    </>
  )
}

export default App
