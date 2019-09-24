# Install the node modules
FROM node:10-jessie AS backendbuilder

WORKDIR /usr/src/app
COPY ./package.json .
RUN apt install -y libvips-dev

RUN npm install --production


# create the container to host the backend.
FROM node:10-jessie

WORKDIR /usr/src/app

COPY --from=backendbuilder /usr/src/app/node_modules ./node_modules
COPY . .



VOLUME [ "/usr/src/app/log" ]
VOLUME [ "/usr/src/app/defaults" ]
VOLUME [ "/usr/src/app/uploads" ]
VOLUME [ "/usr/src/app/locales" ]

EXPOSE 3030
CMD [ "npm", "start" ]

