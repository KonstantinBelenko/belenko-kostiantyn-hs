import { Router, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { registerValidation, loginValidation } from '../validations'
import authenticateUser from './verifyToken'
import User from '../models/UserModel'

const router = Router()

router.post('/register', async (req: Request, res: Response) => {
    // Validation check
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).json(error.details[0].message)

    // Email uniqueness check
    const emailExists = await User.findOne({ email: req.body.email })
    if (emailExists) return res.status(400).json('Email address already exists')

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

        // Create and assign JWT
        const token = jwt.sign(
            { _id: newUser._id },
            process.env.JWT_SECRET as string
        )

        res.header('auth-token', token).json({ token })
    } catch (error) {
        res.status(400).json({ message: error })
    }
})

router.post('/login', async (req: Request, res: Response) => {
    // Validation check
    const { error } = loginValidation(req.body)
    if (error) return res.status(400).json(error.details[0].message)

    // Email existence check
    const registeredUser = await User.findOne({ email: req.body.email })
    if (!registeredUser)
        return res.status(400).json('User with this email does not exist')

    // Check password
    const passwordMatch = bcrypt.compareSync(
        req.body.password,
        registeredUser.password
    )
    if (!passwordMatch)
        return res.status(400).json('Email or Password do not match')

    // Create and assign JWT
    const token = jwt.sign(
        { _id: registeredUser._id },
        process.env.JWT_SECRET as string
    )
    res.header('auth-token', token).json({ token })
})

export default router
