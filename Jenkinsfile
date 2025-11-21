pipeline {
    agent any

    environment {
        NODE_HOME = tool name: 'NodeJS', type: 'NodeJSInstallation' 
        PATH = "${env.NODE_HOME}/bin:${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'git@github.com:viqa123/Tests.git',
                    credentialsId: 'github-ssh'  
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
                sh 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright test'
            }
        }

        stage('Archive Reports') {
            steps {
                archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
                junit 'playwright-report/**/*.xml'  
            }
        }
    }

    post {
        success {
            echo 'Build and tests succeeded!'
        }
        failure {
            echo 'Build or tests failed!'
        }
    }
}
