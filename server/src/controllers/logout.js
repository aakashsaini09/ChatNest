export async function logout(req, res) {
    try {
        const cookieOption = {
            http: true,
            secure: true
        }
        return res.cookie('token', '',cookieOption).status(200).json({
            message: "session out",
            success: true
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err
        })
    }
}