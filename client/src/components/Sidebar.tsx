import { IoChatbubbleEllipses } from "react-icons/io5"
import { FaUserPlus } from "react-icons/fa"
import { NavLink } from "react-router-dom"
import { BiLogOut } from "react-icons/bi"
import Avatar from "./Avatar"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { useState } from "react"
import EditUserPopup from "./EditUserPopup"
const Sidebar = () => {
  const user = useSelector((state: RootState) => state.user);
  const [editUser, seteditUser] = useState(false)
  return (
    <>
      <div className="w-full h-full">
        <div className="bg-slate-200 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-600 flex flex-col justify-between">
            <div className="">
                <NavLink to={''} className={({isActive})=>`w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded ${isActive && 'bg-slate-300'}`} title="chat">
                    <IoChatbubbleEllipses size={22}/>
                </NavLink>
                <div className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded" title="chat">
                    <FaUserPlus size={22}/>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <button title={user.name as string} className="mx-auto" onClick={()=> seteditUser(true)}>
                <Avatar profile_pic={user.profile_pic} name={user.name} width={12} height={12}/>
              </button>
                <button title="Logout" className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded">
                    <span className="-ml-2">
                    <BiLogOut size={22}/>
                    </span>
                </button>
            </div>
        </div>
        {editUser && (
          <EditUserPopup data={user} onclose={()=>seteditUser(false)}/>
        )}
      </div>
    </>
  )
}

export default Sidebar
