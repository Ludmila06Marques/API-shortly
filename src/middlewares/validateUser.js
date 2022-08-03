import userSchema from "../schemas/userSchema.js"

export function validateUser(req, res, next) {
  const user = req.body
  const validation = userSchema.validate(user)
  if (validation.error) {
    return res.sendStatus(400)
  }

  next()
}

export function validateLogin(req, res, next) {
  const user = req.body
  const validation = loginSchema.validate(user)
  if (validation.error) {
    return res.sendStatus(400)
  }

  next()
}