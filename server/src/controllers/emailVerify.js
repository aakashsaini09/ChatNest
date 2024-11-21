import UserModel from "../schema/UserSchema.js";
export async function emailVerify(req, res) {
    try {
        const { email }= req.body;
        const checkUser = await UserModel.findOne({ email: email}).select(" -password")
        if(!checkUser){
            return res.status(500).json({
                success: false,
                message: "User Not found with this gmail.",
                error: true
            })
        }
        return res.status(200).json({
            success: true,
            message: "Email Verified",
            data: checkUser
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