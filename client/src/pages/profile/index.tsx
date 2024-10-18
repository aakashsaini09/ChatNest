import { userDataState } from "@/store/slices/auth-slice"
// import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"


const Profile = () => {
  const userData = useRecoilValue(userDataState);
  console.log(userData)
  
  if(!userData){
    return (
      <div className="bg-gray-600 min-h-[100vh] w-full text-white">Loading</div>
    )
  }
    return (
      <>
        <div className="min-h-[100vh] w-full bg-black text-white">
          Profile page
          <div>Email:{userData.email}</div>
          <div>ID:{userData.id}</div>
        </div>
      </>
    )
  }
  
  export default Profile