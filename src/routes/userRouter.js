import { Router } from "express"
import { validateUser , validateLogin } from "../middlewares/validateUser"
import { signIn , signUp } from "../controllers/userControl"


const userRouter= Router()



userRouter.post("/signup", validateUser ,signUp)
userRouter.post("/signup",validateLogin, signIn)



export default userRouter