#!/bin/bash

echo "== Despliegue en Máquina Virtual =="

START=$(date +%s)

mkdir -p /tmp/supermercado-vm
cp index.html style.css TIC.js /tmp/supermercado-vm

cd /tmp/supermercado-vm
python3 -m http.server 8081 &

END=$(date +%s)
echo "Tiempo total: $((END - START)) segundos"

echo "Servidor corriendo en: http://localhost:8081"


# Para ejecutar el script "./deploy_vm.sh"