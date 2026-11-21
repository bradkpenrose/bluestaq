import type { NoteRepository } from "../data/notes/repo.ts"
import type { Note } from "../models/note.ts"

export type NoteDTO = {
    id: number
    text: string
    userID: string
}

function ToNoteDTO(note: Note | undefined): NoteDTO {

    if (note === undefined) {
        throw new Error("invalid note")
    }

    return { 
        id: note.id, 
        text: note.text,
        userID: note.userId,
    }
}

export class NoteService {
    
    private repo: NoteRepository

    constructor(repo: NoteRepository) {
        this.repo = repo
    }

    public async list(): Promise<NoteDTO[]> {

        let notes = await this.repo.list()

        const result = new Array<NoteDTO>(notes.length)

        for(let i = 0; i < notes.length; i++) {
            const note = notes[i]
            result[i] = ToNoteDTO(note)
        }

        return result
    }

    public async get(id: number): Promise<NoteDTO> {
        const note = await this.repo.get(id)
        return ToNoteDTO(note)
    }

    public async create(text: string, userId: string): Promise<NoteDTO> {
        const note = await this.repo.create(text, userId)
        return ToNoteDTO(note)
    }

    public async update(id: number, text: string): Promise<NoteDTO> {
        const note = await this.repo.update(id, text)
        return ToNoteDTO(note)
    }

    public async delete(id: number): Promise<void> {
        await this.repo.delete(id)
    }
}
