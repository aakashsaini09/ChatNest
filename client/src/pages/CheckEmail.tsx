import { useState } from "react"
import { PiUserCircle as LuUserCircle2 } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const CheckEmail = () => {
  const navigate = useNavigate()
  const url = import.meta.env.VITE_APP_BACKEND_URL
  const [data, setData] = useState({
    email: ""
  })
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
    try {
      const res = await axios.post(`${url}/email`, data);
      console.log("res: ", res)
      if(res.data.success){
        toast.success("Email Verified!!")
        setData({
          email: ""
        })
        navigate('/password', {state: res?.data?.data})
      }
    } catch (error) {
      toast.error((error as any)?.response?.data?.message)
    }
  }
  return (
    <>
        <div className="mt-5">
        <div className="bg-white w-full max-w-sm rounded overflow-hidden p-4 mx-auto">
          <div className="w-fit mx-auto mb-2">
            <LuUserCircle2 size={80}/>
          </div>
          <h3 className="text-center font-bold text-xl">Welcome to ChatNest</h3>
          <form className="grid gap-4 mt-5" onSubmit={handleSubmit}>
           
            <div className="flex flex-col gap-3">
              <label htmlFor="email">Email: </label>
              <input 
                required 
                value={data.email} 
                onChange={handleOnChange} 
                type="email" 
                id="email" 
                name="email" 
                placeholder="Enter your Email"
                className="bg-slate-100 px-3 py-3 focus:outline-primary" />
            </div>
            <button className="bg-primary text-lg px-4 hover:bg-secondary py-2 rounded mt-3 font-bold text-white leading-relaxed tracking-wider">
              Let's Go
            </button>
          </form>
          <div className="text-center mt-5">New User? <Link to={'/register'} className="font-bold hover:text-primary">Register</Link></div>
        </div>
      </div>
    </>
  )
}

export default CheckEmail
