const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv/config') // Environment variables

async function main() {
    // Route imports
    const homeRoutes = require('./routes/home')
    const authRoutes = require('./routes/auth')
    const privateRoutes = require('./routes/privateRoutes')

    // Middlewares
    app.use(cors())
    app.use(express.json())
    // -> Route Middlewares
    app.use('/', homeRoutes)
    app.use('/api/private', privateRoutes)
    app.use('/api/user', authRoutes)

    // Connect to Database
    await mongoose.connect(process.env.DB_URL)

    // Starting the server
    app.listen(process.env.PORT, () => {
        console.log(
            `Application running at http://localhost:${process.env.PORT}/`
        )
    })
}

main()
    .then(() => {
        console.log('Application started successfully')
    })
    .catch((error) => {
        console.log('Application failed to start')
        console.log(error)
    })
