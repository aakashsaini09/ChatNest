import { useEffect, useRef, useState } from "react"
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
import bgImg from '../assets/wallapaper.jpeg'
import { IoMdSend } from "react-icons/io"
import moment from "moment"

interface messageInterface{
createdAt: any,
imageUrl: string,
seen: boolean,
text: string,
videoUrl:string,
_id: string,
msgByUserId: string
}
const MessagePage = () => {
  const [openImgVidUpload, setopenImgVidUpload] = useState(false)
  const [loading, setloading] = useState(false)
  const [allMessages, setallMessages] = useState([])
  const currentMsgUse = useRef<HTMLDivElement>(null)
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
      socketConnection.emit('seen', params.userId)
      socketConnection.on('message-user', (data: any) => {
        setuserData(data)
      })
      socketConnection.on('message', (data: any) => {

        setallMessages(data)
      })

    }
  }, [socketConnection, params?.userId, user])
  useEffect(()=>{
    if(currentMsgUse.current){
        currentMsgUse.current.scrollIntoView({behavior : 'smooth', block : 'end'})
    }
},[allMessages])

  
  const handleUploadImgVid = () => {
    setopenImgVidUpload(pre => !pre)
  }

  const handleUploadImg = async (e: any) => {
    setloading(true);
    if (!e.target.files || e.target.files.length === 0) {
      console.log("No file selected");
      return; // Exit if no file is selected
    }
  
  
    try {
      const uploadPhoto = await uploadFile(e.target.files[0]);
      setopenImgVidUpload(false);
      setmessage((pre) => ({
        ...pre,
        imageUrl: uploadPhoto?.url,
      }));
    } catch (error) {
      console.error("Error uploading file: ", error);
    } finally {
      setloading(false);
    }
  };
  
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
    setopenImgVidUpload(false)
    setmessage(pre => {
      return{
        ...pre, videoUrl: uploadVideo
      }
    })
    setloading(false)
  }

  const handleOnChange = (e: any) => {
    // @ts-ignore
    const { name, value} = e.target
    setmessage(pre => {
      return{
        ...pre,
        text: value
      }
    }) 
  }
  const handleSendMessage = async(e: any) => {
    e.preventDefault()
    if(message.text || message.imageUrl || message.videoUrl){
      if(socketConnection){
        socketConnection.emit('new-message', {
          sender: user?._id,
          receiver: params.userId,
          text: message.text,
          imageUrl: message.imageUrl,
          videoUrl: message.videoUrl,
          msgByUserId : user?._id
        })
        setmessage({
          text: '',
          imageUrl: '',
          videoUrl: ''
        })
      }
    }
  }
  return (
    <>
      <div style={{backgroundImage: `url(${bgImg})`}} className="bg-no-repeat bg-cover">
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
        <section className="h-[calc(100vh-128px)] overflow-x-hidden bg-slate-200 bg-opacity-50 overflow-y-scroll scrollbar relative">
         
          {/* All messages here */}
          <div className="flex flex-col gap-2 py-2 mx-2" ref={currentMsgUse}>
            {allMessages.map((msg:messageInterface, index) => {
              return(
                <div className={`p-1 max-w-[280px] md:max-w-sm lg:max-w-md py-2 rounded w-fit ${user._id ===msg.msgByUserId ? 'ml-auto bg-teal-100' : 'bg-white'}`}key={index}>
                  <div className="w-full">
                    {msg?.imageUrl && (
                      <img
                        src={msg?.imageUrl}
                        className="w-full h-full object-scale-down"
                      />
                    )}
                    {msg?.videoUrl && (
                      <video
                        src={msg?.videoUrl}
                        className="w-full h-full object-scale-down"
                        controls
                      />
                    )}
                  </div>
                  <p className="px-2">{msg.text}</p>
                  <p className="text-xs ml-auto w-fit">{moment(msg.createdAt).format('hh:mm')}</p>
                </div>
              )
            })}
          </div>
          {message.imageUrl && (
            <div className="w-full h-full bg-slate-700 sticky bottom-0 bg-opacity-30 flex justify-center items-center rounded overflow-hidden">
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
            <div className="w-full h-full sticky bottom-0 bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden">
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
            <div className="w-full h-full sticky bottom-0 flex justify-center items-center"><Loading/></div>
          )}
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
          {/* input Box here */}
          <form className="h-full w-full flex gap-2" onSubmit={handleSendMessage}>
            <input 
              type="text"
              placeholder="Enter your message..."
              className="py-1 px-4 outline-none w-full h-full"
              value={message.text}
              onChange={handleOnChange}
               />
               <button className="text-primary hover:text-secondary">
                <IoMdSend size={25}/>
              </button>
          </form>
        </section>
      </div>
    </>
  )
}

export default MessagePage
