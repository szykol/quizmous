CONTAINER="quizmous"
INTERACTIVE="-it"
ENTRYPOINT="--entrypoint bash"

docker stop ${CONTAINER} 2>/dev/null
docker rm ${CONTAINER} 2>/dev/null

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
            docker run ${INTERACTIVE} --name ${CONTAINER} -v ${PWD}:/usr/local/app -v /usr/local/app/node_modules -p 3000:3000 ${ENTRYPOINT} --rm quizmous:dev npm test
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

docker run ${INTERACTIVE} --name ${CONTAINER} -v ${PWD}:/usr/local/app -v /usr/local/app/node_modules -p 3000:3000 ${ENTRYPOINT} --rm quizmous:dev