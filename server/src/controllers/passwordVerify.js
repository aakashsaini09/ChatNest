import UserModel from "../schema/UserSchema.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
let SECRET_KEY = process.env.SECRET_KEY || 'this_is_very_secret'
export async function passwordVerify (req, res) {
    try {
        const {userId, password} = req.body;
        const user = await UserModel.findById(userId)
        const checkPassword = await bcryptjs.compare(password, user.password)
        if(!checkPassword){
            return res.status(400).json({
                success: false,
                message: "Incorrect Password",
                error: true
            })
        }
        const tokenData = {
            id: user._id,
            email: user.email
        }
        const token = jwt.sign(tokenData, SECRET_KEY, {expiresIn: '1d'})
        const cookieOption = {
            http: true,
            secure: true,

        }
        return res.cookie('token', token, cookieOption).status(200).json({
            success: true,
            message: "Login Success",
            data: user,
            token: token
        })
    } catch (err) {
        console.log("error in catch: ", err)
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err || err.message
        })
    }
}