---
title: 2- Instalación Apache NiFi (Docker)
---
## Instalación Apache NiFi (Docker)

Para continuar con la instalación de Apache NiFi es necesario contar con Docker instaldo sobre nouestro sistema operativo Linux.

**Pasos para habilitar la imagen de Docker NiFi**

1. Ingresar a una terminal de comandos y validar que se tenga instaldo Docker con el siguiente comando

```
 docker --version

```

2. El siguiente comando nos permitira descargar la imagen de *Apache Nifi*

```
docker pull apache/nifi:latest

```

3. Iniciar la imagen descargada mediante la ejecuación del comando a continuación.

```
docker run --name nifi \
  -p 8787:8787 \
  -d \
  -e NIFI_WEB_HTTP_HOST='172.17.0.2' \
  -e NIFI_WEB_HTTP_PORT='9090' \
  apache/nifi:latest

```
Donde -e: indica el valor que se le asignara a las propiedades mencionada.
NIFI_WEB _HTTP _HOST se debe colocar el valor de la ip asignada por la network de Docker. Para saber que que ip se encuentra asignada al docker del NiFi ejecutar el siguiente comando

```
 docker network inspect bridge

```
4. Ejecutaremos el siguiente comando para validar que se agrego el nuevo contenedor de Nifi.

```
docker images

docker ps

```
Donde *docker images* muestra todas la imagenes existentes en Docker, y *docker ps* los contenemdores que se encuentran activos en ese momento.

5. Una vez arriba el docker de NiFi se puede consumir el servicio dentro de un explorador:

[http://ip:9090/nifi/]()


Para consultar mas información: [NiFi Docker image](https://hub.docker.com/r/apache/nifi/)
