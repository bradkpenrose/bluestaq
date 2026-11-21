import assert from "node:assert";
import test, { describe } from "node:test";


describe("note route test", () => {

    test("test list", async() => {
        const res = await fetch("http://localhost:3000/notes")
        assert.strictEqual(res.status, 200)

        const data = await res.json()
        assert.strictEqual(data.length, 0)
    })

})