import { Router } from "express"
import authRoute from "../middlewares/authorization.js";
import { openLink, shortLink } from "../controllers/urlController.js";
import { validateUrl } from "../middlewares/validation.js";
import { getLinkById } from "../controllers/urlController.js";
import { deleteUrlById } from "../controllers/urlController.js";

const urlRouter= Router()



urlRouter.post("/urls/shorten",  authRoute , validateUrl, shortLink)
urlRouter.get("/urls/:id" , getLinkById)
urlRouter.get("/urls/open/:shortUrl" , openLink)
urlRouter.delete("/urls/:id" ,authRoute, deleteUrlById)


export default urlRouter;