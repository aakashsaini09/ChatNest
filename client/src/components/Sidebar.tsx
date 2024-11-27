import { IoChatbubbleEllipses } from "react-icons/io5"
import { FaUserPlus } from "react-icons/fa"
import { NavLink } from "react-router-dom"
import { BiLogOut } from "react-icons/bi"
import Avatar from "./Avatar"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { useState } from "react"
import EditUserPopup from "./EditUserPopup"
import { FiArrowUpLeft } from "react-icons/fi"
import SearchUser from "./SearchUser"
const Sidebar = () => {
  const user = useSelector((state: RootState) => state.user);
  const [editUser, seteditUser] = useState(false)
  const [allUsers, setallUsers] = useState([])
  const [openSearchUser, setopenSearchUser] = useState(true)
  return (
    <>
      <div className="w-full h-full grid grid-cols-[48px,1fr] bg-white">
        <div className="bg-slate-200 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-600 flex flex-col justify-between">
            <div className="">
                <NavLink to={''} className={({isActive})=>`w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded ${isActive && 'bg-slate-300'}`} title="chat">
                    <IoChatbubbleEllipses size={22}/>
                </NavLink>
                <div onClick={() => setopenSearchUser(true)} className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded" title="Add Friend">
                    <FaUserPlus size={22}/>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <button title={user.name as string} className="mx-auto" onClick={()=> seteditUser(true)}>
                <Avatar profile_pic={user.profile_pic} name={user.name} width={40} height={40}/>
              </button>
                <button title="Logout" className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded">
                    <span className="-ml-2">
                    <BiLogOut size={22}/>
                    </span>
                </button>
            </div>
        </div>
        <div className="w-full">
          <div className="h-16 flex items-center">
            <h2 className="text-xl font-bold p-4 text-slate-800">Message</h2> 
          </div>
          <hr />
          <div className="h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar">
            {allUsers.length === 0 && (
              <div className="mt-12">
                <div className="flex justify-center items-center my-4 text-slate-500">
                  <FiArrowUpLeft size={50}/>
                </div>
                <p className="text-lg text-center text-slate-400">Explore Users to start a conversation.</p>
              </div>
            )}
          </div>
        </div>
        {editUser && (
          <EditUserPopup data={user} onclose={()=>seteditUser(false)}/>
        )}
        {/* Search User */}
        {openSearchUser && (
          <SearchUser onClose={()=> setopenSearchUser(false)}/>
        )}
      </div>
    </>
  )
}

export default Sidebar
