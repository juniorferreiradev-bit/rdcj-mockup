const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const DEFAULT_SOURCES = Object.freeze([
    'README.md', 'CHANGELOG.md', 'MANUAL-OPERADOR.md', 'docs/guides/GUIA-DEMONSTRACAO.md',
    'src/memory/backlog.md', 'src/memory/decisions-log.md', 'src/memory/feedback-log.md',
    'src/memory/product-memory.md', 'memory/project-memory.json',
    'memory/knowledge-index.json', 'memory/context-snapshot.json'
]);

class DocumentationRepository {
    constructor({ rootDir = process.cwd(), sources = DEFAULT_SOURCES, outputDir = 'memory/documentation-generated' } = {}) {
        this.rootDir = rootDir; this.sources = [...sources]; this.outputDir = outputDir;
    }
    readSources() {
        return this.sources.map((relativePath) => {
            const absolutePath = path.resolve(this.rootDir, relativePath);
            if (!fs.existsSync(absolutePath)) return { id: relativePath, path: relativePath, missing: true, content: '', hash: null, headings: [] };
            const content = fs.readFileSync(absolutePath, 'utf8');
            return { id: relativePath, path: relativePath, missing: false, content, hash: hash(content), headings: headings(content), title: title(content, relativePath) };
        });
    }
    writeDerived(files) {
        const directory = path.resolve(this.rootDir, this.outputDir);
        fs.mkdirSync(directory, { recursive: true });
        Object.entries(files).forEach(([name, content]) => fs.writeFileSync(path.join(directory, name), content));
    }
}
function hash(value) { return crypto.createHash('sha256').update(value).digest('hex'); }
function headings(content) { return [...content.matchAll(/^#{1,6}\s+(.+)$/gm)].map((match) => match[1].trim()); }
function title(content, file) { return (content.match(/^#\s+(.+)$/m) || [])[1] || path.basename(file); }
module.exports = { DocumentationRepository, DEFAULT_SOURCES, hash };
