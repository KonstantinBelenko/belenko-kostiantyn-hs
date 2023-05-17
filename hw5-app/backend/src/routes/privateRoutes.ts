import { Router, Request as ExpressRequest, Response } from 'express'
import authenticateUser from './verifyToken'

interface Request extends ExpressRequest {
    user?: any // Use appropriate type for user
}

const router = Router()

router.get('/', authenticateUser, (req: Request, res: Response) => {
    res.send(req.user)
})

export default router
