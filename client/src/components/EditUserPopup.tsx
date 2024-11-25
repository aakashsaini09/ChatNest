
const EditUserPopup = ({onclose, data}: any) => {
    console.log("data: ", data)
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 bg-gray-700 bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-4 m-1 rounded-full w-full max-w-sm">
        <h2>Profile D</h2>
      </div>
    </div>
  )
}

export default EditUserPopup
