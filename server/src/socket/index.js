import express from 'express'
import { Server} from 'socket.io'
import http from 'http'
import { extractUserInfo } from '../helper/ExtractToken.js'
import UserModel from '../schema/UserSchema.js'
import { ConversationModel, MessageModel } from '../schema/ConversationSchema.js'
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
    socket.join(user?._id.toString())
    onlineUser.add(user?._id?.toString())
    io.emit('onlineuser', Array.from(onlineUser))
    socket.on('message-page', async (userId)=>{
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
    // new msg
    socket.on('new-message', async(data) => {
        let conversation = await ConversationModel.findOne({
            "$or" : [
                { sender : data?.sender, receiver : data?.receiver },
                { sender : data?.receiver, receiver :  data?.sender}
            ]
        })

        //if conversation is not available
        if(!conversation){
            const createConversation = await ConversationModel({
                sender : data?.sender,
                receiver : data?.receiver
            })
            conversation = await createConversation.save()
        }
        
        const message = new MessageModel({
          text : data.text,
          imageUrl : data.imageUrl,
          videoUrl : data.videoUrl,
          msgByUserId :  data?.msgByUserId,
        })
        const saveMessage = await message.save()

        const updateConversation = await ConversationModel.updateOne({ _id : conversation?._id },{
            "$push" : { messages : saveMessage?._id }
        })

        const getConversationMessage = await ConversationModel.findOne({
            "$or" : [
                { sender : data?.sender, receiver : data?.receiver },
                { sender : data?.receiver, receiver :  data?.sender}
            ]
        }).populate('messages').sort({ updatedAt : -1 })
        io.to(data?.sender).emit('message',getConversationMessage?.messages || [])
        io.to(data?.receiver).emit('message',getConversationMessage?.messages || [])

        //send conversation
        // const conversationSender = await getConversation(data?.sender)
        // const conversationReceiver = await getConversation(data?.receiver)

        // io.to(data?.sender).emit('conversation',conversationSender)
        // io.to(data?.receiver).emit('conversation',conversationReceiver)

        // console.log('getConverstationa : ', getConversationMessage)
        // console.log('updateC : ', updateConversation)
      })
    socket.on('disconnect', () => {
        onlineUser.delete(user?._id)
        console.log("disconnected User: ", socket.id)
    })
})
export { app , server}