// src/server.ts
import app, { connectDatabase } from './app'

async function main() {
    await connectDatabase()

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
    .catch((error: Error) => {
        console.log('Application failed to start')
        console.error(error)
    })
