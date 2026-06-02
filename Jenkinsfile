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

        stage('Verify Zip') {
            steps {
                bat 'dir deployment.zip'
            }
        }

        stage('Deploy') {
            steps {

                withCredentials([
                    string(credentialsId: 'aws-access-key', variable: 'AWS_ACCESS_KEY_ID'),
                    string(credentialsId: 'aws-secret-key', variable: 'AWS_SECRET_ACCESS_KEY')
                ]) {

                    bat '''
                    aws lambda update-function-code ^
                    --function-name %FUNCTION_NAME% ^
                    --zip-file fileb://deployment.zip ^
                    --region ap-south-1
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'Lambda deployment successful'
        }

        failure {
            echo 'Lambda deployment failed'
        }
    }
}