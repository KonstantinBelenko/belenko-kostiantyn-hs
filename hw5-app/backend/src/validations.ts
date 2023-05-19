import Joi, { ObjectSchema } from '@hapi/joi'

interface UserData {
    email: string
    password: string
    name?: string
    date?: Date
}

const registerValidation = (data: UserData) => {
    const schema: ObjectSchema = Joi.object({
        email: Joi.string().email().required(),
        name: Joi.string().min(3).required(),
        password: Joi.string().min(8).required(),
        date: Joi.date().default(Date.now),
        // Update further if any fields added to UserModel.js
    })

    return schema.validate(data)
}

const loginValidation = (data: UserData) => {
    const schema: ObjectSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
    })

    return schema.validate(data)
}

export { registerValidation, loginValidation }
