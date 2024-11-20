import express from 'express'
import { connectDB } from './src/config/connectDB.js'
import cors from 'cors'
const app = express()
const port = process.env.PORT || 8080
console.log("port is: ", process.env.PORT)
app.use(cors())
connectDB().then(() => {
    app.listen(port, ()=> {
        console.log(`Server running at: `, port)
    })
})