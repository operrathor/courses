# syntax=docker/dockerfile:1

FROM node:14

WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
RUN npm install -g serve
COPY . .

EXPOSE 5000
# We build the application on container start so that React takes runtime environment variables into account.
CMD npm run build && serve -s build
