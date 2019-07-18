# Compile the node modules
FROM node:10-jessie AS backendbuilder

WORKDIR /usr/src/app
COPY ./package.json .
RUN npm install --production


# create the container to host the backend.
FROM node:10-jessie

WORKDIR /usr/src/app

COPY --from=backendbuilder /usr/src/app/node_modules ./node_modules
COPY . .
RUN rm -rf ./test
RUN rm -rf ./config/test.js

VOLUME [ "/usr/src/app/log" ]
VOLUME [ "/usr/src/app/defaults" ]
VOLUME [ "/usr/src/app/uploads" ]
VOLUME [ "/usr/src/app/SSL" ]

EXPOSE 3030
CMD [ "npm", "start" ]

