#!/usr/bin/env python
# coding: utf-8

# In[ ]:


import psutil
import time
import datetime
import os
import matplotlib.pyplot as plt
import re

def monitor_system():
    # Crear carpeta results si no existe
    os.makedirs("results", exist_ok=True)

    current_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    filename = f"results/monitor_{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}.txt"

    with open(filename, "w") as f:
        f.write(f"Monitoreo del sistema - {current_time}\n\n")

        start_time = time.time()
        cpu = psutil.cpu_percent(interval=1)
        memory = psutil.virtual_memory().percent
        elapsed_time = time.time() - start_time
        disk_usage = psutil.disk_usage('/').percent

        f.write(f"Uso de CPU: {cpu}\n")
        f.write(f"Uso de Memoria: {memory}\n")
        f.write(f"Tiempo de Carga (Latencia): {elapsed_time:.4f}\n")
        f.write(f"Uso del Disco: {disk_usage}\n")

    print(f"Resultados guardados en {filename}")

def calcular_promedios_y_graficar():
    resultados_dir = "results"
    archivos = [f for f in os.listdir(resultados_dir) if f.startswith("monitor_") and f.endswith(".txt")]

    total_cpu = total_mem = total_latency = total_disk = 0
    count = 0

    for archivo in archivos:
        with open(os.path.join(resultados_dir, archivo), "r") as f:
            texto = f.read()
            cpu = re.search(r"Uso de CPU: ([\d.]+)", texto)
            mem = re.search(r"Uso de Memoria: ([\d.]+)", texto)
            latency = re.search(r"Tiempo de Carga \(Latencia\): ([\d.]+)", texto)
            disk = re.search(r"Uso del Disco: ([\d.]+)", texto)

            if cpu and mem and latency and disk:
                total_cpu += float(cpu.group(1))
                total_mem += float(mem.group(1))
                total_latency += float(latency.group(1))
                total_disk += float(disk.group(1))
                count += 1

    if count == 0:
        print("No hay suficientes datos para graficar.")
        return

    promedios = {
        "CPU": total_cpu / count,
        "Memoria": total_mem / count,
        "Latencia": total_latency / count,
        "Disco": total_disk / count
    }

    # Graficar
    plt.figure(figsize=(8, 6))
    plt.bar(promedios.keys(), promedios.values(), color=['blue', 'green', 'orange', 'red'])
    plt.title("Promedio de Recursos del Sistema")
    plt.ylabel("Porcentaje / Segundos")
    plt.savefig(os.path.join(resultados_dir, "promedios.png"))
    print("Gráfico guardado en results/promedios.png")

if __name__ == "__main__":
    monitor_system()
    calcular_promedios_y_graficar()
