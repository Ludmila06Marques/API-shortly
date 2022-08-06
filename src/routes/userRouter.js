import { Router } from "express"
import { validateUser , validateLogin } from "../middlewares/validation.js"
import { signIn , signUp } from "../controllers/userControl.js"


const userRouter= Router()



userRouter.post("/signup",  validateUser ,signUp)
userRouter.post("/signin",validateLogin, signIn)



export default userRouter;