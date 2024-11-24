import { useDispatch, useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"
import { RootState } from '../redux/store';
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { logout, setUser } from "../redux/userSlice";
import Sidebar from "../components/Sidebar";
const Home = () => {
  const url = `${import.meta.env.VITE_APP_BACKEND_URL}/user-details`
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useSelector((state: RootState) => state.user);
  const getUserInfo = async() => {
    try {
      const res = await axios({
        url: url,
        withCredentials: true
      });
      if(res.data.logout){
        dispatch(logout({}))
        navigate('/email')
      }
      if(res.data.success){
        dispatch(setUser(res.data.data))
      }
    } catch (error) {
      toast.error((error as any)?.response?.data?.message)
    }
  }
  useEffect(() => {
    getUserInfo()
  }, [])
  return (
    <div className="grid grid-cols-[300px,1fr] h-screen max-h-screen">
      <section className="bg-white"><Sidebar/></section>
      <section><Outlet/></section>
    </div>
  )
}
export default Home
