import { useState } from "react"
import { IoCloseOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import uploadFile from "../helpers/uploadFiles";
import axios from "axios";
import toast from "react-hot-toast";
const RegisterPage = () => {
  const [uploadPhoto, setUploadPhoto] = useState<any>("")
  const navigate = useNavigate()
  const url = import.meta.env.VITE_APP_BACKEND_URL
  const [data, setData] = useState({
    name: '',
    email: "",
    password: "",
    profile_pic: ""
  })
  const handleOnChange = (e: any) => {

    const { name, value } = e.target
    setData((pre) => {
      return{
        ...pre, [name]: value
      }
    })
  }
  const handleUploadPhoto = async(e: any) => {
    const file = e.target.files[0]
    setUploadPhoto(file)
    const imgUrl = await uploadFile(e.target.files[0])
    setData((pre) => {
      return{
        ...pre, 
        profile_pic: imgUrl?.url
      }
    })
  }

  const handleClearUploadPhoto = (e: any) => {
    e.preventDefault();
    e.stopPropagation()
    setUploadPhoto("")
  }
  const handleSubmit = async(e: any) => {
    e.preventDefault();
    e.stopPropagation()
    const payload = {
      ...data,
      profile_pic: data.profile_pic, // If not using state update directly, ensure this is present
    };
    try {
      const res = await axios.post(`${url}/register`, payload);
      console.log("res: ", res)
      if(res.data.success){
        toast.success("User Created Successfully")
        setData({
          name: '',
          email: "",
          password: "",
          profile_pic: ""
        })
        navigate('/email')
      }
    } catch (error) {
      toast.error((error as any)?.response?.data?.message)
    }
  }
  return (
    <>
      <div className="mt-5">
        <div className="bg-white w-full max-w-sm rounded overflow-hidden p-4 mx-auto">
          <h3 className="text-center font-bold text-xl">Welcome to ChatNest</h3>
          <form className="grid gap-4 mt-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name: </label>
              <input 
                required 
                value={data.name} 
                onChange={handleOnChange} 
                type="text" 
                id="name" 
                name="name" 
                placeholder="Enter your Name"
                className="bg-slate-100 px-3 py-3 focus:outline-primary" />
            </div>
            <div className="flex flex-col gap-1">
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
            <div className="flex flex-col gap-1">
              <label htmlFor="password">Password: </label>
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
            <div className="flex flex-col gap-1">
              <label htmlFor="profile_pic">Photo: 
                <div className="h-14 bg-slate-200 flex justify-center items-center border hover:border-primary cursor-pointer">
                  <p className="text-sm max-w-[300px] line-clamp-1">{ uploadPhoto?.name ? uploadPhoto.name : "Upload Profile Photo"}</p> 
                  {uploadPhoto?.name && (
                  <button className="text-lg ml-2 hover:text-red-600" onClick={handleClearUploadPhoto}><IoCloseOutline/></button>
                  )}
                </div>
              </label>
              <input 
                onChange={handleUploadPhoto} 
                type="file" 
                id="profile_pic" 
                name="profile_pic" 
                className="hidden bg-slate-100 px-2 py-1 focus:outline-primary" />
            </div>
            <button className="bg-primary text-lg px-4 hover:bg-secondary py-2 rounded mt-3 font-bold text-white leading-relaxed tracking-wider">
              Register
            </button>
          </form>
          <div className="text-center mt-5">Already have an Account? <Link to={'/email'} className="font-bold hover:text-primary">Login</Link></div>
        </div>
      </div>
    </>
  )
}

export default RegisterPage
