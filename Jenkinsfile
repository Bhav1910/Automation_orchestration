pipeline {
    agent any

    environment {
        DOCKER_HUB_REPO = 'bhavkorat/login-form'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git 'https://github.com/Bhav1910/Automation_orchestration.git'
            }
        }

        stage('Build App') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_HUB_REPO:latest .'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([string(credentialsId: 'dockerhub-pass', variable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login -u yourusername --password-stdin'
                    sh 'docker push $DOCKER_HUB_REPO:latest'
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f deployment.yaml'
                sh 'kubectl apply -f service.yaml'
            }
        }
    }
}
