const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { MemoryRepository } = require('../memory');

const DEFAULT_SOURCES = Object.freeze([
    'README.md',
    'CHANGELOG.md',
    'src/memory/backlog.md',
    'src/memory/decisions-log.md',
    'src/memory/feedback-log.md',
    'src/memory/product-memory.md',
    'architecture-current.md',
    'architecture-target.md',
    'gap-analysis.md',
    'migration-roadmap.md'
]);

class ContextRepository {
    constructor({ rootDir = process.cwd(), sources = DEFAULT_SOURCES, memoryPath = 'memory/project-memory.json', outputDir = 'memory' } = {}) {
        this.rootDir = rootDir;
        this.sources = [...sources];
        this.memoryPath = memoryPath;
        this.outputDir = outputDir;
    }

    readDocuments() {
        return this.sources.map((relativePath) => {
            const absolutePath = path.resolve(this.rootDir, relativePath);
            if (!fs.existsSync(absolutePath)) throw new Error(`Fonte de conhecimento não encontrada: ${relativePath}`);
            const content = fs.readFileSync(absolutePath, 'utf8');
            return { id: relativePath, path: relativePath, content, hash: hash(content), title: titleOf(relativePath, content), headings: headingsOf(content) };
        });
    }

    readMemory() {
        const relativePath = this.memoryPath;
        const absolutePath = path.resolve(this.rootDir, relativePath);
        const memory = JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
        return { memory, repository: new MemoryRepository({ initialMemory: memory, storage: null }) };
    }

    fingerprint(documents, memory) {
        return hash(JSON.stringify({ documents: documents.map(({ id, hash: value }) => ({ id, hash: value })), memory }));
    }

    writeArtifacts({ index, model, snapshot }) {
        const directory = path.resolve(this.rootDir, this.outputDir);
        fs.mkdirSync(directory, { recursive: true });
        fs.writeFileSync(path.join(directory, 'knowledge-index.json'), JSON.stringify(index, null, 2) + '\n');
        fs.writeFileSync(path.join(directory, 'context-model.json'), JSON.stringify(model, null, 2) + '\n');
        fs.writeFileSync(path.join(directory, 'context-snapshot.json'), JSON.stringify(snapshot, null, 2) + '\n');
    }
}

function hash(value) { return crypto.createHash('sha256').update(value).digest('hex'); }
function titleOf(relativePath, content) { return (content.match(/^#\s+(.+)$/m) || [])[1] || path.basename(relativePath); }
function headingsOf(content) { return [...content.matchAll(/^#{1,6}\s+(.+)$/gm)].map((match) => match[1].trim()); }

module.exports = { ContextRepository, DEFAULT_SOURCES, hash };
