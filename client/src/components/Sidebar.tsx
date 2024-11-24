import { IoChatbubbleEllipses } from "react-icons/io5"
import { FaUserPlus } from "react-icons/fa"
import { NavLink } from "react-router-dom"
import { BiLogOut } from "react-icons/bi"
const Sidebar = () => {
  return (
    <>
      <div className="w-full h-full">
        <div className="bg-slate-200 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-600">
            <div className="">
                <NavLink to={''} className={({isActive})=>`w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded ${isActive && 'bg-slate-300'}`} title="chat">
                    <IoChatbubbleEllipses size={22}/>
                </NavLink>
                <div className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded" title="chat">
                    <FaUserPlus size={22}/>
                </div>
            </div>
            <div>
                <button className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded">
                    <span className="-ml-2">
                    <BiLogOut size={22}/>
                    </span>
                </button>
            </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
