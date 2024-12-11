import mongoose from "mongoose";
let uri = 'mongodb+srv://aakashsaini948585:xikE9PU9bLa06Msf@cluster0.1mdon.mongodb.net/'
export async function connectDB() {
    try {
        await mongoose.connect(uri)
        const connection = mongoose.connection
        connection.on('connected', () => {
            // console.log("connected to DB")
        })
        connection.on('error', (error) => {
            console.log("Something went wrong while connecting DataBase: ", error)
        })
    } catch (err) {
        console.log("Something went wrong while connecting DB: ", err)
    }
}

// xikE9PU9bLa06Msf
// aakashsaini948585
// mongodb+srv://aakashsaini948585:xikE9PU9bLa06Msf@cluster0.1mdon.mongodb.net/