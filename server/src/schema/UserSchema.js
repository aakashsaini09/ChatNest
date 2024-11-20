import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "provide name"],
    },
    email: {
        type: String,
        required: [true, "Enter email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "provide password"]
    },
    profile_pic:{
        type: String,
        default: ''
    }
})