import { PiUserCircle } from "react-icons/pi";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface userTypeDefine{
  userId: String,
  name: String,
  profile_pic: string,
  width: number,
  height: number
}
const Avatar = ({ userId, name, profile_pic, width, height }: userTypeDefine) => {
  let avatarName = "";
  const onlineUser = useSelector((state: RootState) => state.user.onlineUser);
  // const onlineUser = useSelector(state => state?.user?.onlineUser)
  if (name) {
    const splitName = name?.split(" ");
    if (splitName.length > 1) {
      avatarName = splitName[0][0] + splitName[1][0];
    } else {
      avatarName = splitName[0][0];
    }
  }

  const bgColor = [
    "bg-slate-300",
    "bg-teal-300",
    "bg-red-300",
    "bg-green-300",
    "bg-yellow-300",
    "bg-gray-300",
    "bg-cyan-300",
    "bg-sky-400",
    "bg-blue-300",
  ];
  const randomNumber = Math.floor(Math.random() * 9);

  const sizeStyle = {
    width: `${width}px`,
    height: `${height}px`,
  };
  const isActive = onlineUser.includes(userId)
  return (
    <div className="text-slate-800 rounded-full font-bold relative">
      {profile_pic ? (
        <img
          src={profile_pic}
          alt="Not found"
          className="overflow-hidden rounded-full"
          style={sizeStyle} // Use inline styles for width and height
        />
      ) : name ? (
        <div
          style={sizeStyle}
          className={`overflow-hidden rounded-full flex justify-center items-center text-lg ${bgColor[randomNumber]}`}
        >
          {avatarName}
        </div>
      ) : (
        <PiUserCircle size={width} />
      )}
      {isActive && (
        <div className="bg-green-600 z-10 p-1 rounded-full absolute bottom-1 -right-0.5"></div>
      )}
    </div>
  );
};

export default Avatar;
