
import express from 'express'
import cors from 'cors'
import type { Express, Request, Response, NextFunction,  } from 'express'
import RegisterNotes from './routes/notes.ts'
import { AppError } from './utils/error/app-error.ts'

const args = process.argv.slice(2)

if (args.length === 0) {
    throw new Error("no port")
}

const listen = args[0]

const app: Express = express()

app.use(cors())
app.use(express.json())

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(req.path)
    next()
})

app.get("", (req: Request, res: Response, next) => {
    res.sendStatus(200)
})

RegisterNotes(app)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  
    console.log(err.message)

    next()

    if (err instanceof AppError) {
        res.status(err.statusCode).json({ message: err.message })
        return
    }

    res.status(500).json({
        message: "server error"
    })
})

app.listen(listen, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("server running on port:", listen)
    }
})