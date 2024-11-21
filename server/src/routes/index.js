import express from 'express'
import { registerUser } from '../controllers/registerUser.js'
import { emailVerify } from '../controllers/emailVerify.js'
import { passwordVerify } from '../controllers/passwordVerify.js'
import { userDetails } from '../controllers/userDetails.js'
import { logout } from '../controllers/logout.js'
const router = express.Router()


// create user api
router.post('/register', registerUser)
router.post('/email', emailVerify)
router.post('/password', passwordVerify)
router.get('/user-details', userDetails)
router.get('/logout', logout)

export default router