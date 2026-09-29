# Branch Strategy — RDCJ 2.0

- `main`: código aprovado e releases.
- `develop`: integração de mudanças aprovadas.
- `release/*`: estabilização e homologação de release candidate.
- `hotfix/*`: correções urgentes sobre `main`.
- `feature/*`: desenvolvimento de uma capacidade aprovada.
- `experiment/*`: provas controladas, sem garantia de incorporação.

Toda branch deve possuir issue/decisão associada e não pode alterar regras críticas sem aprovação.
