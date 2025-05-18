#!/bin/bash

echo "== Despliegue en Docker =="

START=$(date +%s)

docker build -t supermercado-chao .

docker run -d -p 8080:80 --name supermercado-chao supermercado-chao

END=$(date +%s)
echo "Tiempo total: $((END - START)) segundos"

docker stats supermercado-chao --no-stream
echo "Accede a tu app en: http://localhost:8080"


# ejecutable en docker "./deploy_docker.sh
