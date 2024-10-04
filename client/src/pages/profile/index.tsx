import { userDataState } from "@/store/slices/auth-slice"
import { useRecoilValue } from "recoil"


const Profile = () => {
  const userData = useRecoilValue(userDataState)
  console.log(userData)
    return (
      <>
        Profile
        <div>Email:{userData.email}</div>
        <div>ID:{userData.id}</div>
      </>
    )
  }
  
  export default Profile