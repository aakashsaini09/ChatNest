import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import { compare } from "bcrypt";

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (email, password) => {
    return jwt.sign({email, password}, process.env.JWT_KEY, {expiresIn: maxAge})
}
export const signup = async (req, res, next) => {
    try {  
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).send("Email and password are required!");
        }
        const user = await User.create({email, password});
        res.cookie("jwt", createToken(email, user.id), {
            maxAge,
            secure: true,
            sameSite: 'None',

        });
        return res.status(201).json({user: {
            id: user.id,
            email: user.email,
            profileSetup: user.profileSetup

        }})
    } catch (err) {
        console.log(err)
        return res.status(400).send("Internal Server errror");
    }
}
export const signin = async (req, res, next) => {
    try {  
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).send("Email and password are required!");
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).sent("User not found with this email.")
        }
        const auth = await compare(password, user.password)
        if(!auth){
            return res.status(404).sent("Incorrect password")
        }
        res.cookie("jwt", createToken(email, user.id), {
            maxAge,
            secure: true,
            sameSite: 'None',

        });
        return res.status(200).json({user: {
            id: user.id,
            email: user.email,
            profileSetup: user.profileSetup,
            firstName: user.firstName,
            lastName: user.lastName,
            image: user.image,
            color: user.color

        }})
    } catch (err) {
        console.log(err)
        return res.status(400).send("Internal Server errror");
    }
}
export const getUserInfo = async (req, res, next) => {
    try {  
        // return res.status(200).json({user: {
        //     id: user.id,
        //     email: user.email,
        //     profileSetup: user.profileSetup,
        //     firstName: user.firstName,
        //     lastName: user.lastName,
        //     image: user.image,
        //     color: user.color

        // }})
    } catch (err) {
        console.log(err)
        return res.status(400).send("Internal Server errror");
    }
}