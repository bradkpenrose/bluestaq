import { eq } from "drizzle-orm";
import { db } from "../../../db/index.ts";
import { noteTable } from "../../../db/schema.ts";
import type { Note } from "../../../models/note.ts";
import { AppError } from "../../../utils/error/app-error.ts";
import type { NoteRepository } from "../repo.ts";

const noteColumns = {
    id: noteTable.id,
    text: noteTable.text,
    userId: noteTable.userId,
    createdAt: noteTable.createdAt
}

export class NotePostgres implements NoteRepository {

    public async list(): Promise<Note[]> {
        return db.select(noteColumns).from(noteTable)
    }

    public async get(id: number): Promise<Note> {

        const [note] = await db.select(noteColumns).from(noteTable).where(eq(noteTable.id, id))

        if (!note) {
            throw new AppError(404, "note not found")
        }

        return note
    }

    public async create(text: string, userId: string): Promise<Note> {

        const [note] = await db.insert(noteTable).values({ text, userId }).returning(noteColumns)

        if (!note) {
            throw new AppError(500, "failed to create note")
        }

        return note
    }

    public async update(id: number, text: string): Promise<Note> {

        const [note] = await db.update(noteTable).set({ text }).where(eq(noteTable.id, id)).returning(noteColumns)

        if (!note) {
            throw new AppError(404, "note not found")
        }

        return note
    }

    public async delete(id: number): Promise<void> {

        const [note] = await db.delete(noteTable).where(eq(noteTable.id, id)).returning({ id: noteTable.id })

        if (!note) {
            throw new AppError(404, "note not found")
        }
    }
}
