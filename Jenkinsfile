pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = "railway_app"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Inject Environment Variables') {
            steps {
                // This grabs the secret files from Jenkins and places them in the workspace
                withCredentials([
                    file(credentialsId: 'backend-env-file', variable: 'BACKEND_ENV'),
                    file(credentialsId: 'frontend-env-file', variable: 'FRONTEND_ENV')
                ]) {
                    sh 'cp $BACKEND_ENV Backened/.env'
                    sh 'cp $FRONTEND_ENV Frontened/Railway/.env'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    echo "Building Docker images using docker-compose..."
                    sh 'docker-compose build'
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                script {
                    echo "Deploying the stack..."
                    sh 'docker-compose down'
                    sh 'docker-compose up -d'
                }
            }
        }
    }
}
