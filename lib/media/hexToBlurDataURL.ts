/**
 * hexToBlurDataURL
 *
 * Generates a valid base64-encoded 1×1 PNG data URL from a hex color.
 * Used as `blurDataURL` for next/image `placeholder="blur"`.
 *
 * Technique: hand-builds the minimal PNG binary (signature + IHDR + IDAT + IEND)
 * using pure TypeScript — zero dependencies, works in both Node.js (SSR) and the browser.
 *
 * Math:
 *   • CRC-32 (standard PNG chunk integrity)
 *   • Adler-32 (zlib stream checksum) — closed-form for 4 input bytes:
 *       s1 = 1 + r + g + b
 *       s2 = 4 + 3r + 2g + b
 *     Both are guaranteed < 65521, so no modulo is needed.
 *
 * References:
 *   https://www.w3.org/TR/PNG/ (section 5: chunk layout, section 10: IHDR/IDAT/IEND)
 *   https://www.zlib.net/manual.html (zlib header format)
 *   RFC 1951 (DEFLATE stored block)
 */

function u32be(n: number): number[] {
    return [(n >>> 24) & 0xff, (n >>> 16) & 0xff, (n >>> 8) & 0xff, n & 0xff]
}

function crc32(bytes: number[]): number {
    let crc = 0xffffffff
    for (const byte of bytes) {
        crc ^= byte
        for (let k = 0; k < 8; k++) {
            crc = crc & 1 ? (crc >>> 1) ^ 0xedb88320 : crc >>> 1
        }
    }
    return (crc ^ 0xffffffff) >>> 0
}

function pngChunk(type: string, data: number[]): number[] {
    const t = [...type].map(c => c.charCodeAt(0))
    const crc = crc32([...t, ...data])
    return [...u32be(data.length), ...t, ...data, ...u32be(crc)]
}

export function hexToBlurDataURL(hex: string): string {
    const raw = hex.replace(/^#/, '')
    const expanded = raw.length === 3
        ? raw.split('').map(c => c + c).join('')
        : raw

    const r = parseInt(expanded.slice(0, 2), 16)
    const g = parseInt(expanded.slice(2, 4), 16)
    const b = parseInt(expanded.slice(4, 6), 16)

    if (isNaN(r) || isNaN(g) || isNaN(b)) {
        return hexToBlurDataURL('#111111')
    }

    const s1 = 1 + r + g + b
    const s2 = 4 + 3 * r + 2 * g + b

    const png: number[] = [
        0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
        ...pngChunk('IHDR', [
            0, 0, 0, 1,
            0, 0, 0, 1,
            8,
            2,
            0, 0, 0,
        ]),
        ...pngChunk('IDAT', [
            0x78, 0x01,
            0x01,
            0x04, 0x00,
            0xfb, 0xff,
            0x00, r, g, b,
            ...u32be((s2 << 16) | s1),
        ]),
        ...pngChunk('IEND', []),
    ]

    return 'data:image/png;base64,' + btoa(String.fromCharCode(...png))
}