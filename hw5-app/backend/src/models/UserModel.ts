import mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
    email: string
    name: string
    password: string
    date: Date
    // Add more fields here
}

const UserSchema: Schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    // Add more fields here
})

const UserModel = mongoose.model<IUser>('User', UserSchema)

export default UserModel
