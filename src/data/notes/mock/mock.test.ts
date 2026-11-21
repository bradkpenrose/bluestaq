import assert from "node:assert"
import test, { describe } from "node:test"
import { NoteMock } from "./mock.ts"

describe('note data mock lifecycle', () => {

    const nodeMock = new NoteMock()

    const text1: string = "note1"
    const text2: string = "note2"

    let noteID: number

    test('initial list', async () => {
        const notes = await nodeMock.list()
        assert.strictEqual(notes.length, 0)
    })

    test('create note', async () => {
        const note = await nodeMock.create(text1, "user_one")
        assert.strictEqual(note.text, text1)
        noteID = note.id
    })

    test('create list', async () => {
        const notes = await nodeMock.list()
        assert.strictEqual(notes.length, 1)
    })

    test('get note 1', async () => {
        const note = await nodeMock.get(noteID)
        assert.strictEqual(note.text, text1)
    })

    test('update note', async () => {
        const note = await nodeMock.update(noteID, text2)
        assert.strictEqual(note.text, text2)
    })

    test('get note 2', async () => {
        const note = await nodeMock.get(noteID)
        assert.strictEqual(note.text, text2)
    })

    test('delete note', async () => {
        await nodeMock.delete(noteID)
        const notes = await nodeMock.list()
        assert.strictEqual(notes.length, 0)
    })
})