import jwt from 'jsonwebtoken'
import UserModel from '../schema/UserSchema.js'
let SECRET_KEY = process.env.SECRET_KEY || 'this_is_very_secret'
export async function extractUserInfo(token) {
    try {
        if(!token){
            return {
                message: 'session out',
                logout: true
            }
        }
        const decode = jwt.verify(token, SECRET_KEY)
        const user = UserModel.findById(decode.id).select("-password")
        return user
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err
        })
    }
}