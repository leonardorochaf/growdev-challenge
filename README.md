# Desafio Growdev

## Sobre

Este projeto é uma solução para o desafio proposto pela instituição Edtech, que requer o desenvolvimento de uma aplicação para gerenciar a matrícula de alunos na turma de Programação Web.

## Principais tecnologias utilizadas

- [Node](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [Postgres](https://www.postgresql.org/)
- [Express](https://expressjs.com/pt-br/)
- [Typeorm](https://typeorm.io/)
- [Zod](https://zod.dev/)
- [Openapi/Swagger](https://swagger.io/)
- [Pino](https://github.com/pinojs/pino)
- [Jest](https://jestjs.io/pt-BR/)
- [Vue](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Vuetify](https://vuetifyjs.com/en/)
- [Axios](https://axios-http.com/ptbr/docs/intro)

## Padrões de projeto utlizados

- [MVC](https://pt.wikipedia.org/wiki/MVC)
- [SOLID](https://pt.wikipedia.org/wiki/SOLID)
- [Repository](https://martinfowler.com/eaaCatalog/repository.html)
- [Decorator](https://refactoring.guru/design-patterns/decorator)
- [Singleton](https://refactoring.guru/design-patterns/singleton)

## Executando a aplicação

```bash
# Clone o repositório
$ git clone git@github.com:leonardorochaf/growdev-challenge.git
# Entre na pasta da aplicação
$ cd growdev-challenge
```

Existem duas maneiras de executar a aplicação: localmente e usando docker.

### Observações

- Já existem dois usuário pré-cadastrados no aplicação
  1. Usuário: admin - Senha: teste123
  2. Usuário: student - Senha: teste123
- O usuário admin possui autorização para acessar a aplicação
- O usuário student não possui autorização para acessar a aplicação

### Pré-requisitos

1. Localmente

- Node v.20>
- NPM
- Postgres

```bash
# Entre na pasta do backend e instale as dependências
$ cd backend && npm ci

Execute o script seed.sql para criar e popular as tabelas necessárias do banco de dados

Altere o arquivo env.ts dentro de src/config para usar suas credencias do postgres

# Execute o backend
$ npm run dev

# Entre na pasta do frontend e instale as dependências
$ cd frontend && npm ci
# Execute o frontend
$ npm run dev

Visite localhost:3001 no seu navegador
```

2. Docker

- Docker
- Docker compose

```bash
# Execute o arquivo do docker-compose
$ docker compose up -d --build

Visite localhost:3001 no seu navegador
```

## Executando testes

```bash
cd backend && npm test
```

## Documentação

Com a aplicação de backend rodando, acesse localhost:3000/docs no seu navegador para acessar a documentação com swagger
