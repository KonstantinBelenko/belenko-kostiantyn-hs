import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import UserModel from '../models/UserModel'

interface TokenPayload {
    // specify the properties of the payload here
    [key: string]: any
}

interface AuthenticatedRequest extends Request {
    user?: TokenPayload
}

const authenticateUser = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    const token = req.header('auth-token') // For any authenticated request, need to pass auth-token header
    if (!token) return res.status(401).send('Access denied')

    try {
        const verified = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as TokenPayload

        // Fetch the user from the database
        const user = await UserModel.findById(verified._id)
        if (!user) throw new Error('User does not exist')

        req.user = user
    } catch (error) {
        res.status(400).send({ message: error })
        return
    }

    next()
}

export default authenticateUser
