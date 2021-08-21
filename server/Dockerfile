# syntax=docker/dockerfile:1

FROM node:14
EXPOSE 3001

WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
RUN npm run build

CMD [ "node", "dist/index.js" ]
