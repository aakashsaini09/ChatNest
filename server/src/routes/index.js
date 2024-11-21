import express from 'express'
import { registerUser } from '../controllers/registerUser.js'
const router = express.Router()


// create user api
router.post('/register', registerUser)

export default router