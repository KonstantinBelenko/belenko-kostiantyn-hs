import { Router, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { registerValidation, loginValidation } from '../validations'
import User from '../models/UserModel'

const router = Router()

router.post('/register', async (req: Request, res: Response) => {
    // Validation check
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // Email uniqueness check
    const emailExists = await User.findOne({ email: req.body.email })
    if (emailExists) return res.status(400).send('Email address already exists')

    // Hash the password
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(req.body.password, salt)

    // Save user
    const user = new User({
        email: req.body.email,
        name: req.body.name,
        password: hashedPassword,
    })

    try {
        const newUser = await user.save()
        res.send({ user: newUser._id })
    } catch (error) {
        res.status(400).send({ message: error })
    }
})

router.post('/login', async (req: Request, res: Response) => {
    // Validation check
    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // Email existence check
    const registeredUser = await User.findOne({ email: req.body.email })
    if (!registeredUser)
        return res.status(400).send('User with this email does not exist')

    // Check password
    const passwordMatch = bcrypt.compareSync(
        req.body.password,
        registeredUser.password
    )
    if (!passwordMatch)
        return res.status(400).send('Email or Password do not match')

    // Create and assign JWT
    const token = jwt.sign(
        { _id: registeredUser._id },
        process.env.JWT_SECRET as string
    )
    res.header('auth-token', token).send(token)
})

export default router
