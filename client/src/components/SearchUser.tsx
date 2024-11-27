import React from "react"
import { IoSearchOutline } from "react-icons/io5"
const SearchUser: React.FC<any> = ({ onClose }) => {

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-slate-700 bg-opacity-40">
      <div className="w-full max-w-lg mx-auto mt-10">
        <div className="bg-white rounded h-14 overflow-hidden flex">
            <input 
                type="text" 
                placeholder="search user by name, email..."
                className="w-full outline-none py-2 h-full px-4" 
            />
            <div className="h-14 w-14 flex justify-center items-center">
                <IoSearchOutline size={30}/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default SearchUser
