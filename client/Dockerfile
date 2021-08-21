# syntax=docker/dockerfile:1

FROM node:14

WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]

# TODO Replace development server with production build. Issue: How to make production build aware of runtime
#      environment variables like REACT_APP_API_BASE_URL, which can be set in docker-compose.yml?
#
#   EXPOSE 5000
#   RUN npm install -g serve
#   RUN npm run build
#   CMD [ "serve", "-s", "build" ]
