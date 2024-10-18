import jsonwebtoken from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
    console.log(req.cookies )
    const toekn = req.cookies.jsonwebtoken;
    console.log({token});
}