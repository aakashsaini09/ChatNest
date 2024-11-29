import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { RootState } from "../redux/store"
import Avatar from "./Avatar"
import { HiDotsVertical } from "react-icons/hi"
import { FaAngleLeft } from "react-icons/fa"
import { FaPlus } from "react-icons/fa"
import { FaImage, FaVideo } from "react-icons/fa6"
import uploadFile from "../helpers/uploadFiles"
import { IoClose } from "react-icons/io5"
import Loading from "./Loading"

const MessagePage = () => {
  const [openImgVidUpload, setopenImgVidUpload] = useState(false)
  const [loading, setloading] = useState(false)
  const [message, setmessage] = useState({
    text: '',
    imageUrl: '',
    videoUrl: ''
  })
  const params = useParams()
  const user = useSelector((state: RootState) => state.user)
  const [userData, setuserData] = useState({
    _id: '',
    name: '',
    email: '',
    profile_pic: '',
    online: false
  })
  const socketConnection = useSelector((state: RootState )=> state?.user?.socketConnection)
  useEffect(() => {
    if(socketConnection){
      socketConnection.emit('message-page', params.userId)
      socketConnection.on('message-user', (data: any) => {
        console.log("data: ", data)
        setuserData(data)
      })
    }
  }, [socketConnection, params?.userId, user])
  const handleUploadImgVid = () => {
    setopenImgVidUpload(pre => !pre)
  }
  const handleUploadImg = async(e:any) => {
    setloading(true)
    const uploadPhoto = await uploadFile(e.target.files[0])
    console.log("uploadImg is: ", uploadPhoto)
    setopenImgVidUpload(false)
    setmessage(pre => {
      return{
        ...pre, imageUrl: uploadPhoto?.url
      }
    })
    setloading(false)
  }
  const handleClearUploadImg = () => {
        setmessage(pre => {
          return{
            ...pre, imageUrl: ""
          }
        })
  }
  const handleClearUploadVid = () => {
        setmessage(pre => {
          return{
            ...pre, videoUrl: ""
          }
        })
  }
  const handleUploadVid = async(e: any) => {
    setloading(true)
    // const file = e.target.files[0]
    const uploadVideo = await uploadFile(e.target.files[0])
    setloading(false)
    console.log("uploadVideo:", uploadVideo)
    setopenImgVidUpload(false)
    setmessage(pre => {
      return{
        ...pre, videoUrl: uploadVideo
      }
    })
    setloading(false)
  }

  return (
    <>
      <div>
        <header className="static top-0 h-16 bg-white flex justify-between items-center px-4">
          <div className="flex items-center gap-4">
            <Link to={'/'} className="lg:hidden">
              <FaAngleLeft size={25}/>
            </Link>
            <div>
              <Avatar 
                width={50}
                height={50}
                profile_pic={userData.profile_pic}
                name={userData.name}
                userId={userData._id}
              />
            </div>
            <div>
              <h3 className="font-semibold text-lg my0">{userData?.name}</h3>
              <p className="-my-2 text-xs">{userData.online ? <span className="text-green-500">Online</span> : <span className="text-slate-600">Offline</span>}</p>
            </div>
          </div>
          <div >
            <button className="cursor-pointer hover:text-primary"><HiDotsVertical/></button>
          </div>
        </header>
        {/* show msg here */}
        <section className="h-[calc(100vh-128px)] overflow-x-hidden overflow-y-scroll scrollbar relative">
          {message.imageUrl && (
            <div className="w-full h-full bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden">
            <div onClick={handleClearUploadImg} className="w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-800">
              <IoClose size={30}/>
            </div>
            <div className="bg-white p-3">
              <img 
                src={message.imageUrl} 
                className="aspect-square object-scale-down w-full h-full max-w-sm m-2" 
                alt="Upload Image" />
            </div>
          </div>
          )}
          {message.videoUrl && (
            <div className="w-full h-full bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden">
            <div onClick={handleClearUploadVid} className="w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-800">
              <IoClose size={30}/>
            </div>
            <div className="bg-white p-3">
              <video
                src={message.videoUrl} 
                className="aspect-square object-scale-down w-full h-full max-w-sm m-2"
                controls
                muted 
                autoPlay
              />
            </div>
          </div>
          )}
          {loading && (
            <div className="w-full h-full flex justify-center items-center"><Loading/></div>
          )}
          All messages here
        </section>
        <section className="h-16 bg-white flex items-center px-4">
          <div className="relative">
            <button onClick={handleUploadImgVid} className="flex justify-center items-center w-11 h-11 rounded-full hover:bg-primary hover:text-white">
              <FaPlus size={20}/>
              </button>
            {/* popup */}
            {openImgVidUpload && 
            <div className="bg-white shadow rounded absolute bottom-12 w-36 p-2">
              <form>
                <label htmlFor="uploadImage" className="flex items-center p-2 gap-3 hover:bg-slate-300 px-3 cursor-pointer">
                  <div className="text-purple-600">
                    <FaImage size={18}/>
                  </div>
                  <p>Image</p>
                </label>
                <label htmlFor="uploadVideo" className="flex items-center p-2 gap-3 hover:bg-slate-300 px-3 cursor-pointer">
                  <div className="text-purple-600">
                    <FaVideo size={18}/>
                  </div>
                  <p>Video</p>
                </label>
                <input className="hidden" onClick={handleUploadImg} type="file" id="uploadImage" />
                <input className="hidden" onClick={handleUploadVid} type="file" id="uploadVideo" />
              </form>
            </div>
            }
          </div>
        </section>
      </div>
    </>
  )
}

export default MessagePage
