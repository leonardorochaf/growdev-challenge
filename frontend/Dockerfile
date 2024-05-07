# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.12.1

FROM node:20.12.1-alpine

WORKDIR /usr/src/app

COPY ./package.json .
COPY ./package-lock.json .
COPY ./tsconfig.json .
COPY ./tsconfig.node.json .
COPY ./vite.config.mts .
COPY ./components.d.ts .
COPY ./index.html .
COPY ./typed-router.d.ts .

RUN npm ci

COPY ./src ./src
COPY ./public ./public

EXPOSE 3001

CMD npm run dev -- --host
