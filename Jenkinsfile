pipeline {
    environment {
        NPM_CONFIG_CACHE = "${WORKSPACE}/.npm"
    }

    agent { docker { image 'node:20.11.1-alpine3.19' } }
    stages {
        stage ('checkout'){
            steps{
                checkout scm
            }
        }
        stage ('install modules'){
            steps{
                sh '''
                npm install --verbose -d 
                npm install --save classlist.js
                '''
            }
        }
        stage ('test'){
            steps{
                sh '''
                echo $FIREFOX_BIN
                ls -al $FIREFOX_BIN
                npm run ng test --browsers=FirefoxHeadless --watch=false
                '''
            }
            post {
                always {
                junit "test-results.xml"
               }
            }
        }

        stage('build') {
            steps {
                sh 'node --version'
            }
        }
    }
}