pipeline {
    agent {
        docker { 
            image 'node:20'  // Node.js LTS image with npm included
            args '-u root'   // optional, run container as root
        }
    }

    environment {
        DOCKER_HUB_REPO = 'bhavkorat/login-form'
        DOCKER_HUB_USER = credentials('dockerhub-username')  // set in Jenkins
        DOCKER_HUB_PASS = credentials('dockerhub-pass')      // set in Jenkins
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Bhav1910/Automation_orchestration.git',
                    credentialsId: 'github-credentials-id'
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
                sh '''
                    echo $DOCKER_HUB_PASS | docker login -u $DOCKER_HUB_USER --password-stdin
                    docker push $DOCKER_HUB_REPO:latest
                '''
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
