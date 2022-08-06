import joi from "joi"

const loginSchema = joi.object({
  email: joi.string().min(3).required().email(),
  password: joi.string().required(),

})

export default loginSchema