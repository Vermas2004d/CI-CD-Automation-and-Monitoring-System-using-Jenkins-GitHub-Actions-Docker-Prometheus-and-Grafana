pipeline {
    agent any
    environment {
        COMPOSE_PROJECT_NAME = "railway_app"
        DOCKER_BUILDKIT = "1"
        COMPOSE_DOCKER_CLI_BUILD = "1"
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                sh 'sudo chown -R $(id -u):$(id -g) .'
            }
        }

        stage('Inject Environment Variables') {
            steps {
                withCredentials([
                    file(credentialsId: 'backend-env-file', variable: 'BACKEND_ENV'),
                    file(credentialsId: 'frontend-env-file', variable: 'FRONTEND_ENV')
                ]) {
                    sh 'chmod u+w ./Backened ./Frontened/Railway'
                    sh 'cp "$BACKEND_ENV"  ./Backened/.env'
                    sh 'cp "$FRONTEND_ENV" ./Frontened/Railway/.env'
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

    post {
        always {
            sh 'rm -f ./Backened/.env ./Frontened/Railway/.env'
        }
    }
}

