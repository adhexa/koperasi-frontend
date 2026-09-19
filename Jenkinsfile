// Jenkinsfile for Koperasi FE with Docker
pipeline {
    agent any // This means the pipeline will run on any available Jenkins agent

    environment {
        // Docker configuration
        DOCKER_IMAGE = "koperasi-fe"
        DOCKER_TAG = "${BUILD_NUMBER}"
        DOCKER_REGISTRY = "" // Add your registry if needed
        CONTAINER_NAME = "koperasi-fe-container"
        CONTAINER_PORT = "80"
        HOST_PORT = "80"
    }

    stages {
                        // Stage 1: Checkout Code
        stage('Checkout') {
            steps {
                echo 'Starting code checkout from repository...'
                // Checkout code from SCM configured in Jenkins job
                checkout scm

                // Display commit information for verification
                sh 'git log --oneline -1'

                // Show current directory structure (already in koperasi-fe)
                sh 'echo "Current directory:" && pwd && ls -la'
                sh 'echo "Checking for Dockerfile:" && ls -la | grep -i dockerfile || echo "Dockerfile not found"'
            }
        }

                                // Stage 2: Build Docker Image
        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image for frontend application...'
                script {
                    // Debug: Show current directory and contents (already in koperasi-fe)
                    sh 'echo "Current directory:" && pwd'
                    sh 'echo "Directory contents:" && ls -la'
                    sh 'echo "Looking for Dockerfile specifically:" && find . -name "Dockerfile" -type f'

                    // Check if Dockerfile exists and is readable
                    sh 'test -f Dockerfile && echo "Dockerfile exists and is a file" || echo "Dockerfile not found or not a file"'
                    sh 'test -r Dockerfile && echo "Dockerfile is readable" || echo "Dockerfile is not readable"'

                    // Build Docker image
                    sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                    sh "docker build -t ${DOCKER_IMAGE}:latest ."

                    // Verify image was built
                    sh "docker images | grep ${DOCKER_IMAGE}"
                }
            }
        }

        // Stage 3: Deploy with Docker (Local Deployment)
        stage('Deploy') {
            steps {
                echo 'Starting Docker deployment...'
                script {
                    // Stop and remove existing container if it exists
                    sh "docker stop ${CONTAINER_NAME} || echo 'Container was not running'"
                    sh "docker rm ${CONTAINER_NAME} || echo 'Container did not exist'"

                    // Run new container with the newly built image
                    sh """
                        docker run -d \\
                            --name ${CONTAINER_NAME} \\
                            --restart unless-stopped \\
                            -p ${HOST_PORT}:${CONTAINER_PORT} \\
                            ${DOCKER_IMAGE}:${DOCKER_TAG}
                    """

                    // Wait a moment for container to start
                    sh "sleep 5"

                    // Verify container is running
                    sh """
                        if docker ps | grep -q ${CONTAINER_NAME}; then
                            echo "✅ Koperasi FE container deployed and running successfully!"
                            echo "🌐 Application is available at: http://localhost/"
                            echo "📊 Container Status:"
                            docker ps | grep ${CONTAINER_NAME}
                        else
                            echo "❌ Container failed to start"
                            docker logs ${CONTAINER_NAME}
                            exit 1
                        fi
                    """

                    // Clean up old Docker images (keep last 3 builds)
                    sh """
                        echo "🧹 Cleaning up old Docker images..."
                        docker images ${DOCKER_IMAGE} --format "{{.Tag}}" | grep -E '^[0-9]+\$' | sort -nr | tail -n +4 | xargs -r -I {} docker rmi ${DOCKER_IMAGE}:{} || true
                    """
                }
                echo 'Docker deployment completed!'
            }
        }
    }

    // Post-build actions (after all stages complete)
    post {
        always {
            echo 'Pipeline completed - cleaning workspace...'
            script {
                // Clean up build images but keep the deployed one
                try {
                    sh "docker image prune -f || true"
                } catch (Exception e) {
                    echo "Warning: Failed to clean up Docker images: ${e.getMessage()}"
                }
            }
            // Clean workspace after build
            cleanWs()
        }
        success {
            echo '✅ Docker deployment successful!'
            echo "🐳 Container '${CONTAINER_NAME}' is running on port ${HOST_PORT}"
            echo "🌐 Application URL: http://192.168.128.66/"
            script {
                sh "echo '📊 Final Container Status:' && docker ps | grep ${CONTAINER_NAME} || echo 'Container not found'"
            }
        }
        failure {
            echo '❌ Docker deployment failed!'
            script {
                try {
                    sh "echo '🔍 Container logs:' && docker logs ${CONTAINER_NAME} || echo 'No container logs available'"
                    sh "echo '🔍 Available images:' && docker images | grep ${DOCKER_IMAGE}"
                } catch (Exception e) {
                    echo "Could not retrieve container information: ${e.getMessage()}"
                }
            }
        }
    }
}
