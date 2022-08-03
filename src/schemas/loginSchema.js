import joi from "joi"

const loginSchema = joi.object({
  email: joi.email().required(),
  password: joi.string().required(),

})

export default loginSchema