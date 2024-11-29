import express from 'express'
import { Server} from 'socket.io'
import http from 'http'
import { extractUserInfo } from '../helper/ExtractToken.js'
import UserModel from '../schema/UserSchema.js'
const app = express()

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        credentials: true,
    }
})
const onlineUser = new Set()
io.on('connection', async(socket) => {
    console.log("connected User", socket.id)
    const token = await socket.handshake.auth.token
    // get user info
    const user =  await extractUserInfo(token)
    // Create a room
    socket.join(user?._id)
    onlineUser.add(user?._id?.toString())
    io.emit('onlineuser', Array.from(onlineUser))
    socket.on('message-page', async (userId)=>{
        console.log("userId is: ", userId)
        const userDetails = await UserModel.findById(userId).select("-password")
        const payload = {
            _id: userDetails._id,
            name: userDetails.name,
            email: userDetails.email,
            profile_pic: userDetails.profile_pic,
            online: onlineUser.has(userId)
        }
        socket.emit('message-user', payload)
    })
    socket.on('disconnect', () => {
        onlineUser.delete(user?._id)
        console.log("disconnected User: ", socket.id)
    })
})
export { app , server}