import UserModel from "../schema/UserSchema.js"
export async function searchUser(req, res) {
    try {
        const { search} = req.body;
        const query = new RegExp(search, 'i', 'g')
        const user = await UserModel.find({
            "$or": [
                {name: query},
                {email: query}
            ]
        }).select("-password")
        return res.json({
            message: "All users",
            data: user,
            success: true
        })
    } catch (err) {
        return res.status(300).json({
            message: err.message || err,
            error: err,
            success: false
        })
    }
}