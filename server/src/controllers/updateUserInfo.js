import { extractUserInfo } from "../helper/ExtractToken.js"
import UserModel from "../schema/UserSchema.js"

export async function updateUserInfo(req, res) {
    const { name, profile_pic} = req.body;
    const token = req.cookies.token || ''
    const user = await extractUserInfo(token)
    try {
    const updateInfo = await UserModel.updateOne({_id: user._id}, { name, profile_pic})
    const getNewInfo = await UserModel.findById(user._id)
    return res.status(200).json({
        success: true,
        message: "User updated successfully",
        user: getNewInfo
    })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err
        })
    }
}