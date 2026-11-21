import test, { after, describe } from "node:test";
import { NoteService } from "./notes.ts";
import assert from "node:assert";
import { NotePostgres } from "../data/notes/postgres/postgres.ts";
import { db } from "../db/index.ts";


describe("note service lifecycle", () => {

    const repo = new NotePostgres()
    const service = new NoteService(repo)

    let initialCount: number = 0
    let noteID: number

    const text1 = "note1"
    const text2 = "note2"

    after(async () => {
        await db.$client.end()
    })

    test("initial list", async () => {
        const notes = await service.list()
        initialCount = notes.length
        assert.strictEqual(notes.length, initialCount)
    })

    test("create note", async () => {
        const note = await service.create(text1)
        assert.strictEqual(note.text, text1)
        noteID = note.id
    })

    test("after create list", async () => {
        const notes = await service.list()
        assert.strictEqual(notes.length, initialCount + 1)
    })

    test("get note after create", async () => {
        const note = await service.get(noteID)
        assert.strictEqual(note.text, text1)
    })

    test("update note", async () => {
        const note = await service.update(noteID, text2)
        assert.strictEqual(note.text, text2)
    })

    test("get note after update", async () => {
        const note = await service.get(noteID)
        assert.strictEqual(note.text, text2)
    })

    test("delete note", async () => {
        await service.delete(noteID)
        const notes = await service.list()
        assert.strictEqual(notes.length, initialCount)
    })
})