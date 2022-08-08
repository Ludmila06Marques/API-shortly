import userSchema from "../schemas/userSchema.js"
import loginSchema from "../schemas/loginSchema.js"
import urlSchema from "../schemas/urlSchema.js"

export function validateUser(req, res, next) {
  const user = req.body
  console.log(req.body)
  const validation = userSchema.validate(user)
  if (validation.error) {
    return res.sendStatus(422)
  }

  next()
}

export function validateLogin(req, res, next) {
  const user = req.body
  const validation = loginSchema.validate(user)
  if (validation.error) {
    return res.sendStatus(422)
  }

  next()
}

export function validateUrl(req, res, next) {
  const url = req.body
  const validation = urlSchema.validate(url)
  if (validation.error) {
    return res.sendStatus(422)
  }
  next()
}