import type { RegistroBase } from './baseManager';

export interface ProcessoRepository {
  listar(): RegistroBase[];
  buscarPorCnj(cnj: string): RegistroBase | undefined;
  salvar(processo: RegistroBase): RegistroBase;
  substituir(processos: RegistroBase[]): void;
  removerTodos(): void;
}

export function criarProcessoRepository(): ProcessoRepository {
  throw new Error('Use o adaptador de infraestrutura do navegador ou API.');
}
