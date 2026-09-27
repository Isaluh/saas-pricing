export interface Cenario {
    id: number;
    nome: string;
    preco: number | null;
}

export interface Dados {
    custoFixo: string;
    custoVariavel: string;
    clientesPrevistos: number | null;
    tributos: string;
}