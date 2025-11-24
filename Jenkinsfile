pipeline {
    agent any

   
    tools {
        nodejs 'NodeJS'   
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm  
            }
        }

        stage('Check Node & NPM') {
            steps {
                sh 'node -v'
                sh 'npm -v'
                sh 'npx -v'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install' 
                sh 'npx playwright install --with-deps'  
            }
        }

        stage('Run Playwright Tests') {
            steps {
                 sh 'mvn clean test'
            }
        }
    }

    post {
        always {
           
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            junit testResults: 'playwright-report/junit-results.xml', allowEmptyResults: true
        }
        success {
            echo 'Всё прошло успешно!'
        }
        failure {
            echo 'Тесты или сборка упали'
        }
    }
}
