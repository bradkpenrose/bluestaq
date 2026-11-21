# FROM node:22-alpine
FROM node:22

WORKDIR /app

EXPOSE 80

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./tsconfig.json ./tsconfig.json

COPY ./src ./src

RUN npm install
RUN npm install -g typescript
RUN npm install -g tsx

RUN npm run build

CMD ["npm", "run", "start"]