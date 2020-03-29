docker stop ${CONTAINER} 2>/dev/null
docker rm ${CONTAINER} 2>/dev/null
docker network create ${NETWORK}

source api/spawn_api.sh --detach --deamon
CONTAINER="quizmous"
INTERACTIVE="-it"
ENTRYPOINT="--entrypoint bash"
NETWORK='react-api'
docker network connect ${NETWORK} quizmous_api

while test $# -gt 0
do
    case "$1" in
        --rebuild)
            echo "Rebuilding image"
            docker build -t quizmous:dev .
            ;;
        --deamon)
            echo "Using ${CONTAINER} as a deamon"
            ENTRYPOINT=""
            ;;
        --non_interactive)
            echo "Using ${CONTAINER} with non-interactive mode"
            INTERACTIVE=""
            ;;
        --test)
            echo "Using ${CONTAINER} for tests only"
            ENTRYPOINT=""
            docker run ${INTERACTIVE} --network ${NETWORK} --name ${CONTAINER} -v ${PWD}:/usr/local/app -v /usr/local/app/node_modules -p 3000:3000 ${ENTRYPOINT} --rm quizmous:dev npm test
            RETVAL=$?
            exit ${RETVAL}
            ;;
        --*) echo "bad option $1"
            ;;
        *) echo "argument $1"
            ;;
    esac
    shift
done

docker run ${INTERACTIVE} --network ${NETWORK} --name ${CONTAINER} -v ${PWD}:/usr/local/app -v /usr/local/app/node_modules -p 3000:3000 ${ENTRYPOINT} --rm quizmous:dev