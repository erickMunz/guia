---
title: 3. Repositorios Oficiales de Imágenes
---
## Los Repositorios ofciales o Tiendas Oficiales
Los repositorios oficiales de imagenes docker además de que son free :
* Docker Hub
* Docker Store

## Docker Hub
Es un repositorio oficial de imágenes,  este repositorio es mantenido por la misma comunidad de docker, algo muy importante es que debes de tener un Docker ID, si acaso no se cuenta con un docker id, en la página se puede registrar.
Las imágenes que en este repositorio se encuentran, fueron construidas y compartidas por los mismos usuarios; cualquier usuario que tenga docker instalado y este registrado va a tener acceso a utilizar las imágenes y a poder subir sus imágenes para que puedan ser usadas por otros usuarios.

La principal carácteristica de este repositorio es que las imágenes fueron hechas por usuarios normales, además de que también hay imagenes
que fueron hechas y compartidas por la empresas, como son : microsoft, oracle, etc.
Además algunas imágenes cuentan con  una descripción de como crear un container con la imágen, que parámetros utiliza y aveces también incluyen su dockerfile.

  Y todas las imagenes son libres para utilizarse, solo buscas la imágen por ejemplo puede ser una imágen que tenga postgresql, mongodb, redis, php, python, apache2,etc; y haces un docker pull a la imágen o si acaso quieres subir una imágen utilizas el docker push.

Link oficial :
- Doker Hub:   <a href='https://hub.docker.com/' target='_blank' rel='nofollow'>https://hub.docker.com/</a>


## Docker Store
Es un repositorio oficial de imágenes docker, es un repositorio nuevo, la principal  carácteristica es de que las imágenes fueron hechas por la empresas, es decir solo las empresas como oracle, microsoft, ibm, ubuntu, centos, red hat, etc.
Son los que pueden compartir  sus imágenes.
Una ventaja es de que como son imágenes por parte de las empresas tienen una mejor documentación (decripción) y tienen un mejor funcionamiento al crear un container.

Para poder utilizar las imágenes es necesario tener una cuenta, debes estar registrado y tener un Docker ID, si no se tiene un Docker Id, en la página se puede registrar.
Tmbién para poder manejar las imágenes es necesario logearse en la consola, en donde este instalado docker.

Se utiliza este comando para el login :

```root@javier-orta:/home/javier# docker login```

Y proporcionas tu username y tu password del Docker Id:

```
root@javier-orta:/home/javier# docker login
Login with your Docker ID to push and pull images from Docker Hub. If you don't have a Docker ID, head over to https://hub.docker.com to create one.
Username (javierorta): javierorta
Password:
Login Succeeded
```

Y con login ya se pueden utilizar las imagenes que esten en el docker store, si acaso no se esta logueado al hacer un pull a cualquier imágen no se va a poder realizar y  en la consola va a mostrar un mensaje que dice que es necesario loguearse(docker login).

Link oficial :
- Doker Store:   <a href='https://store.docker.com/' target='_blank' rel='nofollow'>https://store.docker.com/</a>
