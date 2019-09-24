pipeline {
    agent { label 'docker' }

    stages {
        stage('Build image') {
            parallel {
                stage('Build Frontend') {
                    steps { sh 'docker build --no-cache -f ./frontend/Dockerfile -t webuxjs-frontend ./frontend' }
                }

                stage('Build Backend') {
                    steps { sh 'docker build --no-cache -f ./backend/Dockerfile -t webuxjs-backend ./backend' }
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

        stage('Push Image') {
            parallel {
                stage('Push Frontend') {
                    steps { sh 'docker tag webuxjs-frontend hub.webux.lab/webuxjs-frontend:latest; docker push hub.webux.lab/webuxjs-frontend:latest' }
                }

                stage('Push Backend') {
                    steps { sh 'docker tag webuxjs-backend hub.webux.lab/webuxjs-backend:latest; docker push hub.webux.lab/webuxjs-backend:latest' }
                }

                stage('Push Elastic Search') {
                    steps { sh 'docker tag webuxjs-elasticsearch hub.webux.lab/webuxjs-elasticsearch:latest; docker push hub.webux.lab/webuxjs-elasticsearch:latest' }
                }

                stage('Push Kibana') {
                    steps { sh 'docker tag webuxjs-kibana hub.webux.lab/webuxjs-kibana:latest; docker push hub.webux.lab/webuxjs-kibana:latest' }
                }

                stage('Push Logstash') {
                    steps { sh 'docker tag webuxjs-logstash hub.webux.lab/webuxjs-logstash:latest; docker push hub.webux.lab/webuxjs-logstash:latest' }
                }
            }
        }

        // stage('Export Image') {
        //     parallel {
        //         stage('Export Frontend') {
        //             steps { sh 'docker save --output="webuxjs-frontend.tar" webuxjs-frontend' }
        //         }

        //         stage('Export Backend') {
        //             steps { sh 'docker save --output="webuxjs-backend.tar" webuxjs-backend' }
        //         }

        //         stage('Export Elastic Search') {
        //             steps { sh 'docker save --output="webuxjs-elasticsearch.tar" webuxjs-elasticsearch' }
        //         }

        //         stage('Export Kibana') {
        //             steps { sh 'docker save --output="webuxjs-kibana.tar" webuxjs-kibana' }
        //         }

        //         stage('Export Logstash') {
        //             steps { sh 'docker save --output="webuxjs-logstash.tar" webuxjs-logstash' }
        //         }
        //     }
        // }

        // stage("Archive") {
        //     steps {
        //         archiveArtifacts(
        //             artifacts: 'webuxjs-*.tar',
        //             onlyIfSuccessful: true
        //         )
        //     }
        // }
    }
}