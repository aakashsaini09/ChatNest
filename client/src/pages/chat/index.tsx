import { userDataState } from "@/store/slices/auth-slice"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { toast } from "sonner"

const Chat= () => {
  const userData = useRecoilValue(userDataState)
  const navigate = useNavigate()
  useEffect(() => {
    if(!userData.profileSetup){
      toast("Please setup profile to continue.")
      navigate('/profile')
    }
  }, [])
  
    return (
      <>
        Chat
      </>
    )
  }
  
  export default Chat