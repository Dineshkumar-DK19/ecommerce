import express from 'express'
import userController from '../controllers/userController.js'

const {registerUser,loginUser,adminLogin} = userController
const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)


export default userRouter;