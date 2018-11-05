pipeline {
  agent any
  stages {
    stage('Clone') {
      steps {
        git branch: 'master', url: 'https://github.com/MattSegal/link-sharing-site.git'
      }
    }
    stage('Build') {
      steps {
        sh 'echo "Build"'
      }
    }
    stage('Test') {
      steps {
        sh 'echo "Test"'
      }
    }
    stage('Deploy') {
      steps {
        sh 'echo "Deploy"'
      }
    }
  }
}
