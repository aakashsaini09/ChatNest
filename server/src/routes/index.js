import express from 'express'
import { registerUser } from '../controllers/registerUser.js'
import { emailVerify } from '../controllers/emailVerify.js'
import { passwordVerify } from '../controllers/passwordVerify.js'
const router = express.Router()


// create user api
router.post('/register', registerUser)
router.post('/email', emailVerify)
router.post('/password', passwordVerify)

export default router