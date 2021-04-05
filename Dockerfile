FROM node:14-alpine
EXPOSE 8000

WORKDIR /usr/src
COPY ./package.json .
COPY . ./
RUN npm install