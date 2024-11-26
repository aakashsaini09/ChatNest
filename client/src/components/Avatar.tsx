
import { PiUserCircle } from "react-icons/pi";
// import { useSelector } from 'react-redux';

const Avatar = ({userId,name,profile_pic,width,height}: any) => {
    // const onlineUser = useSelector(state => state?.user?.onlineUser)

    let avatarName = ""

    if(name){
      const splitName = name?.split(" ")

      if(splitName.length > 1){
        avatarName = splitName[0][0]+splitName[1][0]
      }else{
        avatarName = splitName[0][0]
      }
    }

    const bgColor = [
      'bg-slate-300',
      'bg-teal-300',
      'bg-red-300',
      'bg-green-300',
      'bg-yellow-300',
      'bg-gray-300',
      "bg-cyan-300",
      "bg-sky-400",
      "bg-blue-300"
    ]

    const randomNumber = Math.floor(Math.random() * 9)
    
    // const isOnline = onlineUser.includes(userId)
  return (
    <div className={`text-slate-800  rounded-full font-bold relative`} >
    {
        profile_pic ? (
            <img
                src={profile_pic}
                alt={name}
                className={`overflow-hidden rounded-full h-${height} w-${width}`}
            />
            ) : (
                name ? (
                    <div  style={{width : width+"px", height : height+"px" }} className={`overflow-hidden rounded-full flex justify-center items-center text-lg ${bgColor[randomNumber]}`}>
                        {avatarName}
                    </div>
                ) :(
                  <PiUserCircle
                    size={width}
                  />
                )
            )
        }

        {/* {
          isOnline && (
            <div className='bg-green-600 p-1 absolute bottom-2 -right-1 z-10 rounded-full'></div>
          )
        } */}
      
    </div>
  )
}

export default Avatar