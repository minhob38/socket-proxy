FROM node:14.17.0-alpine
MAINTAINER minho <minhob38@gmail.com>
LABEL purpose=test
WORKDIR /usr/app
COPY . .
RUN npm install
EXPOSE 3000
CMD npm start