import { Router, Request as ExpressRequest, Response } from 'express'
import authenticateUser from './verifyToken'
import mongoose from 'mongoose'

interface Request extends ExpressRequest {
    user?: any // Use appropriate type for user
}

const router = Router()

router.get('/', authenticateUser, (req: Request, res: Response) => {
    res.json({ user: req.user })
})

router.get('/validate', authenticateUser, (req: Request, res: Response) => {
    res.json({ user: req.user })
})

router.get('/info', authenticateUser, async (req: Request, res: Response) => {
    const UserModel = mongoose.model('User')
    const user = await UserModel.findOne({ _id: req.user._id })
    res.json({
        user: {
            username: user.name,
            email: user.email,
        },
    })
})

export default router
