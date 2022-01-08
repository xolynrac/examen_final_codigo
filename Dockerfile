FROM node:14.18.0 as build

WORKDIR /app

ADD package.json /app/package.json

RUN npm install

RUN npm i

ADD . /app

ENV PORT 3000

EXPOSE 3000

CMD ["npm","run","start:prod"]