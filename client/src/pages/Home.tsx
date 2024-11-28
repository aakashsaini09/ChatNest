import { useDispatch, useSelector } from "react-redux"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import logo from '../assets/img.jpg'
import { RootState } from '../redux/store';
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { logout, setUser } from "../redux/userSlice";
import Sidebar from "../components/Sidebar";
const Home = () => {
  const url = `${import.meta.env.VITE_APP_BACKEND_URL}/user-details`
  const loaction = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useSelector((state: RootState) => state.user);
  const getUserInfo = async() => {
    try {
      const res = await axios({
        url: url,
        withCredentials: true
      });
      if(res.data.data.logout){
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
  const basePath = loaction.pathname === '/'
  return (
    <div className="grid grid-cols-[300px,1fr] h-screen max-h-screen">
      <section className={`bg-white ${!basePath && 'hidden'} lg:block`}><Sidebar/></section>
      <section className={`${basePath && 'hidden'}`}><Outlet/></section>
      <div className={`lg:flex justify-center items-center flex-col gap-2 hidden ${basePath ? "hidden" : "lg:flex"}`}>
        <div>
          <img src={logo} width={250} alt="" />
        </div>
        <p className="text-lg mt-2 text-slate-600">Send Message to Someone</p>
      </div>
    </div>
  )
}
export default Home
