pipeline {
    agent { docker { image 'node:20.11.1-alpine3.19' } }
    stages {
        stage('test') {
            steps {
                sh 'node --version'
            }
        }

        stage('build') {
            steps {
                sh 'node --version'
            }
        }
    }
}