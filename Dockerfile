FROM python:3.9-slim

# Instalar Nginx, gcc, y python3-dev
RUN apt-get update && apt-get install -y \
    nginx \
    gcc \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# Instalar psutil
RUN pip install psutil

# Copiar configuración personalizada de Nginx
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Crear directorios necesarios
RUN mkdir -p /usr/share/nginx/html /app/results

# Copiar archivos estáticos y el script Python
COPY comparison/ /usr/share/nginx/html/
COPY notebooks/vm_vs_docker_comparison.py /app/vm_vs_docker_comparison.py

WORKDIR /app

# Exponer los puertos necesarios
EXPOSE 8080 80

# Usar supervisord para manejar múltiples procesos
CMD ["sh", "-c", "nginx && python3 /app/vm_vs_docker_comparison.py"]

