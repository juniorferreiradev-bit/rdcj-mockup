export interface BaseMetadata {
  id: string;
  nomeArquivo: string;
  dataImportacao: string;
  quantidadeProcessos: number;
  versaoCarga: string;
  status: 'ATIVA';
}

export interface RegistroBase {
  cnj: string;
  cliente: string;
  [campo: string]: unknown;
}

export function importarBase(registros: RegistroBase[], metadata: BaseMetadata): RegistroBase[] {
  return mesclarPorCnj(obterBaseAtiva(), registros, metadata);
}

export function substituirBase(registros: RegistroBase[], metadata: BaseMetadata): RegistroBase[] {
  salvar(registros, { ...metadata, quantidadeProcessos: registros.length });
  return registros;
}

export function limparBase(): void {
  salvar([], null);
}

let baseAtiva: RegistroBase[] = [];
let metadataAtiva: BaseMetadata | null = null;

export function obterBaseAtiva(): RegistroBase[] {
  return [...baseAtiva];
}

function mesclarPorCnj(atuais: RegistroBase[], novos: RegistroBase[], metadata: BaseMetadata): RegistroBase[] {
  const porCnj = new Map(atuais.map((registro) => [registro.cnj, registro]));
  novos.forEach((registro) => porCnj.set(registro.cnj, { ...porCnj.get(registro.cnj), ...registro }));
  const registros = [...porCnj.values()];
  salvar(registros, { ...metadata, quantidadeProcessos: registros.length });
  return registros;
}

function salvar(registros: RegistroBase[], metadata: BaseMetadata | null): void {
  baseAtiva = [...registros];
  metadataAtiva = metadata;
}
