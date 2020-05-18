# quizmous
Anonymous Quiz React app

This project uses [Quizmous-API](https://www.github.com/szykol/quizmous-api) for backend-database communication.

## Prerequisties
You need to have docker and docker-compose installed on your system

Get api submodule
```
git submodule update --init --recursive
```

## Quick start
```
docker-compose up -d
```

Which builds and spawns API, Postgres and React app in their own containers.

## Launch the app in browser
Open up the browser and type localhost:3000

## Env variables
You can also launch docker-compose with bunch of env variables set:

### Attach quizmous_api without starting API
```
# this launches detached react app and quizmous_api container without starting up the API
API_TTY="true" API_ENTRYPOINT="/bin/bash" docker-compose up

# then you can attach to quizmous_api and launch API manually or connect to postgres
docker attach quizmous_api

# on container
./run.py # launches API
psql     # connects to Postgres container
```
### Attach to bash in react container

```
REACT_ENTRYPOINT="/bin/bash" REACT_TTY=true REACT_COMMAND="" docker-compose up -d

# then you can attach to react container and launch app manually
docker attach react
# on container
npm start # launches the app
```
### Launch react tests
```
# that launches tests
REACT_COMMAND="npm test" docker-compose up react
```