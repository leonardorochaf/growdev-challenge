# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.12.1

FROM node:20.12.1-alpine

WORKDIR /usr/src/app

COPY ./package.json .
COPY ./package-lock.json .
COPY ./tsconfig.json .

RUN npm ci

COPY ./src ./src

EXPOSE 3000

CMD npm run dev
