pipeline {
    agent any

    environment {
        DOCKER_COMPOSE = 'docker compose'
    }

    stages {
        stage('Clone') {
            steps {
                git branch: 'main', url: 'https://github.com/Rimelabed/devops-project.git' 
            }
        }

        stage('Build Docker Images') {
            steps {
                sh "${DOCKER_COMPOSE} build"
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Lancement des tests backend'
                sh 'docker run --rm devops-ci-cd-backend pytest || true'
            }
        }

        stage('Deploy Containers') {
            steps {
                echo 'Déploiement des conteneurs'
                sh "${DOCKER_COMPOSE} down || true"
                sh "${DOCKER_COMPOSE} up -d"
            }
        }

        stage('Push to GitHub') {
            steps {
                sh '''
                git config --global user.name "Rimelabed"
                git config --global user.email "rimelabed10@example.com" 
                git add .
                git commit -m "Pipeline build and deploy"
                git push origin main || true
                '''
            }
        }
    }

    post {
        success {
            emailext (
                subject: "✅ Build succeeded on Jenkins", 
                body: "Everything is OK, your application has been successfully deployed", 
                to: "rimelabed10@gmail.com" 
            )
        }
        failure {
            emailext (
                subject: "❌ Build has failed on Jenkins", 
                body: "Build has failed. Verify the logs on Jenkins.", 
                to: "rimelabed10@gmail.com" 
            )
        }
    }
}
