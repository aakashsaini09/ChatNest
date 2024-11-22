const name = import.meta.env.VITE_APP_CLOUD_NAME
const url = `https://api.cloudinary.com/v1_1/${name}/auto/upload`
const uploadFile = async(file: any) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'chat-app')
    const response = await fetch(url, {
        method: 'post',
        body: formData
    })
    const resData = await response.json()
    return resData
}
export default uploadFile