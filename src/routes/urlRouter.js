import { Router } from "express"
import authRoute from "../middlewares/authorization.js";
import { shortLink } from "../controllers/urlController.js";
import { validateUrl } from "../middlewares/validation.js";
import { getLinkById } from "../controllers/urlController.js";

const urlRouter= Router()



urlRouter.post("/urls/shorten",  authRoute , validateUrl, shortLink)
urlRouter.get("/urls/:id" , getLinkById)


export default urlRouter;