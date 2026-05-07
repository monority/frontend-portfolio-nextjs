import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const messagesDir = path.join(rootDir, "messages");

function readMessages(locale) {
    const filePath = path.join(messagesDir, `${locale}.json`);
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function collectLeafKeys(value, prefix = "") {
    if (value && typeof value === "object" && !Array.isArray(value)) {
        return Object.entries(value).flatMap(([key, nested]) =>
            collectLeafKeys(nested, prefix ? `${prefix}.${key}` : key)
        );
    }

    return [prefix];
}

test("fr and en message catalogs expose the same keys", () => {
    const fr = readMessages("fr");
    const en = readMessages("en");

    assert.deepEqual(collectLeafKeys(fr).sort(), collectLeafKeys(en).sort());
});

test("portfolio identity copy matches the current content", () => {
    const fr = readMessages("fr");
    const en = readMessages("en");

    assert.equal(fr.header.brand.name, "ronan");
    assert.equal(en.header.brand.name, "ronan");
    assert.equal(fr.hero.name, "Ronan Chenu");
    assert.equal(en.hero.name, "Ronan Chenu");
    assert.match(fr.hero.city, /Lille/);
    assert.match(en.hero.city, /Lille/);
});

test("all translation leaves are non-empty strings", () => {
    for (const locale of ["fr", "en"]) {
        const messages = readMessages(locale);

        for (const key of collectLeafKeys(messages)) {
            const value = key.split(".").reduce((current, part) => current[part], messages);
            assert.equal(typeof value, "string", `${locale}:${key} should be a string`);
            assert.notEqual(value.trim(), "", `${locale}:${key} should not be empty`);
        }
    }
});
