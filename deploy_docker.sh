#!/bin/bash

echo "== Despliegue en Docker =="

# Tomamos el tiempo de inicio
START=$(date +%s)

# Construir la imagen de Docker
docker build -t supermercado-chao .

# Ejecutar el contenedor (servir la app web en el puerto 8080 y ejecutar monitoreo en segundo plano)
docker run -d -p 8080:80 -p 8081:8080 --name supermercado-chao supermercado-chao

# Tomamos el tiempo de finalización
END=$(date +%s)

# Mostrar el tiempo total
echo "Tiempo total: $((END - START)) segundos"

# Ver las estadísticas del contenedor
docker stats supermercado-chao --no-stream

# Mostrar la URL de acceso a la aplicación
echo "Accede a tu app en: http://localhost:8080"
