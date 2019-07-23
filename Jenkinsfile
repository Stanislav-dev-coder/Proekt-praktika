pipeline {
    agent any

    stages {
        
        stage('Build') {
             environment {
               GIT_LAST_LOG = sh(script: 'git log -1', , returnStdout: true).trim()
            GIT_LAST_COMMITER  = sh(script: 'git log -1 | grep \'Author\' | awk -F "<" \'{print $2}\'| sed \'s/>//\' ', , returnStdout: true).trim()
            EMAIL_QA = 'eduard.veykum@chulakov.ru'
           }
            steps { 
                sh label: '', script: '''wget 192.168.10.21/$JOB_NAME.env -O .env
wget 192.168.10.21/dc.yml -O build-docker-compose.yml
 awk '{print $0 "\\""}' .env > .jenv
 sed -i "s~=~=\\"~" .jenv
'''

                echo sh(script: 'env|sort', returnStdout: true)
                echo 'Building..'
 sh label: '', script: '''
. ./.env


docker-compose -f build-docker-compose.yml up 

            if [ -e Dockerfile ]; then
 echo "Dockerfile exist"
         sudo docker build . -t ci.chulakov.ru:5000/$JOB_NAME
            else
               touch Dockerfile
                echo "FROM ci.chulakov.ru:5000/adpm2:latest" >> Dockerfile
                echo "ADD ./ /var/www/html" >> Dockerfile
                echo "RUN mkdir /var/www/log/" >> Dockerfile
                    sudo docker build . -t ci.chulakov.ru:5000/$JOB_NAME
            fi

            docker push ci.chulakov.ru:5000/$JOB_NAME

            if [ -e /var/www/html/kube/"$JOB_NAME".yml ]; then
                echo "yml - ready"
            else
            echo "END JOB $JOB_NAME"
            
            DEPNAMES=depnametpl
            
cat <<EOF> /var/www/html/kube/"$JOB_NAME".yml
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: $DEPNAMES
spec:
  replicas: 2
  minReadySeconds: 10
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
      maxSurge: 1
  template:
    metadata:
      labels:
        app: $DEPNAMES
    spec:
      containers:
        - name: $DEPNAMES
          image: ci.chulakov.ru:5000/$JOB_NAME
          imagePullPolicy: Always
          env:
            - name: SKIP_CHOWN
              value: "1"
            - name: SKIP_COMPOSER
              value: "1"
            - name: VIRTUAL_HOST
              value: "$JOB_NAME"
            - name: HOT_RELOAD_PORT
              value: "$HOT_RELOAD_PORT"
            - name: PORT
              value: "$PORT"
            - name: API_URL
              value: "$API_URL"
          ports:
            - containerPort: 80
---
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: $DEPNAMES
spec:
  rules:
    - host: $JOB_NAME
      http:
        paths:
          - path: /
            backend:
              serviceName: $DEPNAMES
              servicePort: 80
---
apiVersion: v1
kind: Service
metadata:
  labels:
    name: $DEPNAMES
  name: $DEPNAMES
spec:
  ports:
    # The port that this service should serve on.
    - port: 80
  # Label keys and values that must match in order to receive traffic for this service.
  selector:
    app: $DEPNAMES
  type: ClusterIP
  
EOF

fi 
   '''

            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Informing') {
            environment {
               GIT_LAST_LOG = sh(script: 'git log -1', , returnStdout: true).trim()
            GIT_LAST_COMMITER  = sh(script: 'git log -1 | grep \'Author\' | awk -F "<" \'{print $2}\'| sed \'s/>//\' ', , returnStdout: true).trim()
            EMAIL_QA = 'eduard.veykum@chulakov.ru'
           }
            steps {
                mail to: "${GIT_LAST_COMMITER}, ${EMAIL_QA}",
    subject: "Проект '${JOB_NAME}' сборка (${BUILD_NUMBER}) ",
    body: "Информация о сборке проекта доступна поссылке ${BUILD_URL}  \n   ${GIT_COMMIT} \n ${GIT_LAST_LOG}  "
            }
        }
    }
}




