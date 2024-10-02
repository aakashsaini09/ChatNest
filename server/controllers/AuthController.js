import { sign } from "jsonwebtoken";
import User from "../models/UserModel";

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (email, password) => {
    return sign({email, password}, process.env.JWT_KEY, {expiresIn: maxAge})
}
export const signup = async (req, res, next) => {
    try {  
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).send("Email and password are required!");
        }
        const user = User.create({email, password});
        res.cookie("jwt", createToken(email, user.id), {
            maxAge,
            secure: true,
            sameSite: 'None',

        });
        return res.status(201).json({user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName
        }})
    } catch (err) {
        console.log(err)
        return res.status(400).send("Internal Server errror");
    }
}