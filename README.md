# Courses

Planner for university.

## Setup (with Docker)

### Get it

```bash
git clone https://github.com/operrathor/courses.git
cd courses
```

### Build it

```bash
docker-compose build
```

### Run it

```bash
docker-compose up -d
```

If your `docker.sock` location differs from `/var/run/docker.sock` (as in rootless mode or on Windows), you can adjust `DOCKER_SOCK` in `.env` or simply prepend the environment variable in the following way:

```bash
DOCKER_SOCK=/run/user/1000/docker.sock docker-compose up -d
```

Runs on [port 8081](http://localhost:8081/) by default. Can be changed via `COURSES_PROXY_PORT` environment variable.

## Setup (without Docker)

### Get it

```bash
git clone https://github.com/operrathor/courses.git
cd courses
```

### Build and run it

1. In one terminal, `cd` into `server` and [install and run the server](https://github.com/operrathor/courses/tree/main/server)
2. In another terminal, `cd` into `client` and [install and run the client](https://github.com/operrathor/courses/tree/main/client)

## Screenshot

![](./screenshot.png)
