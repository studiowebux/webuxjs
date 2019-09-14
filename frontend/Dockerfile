# Compile the frontend react app
FROM node:10-jessie AS frontendbuilder

WORKDIR /home/node/app
COPY ./web/package.json .

## Need the development tools too.
RUN npm install

COPY ./web .

ENV NODE_ENV=production

RUN npm run build

# Create the frontend container with Nginx
FROM nginx:1.15.8-alpine

RUN apk add --update netcat-openbsd && rm -rf /var/cache/apk/*

COPY --from=frontendbuilder /home/node/app/dist /var/www
COPY ./nginx/nginx.conf /etc/nginx/conf.d/backend.conf
COPY ./nginx/certs/* /etc/nginx/certs/

EXPOSE 80
EXPOSE 443

ENTRYPOINT ["nginx", "-g", "daemon off;"]