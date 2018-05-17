---
title: 8. Publicar Imágen
---
## Publicar imágen (docker push)
En el tema anterior creamos una imágen desde un dockerfile, y esa imágen la vamos a publicar, y un requerimiento es estar logueado con el Docker ID, la imágen que creamos fue:
```
root@javier-orta:/home/javier# docker images | grep miimagenconjavayescalaymaven
miimagenconjavayescalaymaven   latest              b306f5d869d8        34 minutes ago      1.2GB
root@javier-orta:/home/javier#
```
Con esa imágen para darle el pull, es con el siguiente comando:
```
#docker push tag_name
```
Le aplicamos el push a la imágen:

