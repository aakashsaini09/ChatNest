import { useState } from "react"
import Avatar from "./Avatar"
import uploadFile from "../helpers/uploadFiles"

const EditUserPopup = ({onclose, data}: any) => {
  const [userData, setuserData] = useState({
    name: data.name,
    profile_pic: data.profile_pic,

  })
  const handleOnChange = (e: any) => {
    const { name, value} = e.target
    setuserData((pre) => {
      return{
        ...pre, [name]: value
      }
    })
  }
  const handleUploadPhoto = async(e: any) => {
    const file = e.target.files[0]
    const imgUrl = await uploadFile(e.target.files[0])
    setuserData((pre) => {
      return{
        ...pre, 
        profile_pic: imgUrl?.url
      }
    })
  }
  const handleSubmit = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
  }
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 bg-gray-700 bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-4 py-5 m-1 rounded w-full max-w-sm">
        <h2 className="font-semibold">Profile Details</h2>
        <p className="text-sm">Edit User Details</p>
        <form className="grid gap-3 mt-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name: </label>
            <input className="w-full py-1 px-2 focus:outline-primary border-0.5" onChange={handleOnChange} type="text" name="name" id="name" value={userData.name} />
          </div>
          <div>
            <div>Photo: </div>
            <div className="my-1 flex items-center gap-4">
              <Avatar width={14} height={14} profile_pic={data.profile_pic}/>
            <label htmlFor="profile_pic">
              <button className="font-semibold">Change Photo</button>
              <input id="profile_pic" onChange={handleUploadPhoto} type="file" className="hidden" />
            </label>
            </div>
          </div>
          <div className="flex gap-2 w-fit ml-auto mt-3">
            <button onClick={onclose} className="border-primary border text-primary hover:bg-gray-200 px-4 py-2 rounded">Cancle</button>
            <button onSubmit={handleSubmit} className="border-primary bg-primary text-white px-5 py-2 rounded hover:bg-secondary">Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditUserPopup
