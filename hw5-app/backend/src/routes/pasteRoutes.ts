import { Router, Request as ExpressRequest, Response } from 'express'
import authenticateUser from './verifyToken'
import PasteModel, { IPaste } from '../models/PasteModel'
import mongoose from 'mongoose'
import { body, validationResult } from 'express-validator'

interface Request extends ExpressRequest {
    user?: any // Use appropriate type for user
}

const router = Router()

router.get('/', authenticateUser, async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const sortBy = req.query.sortBy as string
    const sortOrder = req.query.sortOrder as 'asc' | 'desc'
    const filter = Number(req.query.filter)

    let sort = {}

    if (sortBy && sortOrder) {
        ;(sort as any)[sortBy] = sortOrder === 'desc' ? -1 : 1
    }

    const conditions = filter ? { charCount: { $gte: filter } } : {}

    try {
        const pastes = await PasteModel.find(conditions)
            .sort(sort)
            .limit(limit)
            .skip((page - 1) * limit)
            .exec()

        const count = await PasteModel.countDocuments(conditions)

        res.json({
            pastes,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        })
    } catch (err) {
        res.status(500).json({ error: err as Error })
    }
})

router.post(
    '/',
    authenticateUser,
    body('content').notEmpty().withMessage('Content is required'),
    async (req: Request, res: Response) => {
        // Checks for validation errors
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const paste = new PasteModel({
            content: req.body.content,
            authorId: req.user._id,
            authorName: req.user.name,
            charCount: req.body.content.length,
        })

        try {
            await paste.save()
            res.status(201).json(paste)
        } catch (err) {
            res.status(500).json({ error: err as Error })
        }
    }
)

router.get('/:id', authenticateUser, async (req: Request, res: Response) => {
    try {
        const paste = (await PasteModel.findById(req.params.id)) as IPaste
        if (!paste) {
            return res.status(404).json({ error: 'Paste not found' })
        }
        res.json(paste)
    } catch (err) {
        res.status(500).json({ error: (err as Error).message })
    }
})

router.delete('/:id', authenticateUser, async (req: Request, res: Response) => {
    try {
        const paste = await PasteModel.findById(req.params.id)

        if (paste && paste.authorId === req.user._id) {
            await PasteModel.deleteOne({ _id: req.params.id })
            res.status(200).json({ message: 'Paste removed' })
        } else {
            res.status(401).json({ message: 'Not authorized' })
        }
    } catch (err) {
        res.status(500).json({ error: err as Error })
    }
})

export default router
