# BambooPrice

Simulador de precificação para SaaS com foco em margem, ponto de equilíbrio e cenários de negócio.

## Nome
BambooPrice

## Descrição
BambooPrice é uma aplicação web para ajudar founders, gestores e times de produto a entender melhor como o preço de um SaaS impacta a saúde financeira do negócio.

O sistema permite comparar diferentes cenários de precificação, analisar custos fixos, custos variáveis, volume de clientes e tributos, e identificar o ponto em que a operação começa a ser sustentável.

Ele resolve um problema comum na etapa de criação e escala de produtos digitais: decidir um preço sem perder de vista rentabilidade, equilíbrio financeiro e previsibilidade operacional.

O projeto foi pensado para quem precisa tomar decisões de precificação com mais segurança, incluindo founders, empreendedores, estudantes e equipes de produto.

## Principais funcionalidades
- Criação de cenários de plano com nome e preço
- Cadastro de dados do negócio, como custo fixo e custo variável
- Cálculo de resultado mensal
- Análise de margem sobre a receita
- Identificação do ponto de equilíbrio em clientes
- Comparação entre diferentes preços e cenários
- Visualização gráfica da evolução do resultado por volume de clientes
- Interpretação textual do cenário para apoiar a decisão
- Reset completo da simulação

## Linguagens
- TypeScript
- HTML
- CSS

## Frameworks
- Nuxt 4
- Vue 3

## Engine / runtime
- Node.js

## Bibliotecas relevantes
- Tailwind CSS
- Chart.js
- vue-chartjs
- Vitest
- Nuxt Test Utils

## Requisitos
Antes de rodar o projeto, certifique-se de que seu ambiente possui:

- Node.js 18 ou superior
- npm ou outro gerenciador de pacotes compatível
- Navegador moderno

## Como instalar
Clone o repositório e instale as dependências:

```bash
git clone <https://github.com/Isaluh/saas-pricing.git>
cd saas-pricing
npm install
```

## Como executar
Para iniciar o ambiente de desenvolvimento:

```bash
npm run dev
```

A aplicação ficará disponível em:

```bash
http://localhost:3000
```

Para gerar uma build de produção:

```bash
npm run build
```

Para visualizar a build localmente:

```bash
npm run preview
```

## Como usar
1. Acesse a página inicial do sistema.
2. Preencha o nome e o preço do plano que deseja testar.
3. Adicione o cenário.
4. Informe os dados do negócio, como custos fixos, custo variável, clientes previstos e tributos.
5. O sistema calcula automaticamente o resultado e mostra indicadores importantes.
6. Compare os cenários e analise qual opção oferece melhor equilíbrio financeiro.
7. Use o gráfico e a leitura do cenário para tomar a decisão mais segura.

## Estrutura do projeto

```bash
saas-pricing/
├── app/
│   ├── assets/
│   ├── components/
│   ├── layouts/
│   ├── models/
│   └── pages/
├── public/
├── tests/
├── nuxt.config.ts
├── package.json
├── tsconfig.json
├── README.md
└── .gitignore
```

## Observações
Este projeto é um protótipo de simulação financeira para fins educacionais, de análise e tomada de decisão. Ele oferece uma base prática para entender a relação entre preço, custo e volume de clientes em um modelo SaaS.
