import { extractUserInfo } from "../helper/ExtractToken.js"

export async function userDetails(req, res) {
    const token = req.cookies.token || ''
    const user = await extractUserInfo(token)
    try {
        return res.status(200).json({
            success: true,
            message: "User details",
            data: user
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err
        })
    }
}