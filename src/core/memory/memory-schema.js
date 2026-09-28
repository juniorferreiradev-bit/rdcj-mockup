const COLLECTIONS = Object.freeze([
    'features',
    'modules',
    'decisions',
    'tasks',
    'agents',
    'documentation',
    'releases'
]);

const ROOT_ARRAYS = Object.freeze([...COLLECTIONS, 'audit']);

function isObject(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isDateTime(value) {
    return typeof value === 'string' && !Number.isNaN(Date.parse(value));
}

function validateMemory(memory) {
    const errors = [];
    if (!isObject(memory)) return { valid: false, errors: ['A memória deve ser um objeto.'] };

    ['project', 'version', 'createdAt', 'updatedAt'].forEach((field) => {
        if (typeof memory[field] !== 'string' || !memory[field].trim()) errors.push(`Campo obrigatório inválido: ${field}.`);
    });
    ['createdAt', 'updatedAt'].forEach((field) => {
        if (memory[field] && !isDateTime(memory[field])) errors.push(`Campo deve ser date-time: ${field}.`);
    });
    ROOT_ARRAYS.forEach((field) => {
        if (!Array.isArray(memory[field])) errors.push(`Campo deve ser array: ${field}.`);
    });
    COLLECTIONS.forEach((collection) => {
        (memory[collection] || []).forEach((item, index) => {
            if (!isObject(item) || typeof item.id !== 'string' || !item.id.trim()) {
                errors.push(`Item inválido em ${collection}[${index}]: id obrigatório.`);
            }
        });
    });
    (memory.audit || []).forEach((entry, index) => {
        ['id', 'date', 'type', 'origin', 'module', 'author', 'impact'].forEach((field) => {
            if (typeof entry[field] !== 'string' || !entry[field].trim()) errors.push(`Auditoria inválida em audit[${index}]: ${field}.`);
        });
        if (entry.date && !isDateTime(entry.date)) errors.push(`Auditoria inválida em audit[${index}]: date.`);
    });
    return { valid: errors.length === 0, errors };
}

function assertValidMemory(memory) {
    const result = validateMemory(memory);
    if (!result.valid) throw new Error(`Memória inválida: ${result.errors.join(' ')}`);
    return memory;
}

function clone(value) {
    return JSON.parse(JSON.stringify(value));
}

module.exports = { COLLECTIONS, ROOT_ARRAYS, validateMemory, assertValidMemory, clone };
