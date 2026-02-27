import 'reflect-metadata'
import { env } from './config/env'
import { connectDatabase } from './infrastructure/database/database'
import { Server } from './presentation/server'

const startServer = async () => {
    try {
        await connectDatabase();

        const server = new Server();
        server.start();

    } catch (error) {
        console.error('Failed to start server:', error)
        process.exit(1)
    }
}

startServer()