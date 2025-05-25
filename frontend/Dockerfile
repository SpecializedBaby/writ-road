FROM node:20-alpine3.21
LABEL maintainer="specialized8393@gmail.com"

WORKDIR /app

ENV NODE_ENV=development

COPY . .
RUN npm install

EXPOSE 3000
