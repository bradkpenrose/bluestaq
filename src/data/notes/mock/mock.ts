import type { Note } from "../../../models/note.ts"
import { AppError } from "../../../utils/error/app-error.ts"
import type { NoteRepository } from "../repo.ts"

export class NoteMock implements NoteRepository {

    private currentID: number = 1

    private notes: Record<number, Note> = {}

    private findNote(id: number): Note | undefined {

        if (this.notes[id]) {
            return this.notes[id]
        }

        return undefined
    }

    public async list(): Promise<Note[]> {
        return Object.values(this.notes)
    }

    public async get(id: number): Promise<Note> {

        const note = this.findNote(id)
        
        if (!note) {
            throw new AppError(404, "note not found")
        }
    
        return note
    }

    public async create(text: string, userId: string): Promise<Note> {

        const note: Note = {
            id: this.currentID,
            text: text,
            userId: userId,
            createdAt: new Date()
        }
            
        this.notes[note.id] = note

        this.currentID += 1

        return note
    }

    public async update(id: number, text: string): Promise<Note> {

        const note = this.findNote(id)
        
        if (!note) {
            throw new AppError(404, "note not found")
        }
    
        note.text = text
    
        this.notes[note.id] = note
    
        return note
    }

    public async delete(id: number): Promise<void> {

        const note = this.findNote(id)
        
        if (!note) {
            throw new AppError(404, "note not found")
        }
    
        delete this.notes[id]
    }
}
