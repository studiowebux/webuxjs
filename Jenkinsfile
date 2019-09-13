pipeline {
    agent { label 'docker' }

    stages {
        stage('Build image') {
            parallel {
                stage('Build Frontend') {
                    steps { sh 'docker build -f ./frontend/Dockerfile -t webuxjs-frontend ./frontend' }
                }

                stage('Build Backend') {
                    steps { sh 'docker build -f ./backend/Dockerfile -t webuxjs-backend ./backend' }
                }

                stage('Build Elastic Search') {
                    steps { sh 'docker build -f ./ELK/elasticsearch/Dockerfile -t webuxjs-elasticsearch ./ELK/elasticsearch' }
                }

                stage('Build Kibana') {
                    steps { sh 'docker build -f ./ELK/kibana/Dockerfile -t webuxjs-kibana ./ELK/kibana' }
                }

                stage('Build Logstash') {
                    steps { sh 'docker build -f ./ELK/logstash/Dockerfile -t webuxjs-logstah ./ELK/logstah' }
                }
            }
        }

        stage('Export Image') {
            parallel {
                stage('Export Frontend') {
                    steps { sh 'docker save webuxjs-frontend:latest > "webuxjs-frontend.tar"' }
                }

                stage('Export Backend') {
                    steps { sh 'docker save webuxjs-backend:latest > "webuxjs-backend.tar"' }
                }

                stage('Export Elastic Search') {
                    steps { sh 'docker save webuxjs-elasticsearch:latest > "webuxjs-elasticsearch.tar"' }
                }

                stage('Export Kibana') {
                    steps { sh 'docker save webuxjs-kibana:latest > "webuxjs-kibana.tar"' }
                }

                stage('Export Logstash') {
                    steps { sh 'docker save webuxjs-logstash:latest > "webuxjs-logstash.tar"' }
                }
            }
        }

        stage("Archive") {
            steps {
                archiveArtifacts(
                    artifacts: 'webuxjs-*.tar',
                    onlyIfSuccessful: true
                )
            }
        }
    }
}