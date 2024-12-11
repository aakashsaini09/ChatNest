import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Avatar from "../components/Avatar";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/userSlice";
const CheckPassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  // console.log("Location: ", location.state)
  const url = import.meta.env.VITE_APP_BACKEND_URL
  const [data, setData] = useState({
    password: ""
  })
  useEffect(() => {
    if(!location?.state?.name){
      navigate('/email')
    }
    
  }, [])
  
  const handleOnChange = (e: any) => {

    const { name, value } = e.target
    setData((pre) => {
      return{
        ...pre, [name]: value
      }
    })
  }
 
  const handleSubmit = async(e: any) => {
    e.preventDefault();
    e.stopPropagation()
    const reqURL = `${url}/password`
    try {
      const res = await axios.post(`${reqURL}`, {
        userId: location?.state?._id,
        password: data.password
      }, { 
        withCredentials: true 
      })
      // console.log("res is: ", res)
      if(res.data.success){
        dispatch(setToken(res.data.token));
        
        // console.log("token? ", res.data.token)
        localStorage.setItem('token', res?.data?.token)
        toast.success("User Created Successfully")
        setData({
          password: ""
        })
        navigate('/')
      }
    } catch (error) {
      toast.error((error as any)?.response?.data?.message)
    }
  }
  return (
    <>
        <div className="mt-5">
        <div className="bg-white w-full max-w-sm rounded overflow-hidden p-4 mx-auto">
          <div className="w-fit mx-auto mb-2 flex justify-center items-center flex-col">
            <Avatar userId={location?.state?._id} height={65} width={65} name={location?.state?.name} profile_pic={location?.state?.profile_pic} />
            <h2 className="font-semibold text-lg">{location?.state?.name}</h2>
          </div>
          <h3 className="text-center font-bold text-xl">Welcome to ChatNest</h3>
          <form className="grid gap-4 mt-5" onSubmit={handleSubmit}>
           
            <div className="flex flex-col gap-3">
              <label htmlFor="email">Password: </label>
              <input 
                required 
                value={data.password} 
                onChange={handleOnChange} 
                type="password" 
                id="password" 
                name="password" 
                placeholder="Enter your password"
                className="bg-slate-100 px-3 py-3 focus:outline-primary" />
            </div>
            <button className="bg-primary text-lg h- px-4 hover:bg-secondary py-2 rounded mt-3 font-bold text-white leading-relaxed tracking-wider">
              Let's Go
            </button>
          </form>
          <div className="text-center mt-5"><Link to={'/forgot-password'} className="font-bold hover:text-primary">Forgot Password?</Link></div>
        </div>
      </div>
    </>
  )
}

export default CheckPassword
