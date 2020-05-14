pipeline {
    agent any

    stages {
        stage('Install') {
            steps {
                echo 'Установка зависимостей'
                dir('docker/test/') {
                    sh '''
                        make install
                    '''
                }
            }
        }
        stage('Build') {
            steps {
                echo 'Сборка проекта'
                dir('docker/test/') {
                    sh '''
                        make build
                    '''
                }
            }
        }
        stage('StopAll') {
            steps {
                echo 'Остановка существующих контейнеров'
                dir('docker/test/') {
                    sh '''
                        make down
                    '''
                }
            }
        }
        stage('Runtime') {
            steps {
                echo 'Запуск сервисов'
                dir('docker/test/') {
                    sh '''
                        make up
                    '''
                }
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
