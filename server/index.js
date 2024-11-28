import express from 'express'
import { connectDB } from './src/config/connectDB.js'
import router from './src/routes/index.js'
import cookieParser from 'cookie-parser'
import { app, server} from './src/socket/index.js'
import cors from 'cors'
// const app = express()
const port = process.env.PORT || 8080
// console.log("port is: ", process.env.PORT)
const corsOptions = {
    origin: 'http://localhost:5173', // Your frontend's URL
    credentials: true, // Allow credentials (cookies, Authorization headers, etc.)
  };
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use('/api', router)
connectDB().then(() => {
    server.listen(port, ()=> {
        console.log(`Server running at: `, port)
    })
})