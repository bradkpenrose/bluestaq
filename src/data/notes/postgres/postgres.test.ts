import assert from "node:assert"
import test, { after, describe } from "node:test"
import { NotePostgres } from "./postgres.ts"
import { db } from "../../../db/index.ts"

describe('note data postgres lifecycle', () => {

    const notePostgres = new NotePostgres()

    const text1: string = "note1"
    const text2: string = "note2"

    let initialCount: number = 0
    let noteID: number

    after(async () => {
        await db.$client.end()
    })

    test('initial list', async () => {
        const notes = await notePostgres.list()
        initialCount = notes.length
    })

    test('create note', async () => {
        const note = await notePostgres.create(text1, "user_one")
        assert.strictEqual(note.text, text1)
        noteID = note.id
    })

    test('create list', async () => {
        const notes = await notePostgres.list()
        assert.strictEqual(notes.length, initialCount + 1)
    })

    test('get note 1', async () => {
        const note = await notePostgres.get(noteID)
        assert.strictEqual(note.text, text1)
    })

    test('update note', async () => {
        const note = await notePostgres.update(noteID, text2)
        assert.strictEqual(note.text, text2)
    })

    test('get note 2', async () => {
        const note = await notePostgres.get(noteID)
        assert.strictEqual(note.text, text2)
    })

    test('delete note', async () => {
        await notePostgres.delete(noteID)
        const notes = await notePostgres.list()
        assert.strictEqual(notes.length, initialCount + 0)
    })
})