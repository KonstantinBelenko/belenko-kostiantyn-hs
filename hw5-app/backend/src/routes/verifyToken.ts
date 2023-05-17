import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface TokenPayload {
    // specify the properties of the payload here
    [key: string]: any
}

interface AuthenticatedRequest extends Request {
    user?: TokenPayload
}

const authenticateUser = (
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
        req.user = verified
    } catch (error) {
        res.status(400).send({ message: error })
        return
    }

    next()
}

export default authenticateUser
