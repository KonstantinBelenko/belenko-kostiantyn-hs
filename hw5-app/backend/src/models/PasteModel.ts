import mongoose, { Document, Schema } from 'mongoose'

export interface IPaste extends Document {
    content: string
    createdAt: Date
    likes: number
    dislikes: number
    authorId: string
    authorName: string
    charCount: number
}

const PasteSchema: Schema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    likes: {
        type: Number,
        default: 0,
    },
    dislikes: {
        type: Number,
        default: 0,
    },
    authorId: {
        type: String,
        required: true,
    },
    authorName: {
        type: String,
        required: true,
    },
    charCount: {
        type: Number,
        default: 0,
    },
})

PasteSchema.pre<IPaste>('save', function (next) {
    this.charCount = this.content.length
    next()
})

const PasteModel = mongoose.model<IPaste>('Paste', PasteSchema)

export default PasteModel
