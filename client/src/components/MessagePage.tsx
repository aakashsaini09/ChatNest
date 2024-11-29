import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { RootState } from "../redux/store"
import Avatar from "./Avatar"
import { HiDotsVertical } from "react-icons/hi"
import { FaAngleLeft } from "react-icons/fa"

const MessagePage = () => {
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
  console.log("socketConnection: ", socketConnection)
  useEffect(() => {
    if(socketConnection){
      socketConnection.emit('message-page', params.userId)
      socketConnection.on('message-user', (data: any) => {
        console.log("data: ", data)
        setuserData(data)
      })
    }
  }, [socketConnection, params?.userId, user])
  
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
        <section className="h-[calc(100vh-64px)] bg-purple-600"></section>
      </div>
    </>
  )
}

export default MessagePage
