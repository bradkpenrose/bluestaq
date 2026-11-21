import { Router } from 'express'
import type { Express,  Request,  Response } from 'express'
import { NoteService, type NoteDTO } from '../services/notes.ts'
import type { Note } from '../models/note.ts'
import { NotePostgres } from '../data/notes/postgres/postgres.ts'


const notes: Note[] = []

function RegisterNotes(app: Express) {

    const repo: NotePostgres = new NotePostgres()
    const service: NoteService = new NoteService(repo)
    
    const router: Router = Router()

    router.get('/', async (req: Request, res: Response) => {
        const notes = await service.list()
        res.json(notes)
    })

    router.get('/:id', async (req: Request, res: Response) => {
        const id: number = Number(req.params.id)
        const note: NoteDTO | undefined = await service.get(id)
        res.json(note)
    })

    router.post('/', async (req: Request, res: Response) => {
        const { text, userId } = req.body
        const note = await service.create(text, userId)
        res.json(note)
    })

    router.put('/:id', async (req: Request, res: Response) => {
        const id: number = Number(req.params.id)
        const { text } = req.body
        const note: NoteDTO = await service.update(id, text)
        res.json(note)
    })

    router.delete('/:id', async (req: Request, res: Response) => {
        const id: number = Number(req.params.id)
        await service.delete(id)
        res.sendStatus(200)
    })

    app.use('/notes', router)
}

export default RegisterNotes