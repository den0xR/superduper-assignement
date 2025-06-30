FROM node:22.17-alpine

WORKDIR /app

COPY package.json .

RUN npm install
RUN apk add --no-cache bash

RUN npm i -g serve

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

COPY . .

RUN npm run build

EXPOSE 4173

CMD [ "serve", "-s", "dist", "-l", "4173" ]