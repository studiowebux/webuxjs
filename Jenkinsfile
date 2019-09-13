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
                    steps { sh 'docker build -f ./ELK/logstash/Dockerfile -t webuxjs-logstash ./ELK/logstash' }
                }
            }
        }

        stage('Export Image') {
            parallel {
                stage('Export Frontend') {
                    steps { sh 'docker save --output="webuxjs-frontend.tar" webuxjs-frontend' }
                }

                stage('Export Backend') {
                    steps { sh 'docker save --output="webuxjs-backend.tar" webuxjs-backend' }
                }

                stage('Export Elastic Search') {
                    steps { sh 'docker save --output="webuxjs-elasticsearch.tar" webuxjs-elasticsearch' }
                }

                stage('Export Kibana') {
                    steps { sh 'docker save --output="webuxjs-kibana.tar" webuxjs-kibana' }
                }

                stage('Export Logstash') {
                    steps { sh 'docker save --output="webuxjs-logstash.tar" webuxjs-logstash' }
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