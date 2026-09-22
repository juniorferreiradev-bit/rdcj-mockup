export interface EventoAuditoria {
  id: string;
  tipo: string;
  data: string;
  usuario: string;
  cnj?: string;
  origemCarga?: string;
  versaoCarga?: string;
  detalhes?: string;
}

export function registrarAlteracao(evento: Omit<EventoAuditoria, 'id' | 'data'>): EventoAuditoria {
  return { ...evento, id: crypto.randomUUID(), data: new Date().toISOString() };
}

export function listarAuditoria(): EventoAuditoria[] {
  return [];
}
