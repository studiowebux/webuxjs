ARG ELK_VERSION=6.4.2

# https://github.com/elastic/kibana-docker
FROM docker.elastic.co/kibana/kibana-oss:${ELK_VERSION}

# Add your kibana plugins setup here
# Example: RUN kibana-plugin install <name|url>

COPY config/kibana.yml /usr/share/logstash/config/kibana.yml
