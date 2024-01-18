FROM node:21-alpine3.18

ENV MONGO_DB_USERNAME=root \
    MONGO_DB_PWD=password

RUN mkdir -p /home/app

COPY . /home/app

CMD ["node", "home/app/app.js"]