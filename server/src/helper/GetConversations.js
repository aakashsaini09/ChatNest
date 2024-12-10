import { ConversationModel } from '../schema/ConversationSchema.js'

const GetConverSationFunction = async(currentUserId) => {
    if(currentUserId){
        const currentUserConversation = await ConversationModel.find({
            "$or": [
                { sender: currentUserId},
                { receiver: currentUserId}
            ]
        }).sort({updatedAt : -1}).populate('messages').populate('sender').populate('receiver')
        // console.log("currentUserConversation", currentUserConversation)
        const finalMsg = currentUserConversation.map((conv) => {
            const conutUnseenMsg = conv.messages.reduce((prev, curr) => prev + (curr.seen ? 0 : 1), 0)
            return{
                _id: conv?._id,
                sender: conv?.sender,
                receiver: conv?.receiver,
                unseenMsg: conutUnseenMsg,
                lastMsg: conv.messages[conv?.messages?.length - 1]
            }
        })
        return finalMsg
        // socket.emit('conversation', finalMsg)
    }else{
        []
    }
}
export default GetConverSationFunction