import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import homeRouter from './routes/home'
import authRoutes from './routes/auth'
import privateRoutes from './routes/privateRoutes'

// Load environment variables
dotenv.config()

const app: Application = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Route Middlewares
app.use('/', homeRouter)
app.use('/api/private', privateRoutes)
app.use('/api/user', authRoutes)

export const connectDatabase = async () => {
    // Connect to Database
    await mongoose.connect(process.env.DB_URL as string, {})
}

export default app
