# GCP 기반 Proxy Server 환경 구축하기
## GCP Instance

## Docker Install

## Nodejs Install

## Static File (React) Build
```sh
git clone https://github.com/minhob38/socket-proxy ~/src &&
cd ~/src/client &&
npm install &&
npm run build
```

## Nodejs
### Nodejs Server Image Build / Container Run
```sh
# 기존 clone한 저장소가 있다면, rm -rf ~/src
sudo docker build -t nodejs-server:latest ~/src/server &&
sudo docker run -d -p 3001:3001 --name server-a nodejs-server:latest
#sudo docker run -d -p 3002:3001 --name server-b nodejs-server:latest
#sudo docker run -d -p 3003:3001 --name server-c nodejs-server:latest
```

## Nginx
### Nginx Webserver Image Pull / Contaienr Run
```sh
sudo docker pull nginx:latest &&
sudo docker run -d -p 8080:80 -v ~/src/client/build:/etc/nginx/statics --name webserver nginx:latest &&
```

## Nginx Reload
```sh
sudo docker cp ~/config/nginx.conf webserver:/etc/nginx &&
sudo docker exec -it webserver /bin/sh
```
