pipeline {

    agent any

    environment {
        FUNCTION_NAME = 'express-demo'
    }

    stages {

        stage('Install') {
            steps {
                bat 'npm install'
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

                withCredentials([
                    [$class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-creds']
                ]) {

                    bat '''
                    aws lambda update-function-code ^
                    --function-name %FUNCTION_NAME% ^
                    --zip-file fileb://deployment.zip
                    '''
                }
            }
        }
    }
}