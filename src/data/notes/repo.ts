import type { Note } from "../../models/note.ts";

export interface NoteRepository {
    list(): Promise<Note[]>
    get(id: number): Promise<Note>
    create(text: string, userId: string): Promise<Note>
    update(id: number, text: string): Promise<Note>
    delete(id: number): Promise<void>
}
