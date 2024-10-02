import express from 'express'
import dotenv from "dotenv";
import cors from "cors"
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

dotenv.config();
const app = express();
app.use(cors({
    origin:[process.env.ORIGIN],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
}))
app.use(cookieParser());
app.use(express.json());
const port = process.env.PORT || 3000;
const dbURL = process.env.DATABASE_URL
const server = app.listen(port, () => {
    console.log(`Server is running at port: ${port}`)
})

mongoose.connect(dbURL).then(() => console.log("db connection Successfull"))