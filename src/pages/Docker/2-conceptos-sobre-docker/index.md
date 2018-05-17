---
title: 2. Conceptos Sobre Docker :
---

## Diferencias entre Docker y Virtual Machines :
A diferencia de las máquinas virtuales; el kernel del host se comparte con los contenedores en ejecución. Esto significa que los contenedores siempre están obligados a ejecutar el mismo núcleo que
el host, y no se debe de crear una instancia de un s.o cada vez que se crea un maquina virtual.

Diferencias :

Máquinas Virtuales                                  
* Representa la virtualización a nivel de hardware     
* Heavyweight (Es pesado para el S.O)                        
* Aprovisionamiento lento                  
* Rendimiento limitado                   
* Completamente aislado y por lo tanto más seguro      


Contenedores:
* Representa la virtualización del sistema operativo
* Lightweight (Es ligero para el S.O)
* Aprovisionamiento y escalabilidad en tiempo real
* Rendimiento nativo
* Aislamiento a nivel de proceso y, por lo tanto, menos seguro



![Docker vs VM](https://s3.amazonaws.com/bigdatamx/images-guides-docker-01-arquitectura.png)



## Carácteristicas de Docker :
* Docker tiene la capacidad de reducir el tamaño del desarrollo mediante la utilización
de contenedores.
* Con contenedores, se vuelve más fácil para los equipos de trabajo, realizar tareas como
desarrollo, control de calidad y operaciones para trabajar sin problemas entre las aplicaciones.
* Es una herramienta multiplataforma, por lo que los contenedores se pueden ejecutar en
cualquier S.O.
* Se puede imlementar contenedores Docker en cualquier tipo de sistema, fisico, virtual, o
en la nube.

## Componentes de Docker :
* Docker para Mac : Permite ejecutar contenedores Docker en sistemas operativos OS x.
* Docker para Windows: Permite ejecutar contenedores en sistemas operativos de Microsoft.
* Docker para linux : Permite ejecutar contenedores en sistemas operativos  Linux.
* Docker Engine : Es utilizado para construir imagenes Docker y crear contenedores.
* Docker Hub : Es un registro el cual es utilizado como host de imágenes Docker de diferentes
usuarios.
* Docker Compose : Es usado para definir aplicaciones utilizando múltiples contenedores.
* Docker Engine : Es el nucleo de la plataforma open source Docker, es un runtime que se encarga
de ejecutar los contenedores Docker.
* Docker File : Es un script que es utlizado para automatizar la creación de una imagen docker.


## Machines, Images and Containers :
Docker distingue tres importantes conceptos : docker machines, docker images, Containers.

### Docker Containers :
Son servicios de un entorno de tiempo de ejecución específico.
Por ejemplo simular una máquina con un servicio de postgresql, y otra máquina con un servicio
de oracle 12c.
Estos contenedores son procesos que pueden ser creados, parados, reiniciados, iniciados, y eliminados.

Podría haber varias imágenes de solo lectura debajo de la capa del contenedor.
Un container se origina de una imagen de solo lectura atravéz de un commit o un dockerfile.
Cuando se inicia un contenedor, en realidad se refiere a una imagen a través de su ID único.
Docker extrae la imagen requerida y su parent image. Docker extrae (docker pull) de todas las parent images hasta que alcanza la imagen base.


### Docker Images :
Son el resultado de ejecutar un conjunto de comandos que se encuentran en un script-file
específico llamdo Dockerfile, por lo tanto docker permite tener multiples contenedores de una imágen
en específico.


Como tal una imagen es una colección de todos los archivos que componen a una aplicación de Software.
Cada cambio que se hace de la imagen original es almacenado en un layer separado.
Cualquier Docker Image

### Docker Machines :
Son máquinas locales, virtuales, o remotas ( azure, aws), con el servicio de Docker.
Las máquinas de Docker tiene una específica dirección ip. Cada Docker machine puede
gestionar múltiples contenedores e imágenes.
Desde nuestra máquina la herramienta Docker Machine command, permite conectarnos a cualquier
docker machine ya sea en cloud, local o virtual para administrarlos.

![Docker](https://s3.amazonaws.com/bigdatamx/images-guides-docker-02-machines.png)


## Docker Layer
Docker Layer podría representar imágenes de solo lectura o imágenes de lectura / escritura.
Sin embargo, la capa superior de una pila de contenedores siempre es la capa de lectura-escritura (escritura),
que aloja un contenedor Docker.


## Docker Registry
Docker Registry es un lugar donde las imágenes Docker se pueden almacenar para ser accedidos y utilizados por los desarrolladores mundiales para la elaboración rápida de aplicaciones sin ningún riesgo. Porque todas las imágenes almacenadas
habrían pasado por múltiples validaciones, verificaciones y refinamientos,
la calidad de esas imágenes será realmente alta. Usando el comando push de Docker,
puede enviar su imagen Docker al Registro para que se registre y se deposite.
Como aclaración, el registro es para registrar las imágenes Docker, mientras que el
repositorio es para almacenar esas imágenes registradas de Docker. Una imagen Docker se almacena dentro de un Repositorio en el registro de Docker. Cada repositorio es único para cada usuario o cuenta.

## Docker Repository
Un Docker Repository es un espacio (namespace) que se utiliza para almacenar una imagen Docker.
Por ejemplo si la instacia de la app es llamada helloworld y el username ó namespace para el registro es dockertest, entonces en el Docker Repository, donde esta imagen será almacenada en el Docker Registry se llamada dockertest/helloworld.
Las imagenes son almacenadas en el Docker Repository.  
