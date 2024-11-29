import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { RootState } from "../redux/store"

const MessagePage = () => {
  const params = useParams()
  const socketConnection = useSelector((state: RootState )=> state?.user?.socketConnection)
  console.log("params: ", params.userId)
  useEffect(() => {
    if(socketConnection){
      socketConnection.emit('message-page', params.userId)
    }
  }, [socketConnection])
  
  return (
    <>
      MessagePage
    </>
  )
}

export default MessagePage
