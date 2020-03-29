# quizmous
Anonymous Quiz React app

This project uses [Quizmous-API](https://www.github.com/szykol/quizmous-api) for backend-database communication.

## Prerequisties
You need to have docker installed on your system

Get api submodule
```
git submodule update --init --recursive
```

## Quick start

Launching the app using Unix systems is as easy as calling one command:

```
./spawn_app --rebuild --deamon
# or if it's built already
./spawn_app --deamon
# if you need to connect to container with bash shell as entrypiunt
./spawn_app
# run tests
./spawn_app --test
```

Which spawns API, Postgres, React app in their own containers.
