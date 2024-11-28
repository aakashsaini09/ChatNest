import express from 'express'
import { Server} from 'socket.io'
import http from 'http'
const app = express()

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        credentials: true,
    }
})
io.on('connection', (socket) => {
    console.log("connected User", socket.id)
    const token = socket.handshake.auth.token
    console.log("token", token)

    io.on('disconnect', () => {
        console.log("disconnected User: ", socket.id)
    })
})
export { app , server}