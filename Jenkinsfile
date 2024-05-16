pipeline {
    agent any

    environment {
        NPM_CONFIG_CACHE = "${WORKSPACE}/.npm"
    }


    stages {
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
                npm run ng test --browsers=FirefoxHeadless --watch=false
                '''
            }
        }
        stage ('cypress.e2e'){
            steps{
                sh '''
                npx cypress run
                '''
            }
        }
        stage('build') {
            steps {
                sh 'node --version'
            }
        }
    }
}