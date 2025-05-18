#!/bin/bash

echo "🐳 Setting up Docker environment for benchmarking..."

# Actualización del sistema
sudo apt update && sudo apt upgrade -y

# Instalación de herramientas necesarias (sin Docker aquí porque ya estás en Docker/WSL2)
sudo apt install -y python3 python3-pip sysbench git curl procps

# Instalar Jupyter y librerías de benchmarking
pip3 install --upgrade pip
pip3 install jupyter matplotlib psutil

echo "✅ Docker/WSL2 setup complete!"
echo "➡️ To start Jupyter Notebook, run: jupyter notebook --ip=0.0.0.0 --port=8888 --no-browser"
echo "➡️ To start Docker container, run: docker run -d -p 8080:80 --name my_container my_image"