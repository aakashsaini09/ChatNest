import express from 'express'
import { connectDB } from './src/config/connectDB.js'
import router from './src/routes/index.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app = express()
const port = process.env.PORT || 8080
// console.log("port is: ", process.env.PORT)
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use('/api', router)
connectDB().then(() => {
    app.listen(port, ()=> {
        console.log(`Server running at: `, port)
    })
})