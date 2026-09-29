import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const exists = (file) => fs.existsSync(file);
const filesUnder = (directory, extension) => {
    const absolute = path.join(root, directory);
    if (!exists(absolute)) return [];
    return fs.readdirSync(absolute, { withFileTypes: true }).flatMap((entry) => {
        const file = path.join(absolute, entry.name);
        if (entry.isDirectory()) return filesUnder(path.relative(root, file), extension);
        return file.endsWith(extension) ? [file] : [];
    });
};
const ignored = (value) => !value || /^(?:[a-z]+:|\/\/|#|data:|mailto:|tel:|javascript:)/i.test(value);
const clean = (value) => decodeURIComponent(value.split(/[?#]/, 1)[0].trim());
const failures = [];
const verify = (owner, value) => {
    if (ignored(value)) return;
    const target = path.resolve(path.dirname(owner), clean(value));
    if (!exists(target)) failures.push(`${path.relative(root, owner)} -> ${value}`);
};

for (const file of [...filesUnder('src', '.html')]) {
    const html = fs.readFileSync(file, 'utf8');
    for (const match of html.matchAll(/\b(?:src|href)\s*=\s*["']([^"']+)["']/gi)) verify(file, match[1]);
    for (const match of html.matchAll(/url\s*=\s*([^\s"']+)/gi)) verify(file, match[1]);
}
for (const file of [...filesUnder('docs', '.md'), ...filesUnder('.', '.md').filter((file) => !file.includes(`${path.sep}docs${path.sep}`) && !file.includes(`${path.sep}Prompts${path.sep}`) && !file.includes(`${path.sep}.git${path.sep}`) && !file.includes(`${path.sep}.kilo${path.sep}`))]) {
    const markdown = fs.readFileSync(file, 'utf8');
    const fenceCount = [...markdown.matchAll(/^\s*```/gm)].length;
    if (fenceCount % 2 !== 0) failures.push(`${path.relative(root, file)} -> Markdown code fence sem fechamento`);
    for (const match of markdown.matchAll(/\]\(([^)]+)\)/g)) {
        const target = match[1].trim().replace(/^<|>$/g, '').split(/[?#]/, 1)[0];
        verify(file, target);
    }
}
for (const file of filesUnder('assets/css', '.css')) {
    const css = fs.readFileSync(file, 'utf8');
    for (const match of css.matchAll(/@import\s+(?:url\()?\s*["']?([^"')\s;]+)["']?\s*\)?/gi)) verify(file, match[1]);
    for (const match of css.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/gi)) verify(file, match[1]);
}

if (failures.length) {
    console.error(`Static reference validation failed (${failures.length} missing):`);
    failures.forEach((failure) => console.error(`- ${failure}`));
    process.exitCode = 1;
} else {
    console.log('Static repository references passed: HTML, Markdown links, navigation assets and CSS imports/URLs.');
}
