# scripts/Dockerfile
FROM nginx:alpine

RUN apk add --no-cache sysbench

COPY . /usr/share/nginx/html
