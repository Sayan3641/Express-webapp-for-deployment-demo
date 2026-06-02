pipeline {

    agent any

    environment {
        FUNCTION_NAME = 'express-demo'
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Sayan3641/Express-webapp-for-deployment-demo.git'
            }
        }

        stage('Install') {
            steps {
                bat 'npm install'
            }
        }

        stage('Verify AWS') {
            steps {
                bat 'aws sts get-caller-identity'
            }
        }

        stage('Package') {
            steps {
                powershell '''
                Compress-Archive `
                -Path app.js,lambda.js,package.json,node_modules `
                -DestinationPath deployment.zip `
                -Force
                '''
            }
        }

        stage('Deploy') {
            steps {
                bat '''
                aws lambda update-function-code ^
                --function-name %FUNCTION_NAME% ^
                --zip-file fileb://deployment.zip
                '''
            }
        }
    }
}