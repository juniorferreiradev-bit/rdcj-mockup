class ContextSnapshot { constructor(data = {}) { this.schemaVersion = data.schemaVersion || '1.0'; this.fingerprint = data.fingerprint || null; this.context = data.context || {}; } }
class DocumentationSnapshot { constructor(data = {}) { this.schemaVersion = data.schemaVersion || '1.0'; this.fingerprint = data.fingerprint || null; this.documentationState = data.documentationState || {}; this.coverage = data.coverage || {}; } }
module.exports = { ContextSnapshot, DocumentationSnapshot };
