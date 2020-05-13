pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Установка зависимостей'
                sh '''
                    docker run \
                        --rm \
                        --workdir="/app" \
                        --user=${UID}:${GID} \
                        --volume="$(pwd)/src:/app:rw" \
                        ci.chulakov.ru:5000/chulakov/node:latest yarn install --global-folder /tmp/ --cache-folder /tmp/ --non-interactive --ignore-optional --frozen-lockfile
                '''
                echo 'Сборка проекта'
                sh '''
                    docker run \
                        --rm \
                        --workdir="/app" \
                        --user=${UID}:${GID} \
                        --volume="$(pwd)/src:/app:rw" \
                        ci.chulakov.ru:5000/chulakov/node:latest yarn build
                '''
            }
        }
        stage('StopAll') {
            steps {
                echo 'Остановка существующих контейнеров'
                sh '''
                    if [ "$(docker ps -qa -f name=${VIRTUAL_HOST}-nginx)" ]; then
                        if [ "$(docker ps -aq -f status=running -f name=${VIRTUAL_HOST}-nginx)" ]; then
                            docker stop ${VIRTUAL_HOST}-nginx
                        fi
                        docker rm ${VIRTUAL_HOST}-nginx
                    fi
                    if [ "$(docker ps -qa -f name=${VIRTUAL_HOST}-app)" ]; then
                        if [ "$(docker ps -aq -f status=running -f name=${VIRTUAL_HOST}-app)" ]; then
                            docker stop ${VIRTUAL_HOST}-app
                        fi
                        docker rm ${VIRTUAL_HOST}-app
                    fi
                '''
                echo 'Удаление старой именной сети, если она существует'
                sh '''
                    if [ "$(docker network ls -q -f name=${VIRTUAL_HOST}-backend-network)" ]; then
                        docker network rm ${VIRTUAL_HOST}-backend-network
                    fi
                '''
            }
        }
        stage('Runtime') {
            steps {
                echo 'Создание новой именной сети'
                sh '''
                    docker network create ${VIRTUAL_HOST}-backend-network
                '''
                echo 'Запуск приложения'
                sh '''
                    docker run \
                        -itd \
                        --name="${VIRTUAL_HOST}-app" \
                        --restart=on-failure:10 \
                        --workdir="/app" \
                        --user=${UID}:${GID} \
                        --log-driver=json-file \
                        --log-opt max-file=2 \
                        --log-opt max-size=5m \
                        --volume="$(pwd)/src:/app:rw" \
                        -e "VIRTUAL_HOST=${VIRTUAL_HOST}" \
                        -e "API_URL=${API_URL}" \
                        -e "PORT=${PORT}" \
                        -e "NEXT_TELEMETRY_DISABLED=${NEXT_TELEMETRY_DISABLED}" \
                        --network="${VIRTUAL_HOST}-backend-network" \
                        ci.chulakov.ru:5000/chulakov/node:latest yarn start
                '''
                echo 'Запуск проксирующего NGINX-a'
                sh '''
                    docker run \
                        -itd \
                        --name="${VIRTUAL_HOST}-nginx" \
                        --restart=on-failure:10 \
                        --log-driver=json-file \
                        --log-opt max-file=2 \
                        --log-opt max-size=5m \
                        --volume="$(pwd)/src:/app:ro" \
                        -e "REMOTE_HOST=${VIRTUAL_HOST}-app" \
                        -e "REMOTE_PORT=${PORT}" \
                        -e "ROOT_DIR=/app" \
                        -e "VIRTUAL_HOST=${VIRTUAL_HOST}" \
                        -e "LETSENCRYPT_HOST=${VIRTUAL_HOST}" \
                        --network="${VIRTUAL_HOST}-backend-network" \
                        ci.chulakov.ru:5000/chulakov/nginx-proxy:latest
                '''
                echo 'Подключаем NGINX к внешней сети'
                sh '''
                    docker network connect ${EXTERNAL_NETWORK_NAME} ${VIRTUAL_HOST}-nginx
                '''
            }
        }
    }

    environment {
        GIT_LAST_LOG = sh(script: 'git log -1', , returnStdout: true).trim()
        GIT_LAST_COMMITER  = sh(script: 'git log -1 | grep \'Author\' | awk -F "<" \'{print $2}\'| sed \'s/>//\' ', , returnStdout: true).trim()
    }
    
    post {
        success {
                mail to: "${GIT_LAST_COMMITER}, ${EMAIL_QA}",
                subject: "Сборка #${BUILD_NUMBER} проекта '${JOB_NAME}' завершена успешно",
                body: "Информация о сборке проекта доступна по ссылке ${BUILD_URL}  \n   ${GIT_COMMIT} \n ${GIT_LAST_LOG}"
        }
        failure {
                mail to: "${GIT_LAST_COMMITER}, ${EMAIL_QA}",
                subject: "Сборка #${BUILD_NUMBER} проекта '${JOB_NAME}' провалена",
                body: "Информация о сборке проекта доступна по ссылке ${BUILD_URL}  \n   ${GIT_COMMIT} \n ${GIT_LAST_LOG}"
        }
    }
}


