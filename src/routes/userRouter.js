import { Router } from "express"
import { validateUser , validateLogin } from "../middlewares/validation.js"
import { getInfo, signIn , signUp } from "../controllers/userControl.js"
import authRoute from "../middlewares/authorization.js"
import { getRanking } from "../controllers/userControl.js"

const userRouter= Router()



userRouter.post("/signup",  validateUser ,signUp)
userRouter.post("/signin",validateLogin, signIn)
userRouter.get("/users/me" , authRoute, getInfo)
userRouter.get("/ranking" , getRanking)



export default userRouter;