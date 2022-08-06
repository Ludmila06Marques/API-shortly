import { Router } from "express"
import authRoute from "../middlewares/authorization.js";
import { shortLink } from "../controllers/urlController.js";
import { validateUrl } from "../middlewares/validation.js";

const urlRouter= Router()



urlRouter.post("/urls/shorten",  authRoute , validateUrl, shortLink)




export default urlRouter;