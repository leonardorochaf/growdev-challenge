## Decisão arquitetural

1. Validação

Nesta camada, concentramos a lógica responsável por validar os dados de entrada antes de qualquer processamento adicional.

2. Controller

A camada do controller atua como ponto de entrada para as requisições recebidas pelo sistema. Aqui, tomei a decisão de manter a lógica do controller o mais enxuta possível, delegando a maioria das operações para a camada de serviço. O controller é responsável por interpretar as requisições HTTP, extrair os parâmetros necessários e chamar os métodos apropriados na camada de serviço.

3. Service

A camada de serviço contém a lógica de negócios principal da aplicação. Aqui, decidi concentrar a maior parte da lógica de processamento e manipulação de dados. Os serviços são responsáveis por coordenar as operações entre as diferentes entidades do sistema, interagindo com a camada de repositório para acessar e persistir dados.

4. Repository

Na camada de repositório, se concentra as operações de acesso e persistência de dados. Decidi separar claramente a lógica de acesso a dados do restante do sistema, utilizando padrões de acesso a dados como o padrão Repository. Isso nos permite abstrair os detalhes específicos do armazenamento de dados e fornecer uma interface consistente para acessar e manipular os dados em diferentes fontes de dados.

## Requisitos

- [x] Cadastrar estudante
- [x] Listar estudantes
- [x] Filtrar estudantes
- [x] Editar estudante
- [x] Excluir estudante
- [x] Autenticação e autorização
- [x] Testes

## Melhorias

- Testes e2e e de componentes no frontend

## Bibliotecas

### Backend

Dependencies

- bcrypt
- cls-rtracer
- cors
- express
- jsonwebtoken
- pg
- pino
- reflect-metadata
- swagger-ui-express
- typeorm
- zod

Dev dependencies

- @jest-mock/express
- @types/bcrypt
- @types/cors
- @types/express
- @types/jest
- @types/jsonwebtoken
- @types/pg
- @types/supertest
- @types/swagger-ui-express
- @typescript-eslint/eslint-plugin
- @typescript-eslint/parser
- eslint-config-airbnb-typescript
- jest
- pg-mem
- supertest
- ts-jest
- ts-node-dev
- typescript

### Frontend

Dependencies

- @mdi/font
- axios
- core-js
- maska
- roboto-fontface
- vue
- vue-toastification
- vuetify

Dev dependencies

- @babel/types
- @types/node
- @vitejs/plugin-vue
- @vue/eslint-config-typescript
- eslint
- eslint-config-standard
- eslint-plugin-import
- eslint-plugin-n
- eslint-plugin-node
- eslint-plugin-promise
- eslint-plugin-vue
- sass
- typescript
- unplugin-fonts
- unplugin-vue-components
- unplugin-vue-router
- vite
- vite-plugin-vuetify
- vue-router
- vue-tsc
