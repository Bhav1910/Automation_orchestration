pipeline {
    agent any

    environment {
        DOCKER_HUB_REPO = 'bhavkorat/login-form'
        DOCKER_HUB_USER = credentials('bhavkorat')  // Jenkins credential ID
        DOCKER_HUB_PASS = credentials('KoRat@123')      // Jenkins credential ID
    }

    tags {
        stage('Checkout Code Explicitly') {
            steps {
                git branch: 'main', 
                    credentialsId: 'bhavkorat', 
                    url: 'https://github.com/Bhav1910/Automation_orchestration.git'
            }
        }

        stage('Build React App') {
            agent {
                docker {
                    image 'node:20'   // Node.js image with npm
                    args '-u root'    // run as root inside container
                }
            }
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

        stage('Push Docker Image') {
            steps {
                sh '''
                    echo $DOCKER_HUB_PASS | docker login -u $DOCKER_HUB_USER --password-stdin
                    docker push $DOCKER_HUB_REPO:latest
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                // Apply deployment & service from k8s folder
                sh 'kubectl apply -f k8s/deployment.yaml'
                sh 'kubectl apply -f k8s/service.yaml'
            }
        }
    }
}
