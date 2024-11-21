import UserModel from "../schema/UserSchema.js";
import bcryptjs from 'bcryptjs'
export async function registerUser(req, res) {
    try {
        const { name, email, password, profile_pic }= req.body;
        console.log("req.body is: ", req.body)
        const checkEmail = await UserModel.findOne({ email: email})
        if(checkEmail){
            return res.status(500).json({
                success: false,
                message: "User Already exist",
                error: true
            })
        }
        //pass into hash
        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password, salt)
        const payload = {
            name, email, profile_pic, password: hashPassword
        }
        const user = new UserModel(payload)
        const userSave = await user.save()
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: userSave
        })
    } catch (err) {
        console.log("error in catch: ", err)
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err
        })
    }
}