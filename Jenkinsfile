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
                // This grabs the secret files from Jenkins
                withCredentials([
                    file(credentialsId: 'backend-env-file', variable: 'BACKEND_ENV'),
                    file(credentialsId: 'frontend-env-file', variable: 'FRONTEND_ENV')
                ]) {
                    // Bypass the folder permission error by modifying docker-compose.yml 
                    // to read directly from the Jenkins temporary secret file paths!
                    sh "sed -i \"s|./Backened/.env|\\$BACKEND_ENV|g\" docker-compose.yml"
                    sh "sed -i \"s|./Frontened/Railway/.env|\\$FRONTEND_ENV|g\" docker-compose.yml"
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
