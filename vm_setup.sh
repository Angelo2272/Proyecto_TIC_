#!/bin/bash

echo "🚀 Setting up environment for benchmarking..."

# Actualización del sistema
sudo apt update && sudo apt upgrade -y

# Instalación de dependencias necesarias
sudo apt install -y python3 python3-pip sysbench docker.io git curl procps

# Actualización de pip y paquetes Python
pip3 install --upgrade pip
pip3 install jupyter matplotlib psutil

# Permitir al usuario usar Docker sin sudo
sudo usermod -aG docker $USER

echo "✅ Setup complete! Please restart your VM for Docker permissions to take effect."
echo "➡️ To start Jupyter, run: jupyter notebook"
