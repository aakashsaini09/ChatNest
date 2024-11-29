import express from 'express'
import { Server} from 'socket.io'
import http from 'http'
import { extractUserInfo } from '../helper/ExtractToken.js'
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
    onlineUser.add(user?._id)
    io.emit('onlineuser', Array.from(onlineUser))
    socket.on('message-page', (userId)=>{
        console.log("userId is: ", userId)
    })
    socket.on('disconnect', () => {
        onlineUser.delete(user?._id)
        console.log("disconnected User: ", socket.id)
    })
})
export { app , server}