---
title: 7. Manejo de Contenedores
---
## Manejo de Containers
Para poder utilzar los comandos es recomendado loguearse en la consola como usuario root :
```
javier@javier-orta:~$ sudo su root
[sudo] password for javier:
root@javier-orta:/home/javier#
```
## Crear un Container
Para crear un container se necesita de una imágen, ya sea si la imágen fue creada con un commit, con un dockerfile, o con un pull; pero para crear un contenedor es de la misma mánera para todas la imágenes solo cambian los parámetros  al momento de ejecutar el comando docker run.
Los parámetros dependen de cada imágen, y estos se encuentran en la documentación de la imágen.

Por ejemplo crear un container de la imágen que creamos del DockerFile:
 ```
root@javier-orta:/home/javier# docker images | grep miimagenconjavayescalaymaven
miimagenconjavayescalaymaven   latest              b306f5d869d8        About an hour ago   1.2GB
root@javier-orta:/home/javier#
 ```
El comando para crear un container es : ```docker run``` , en el cual acepta varios parámetros por lo general son ```docker run -i -t --name nombre_del_contenedor  nombre_de_la_imagen```, pero los parámetros depende de la imágen.

Algunos parámetros que se utilizan son :
```
-p hace referencia al puerto, Sintaxis : -p puerto_salida:puerto_interno_del_container
-i Mantenga STDIN abierto incluso si no está conectado.
-t Asignar un pseudo-TTY.
--name es el nombre del container
-d Modo independiente: ejecuta el contenedor en segundo plano e imprime la nueva ID del contenedor
```
Para crear un container de la imágen : ```miimagenconjavayescalaymaven```

Se utiliza :
```
root@javier-orta:/media/javier# docker run -i -t --name containerconjavayescalaymaven -p 9200:9200 -p 2222:22  miimagenconjavayescalaymaven
```

Y como notamos, al ejecutar el comando con los parámetros -i -t que son los que nos permiten utilizar la consola del container, nos coloca dentro del contenedor:
```root@68542e09ffc3:/#```

Por lo que podemos interactuar dentro, para verificar si tenemos java y scala :
```
root@68542e09ffc3:/# java -version
java version "1.8.0_162"
Java(TM) SE Runtime Environment (build 1.8.0_162-b12)
Java HotSpot(TM) 64-Bit Server VM (build 25.162-b12, mixed mode)
root@68542e09ffc3:/# scala -version
Scala code runner version 2.12.4 -- Copyright 2002-2017, LAMP/EPFL and Lightbend, Inc.
root@68542e09ffc3:/# mvn -v
Apache Maven 3.5.2 (138edd61fd100ec658bfa2d307c43b76940a5d7d; 2017-10-18T07:58:13Z)
Maven home: /bin/maven/apache-maven-3.5.2
Java version: 1.8.0_162, vendor: Oracle Corporation
Java home: /bin/java/jdk1.8.0_162/jre
Default locale: en_US, platform encoding: ANSI_X3.4-1968
OS name: "linux", version: "4.13.0-32-generic", arch: "amd64", family: "unix"
root@68542e09ffc3:/#
```
Para Salir del bash del container se utiliza el comando : ```exit```


## Mostrar los Containers
Para mostrar lo containers que se estan ejecutando en el momento se utiliza el siguiente comando:
```
root@javier-orta:/home/javier/DockerFiles/test# docker ps
CONTAINER ID        IMAGE                          COMMAND             CREATED             STATUS              PORTS                                          NAMES
68542e09ffc3        miimagenconjavayescalaymaven   "bash"              6 minutes ago       Up 6 minutes        0.0.0.0:9200->9200/tcp, 0.0.0.0:2222->22/tcp   containerconjavayescalaymaven
root@javier-orta:/home/javier/DockerFiles/test#
```

Mostrar los containers que ya hemos creado:
```
root@javier-orta:/home/javier/DockerFiles/test# docker ps -a
CONTAINER ID        IMAGE                          COMMAND             CREATED             STATUS                      PORTS                                          NAMES
68542e09ffc3        miimagenconjavayescalaymaven   "bash"              About an hour ago   Up About an hour            0.0.0.0:9200->9200/tcp, 0.0.0.0:2222->22/tcp   containerconjavayescalaymaven
60083c903472        ubuntu                         "/bin/bash"         46 hours ago        Exited (130) 46 hours ago                                                  eager_liskov
848452c90824        centos                         "/bin/bash"         6 days ago          Exited (137) 46 hours ago                                                  centos7
root@javier-orta:/home/javier/DockerFiles/test#
```

## Controlar los Containers
Para controlar un container, se utilizan varios comando los cuales  son:

* docker start container_id : Inicia un container ya creado pero que no este en ejecución
* docker stop container_id : Se utliza para un container que exista y que este en ejecución
* docker restart container_id : Se utiliza para reiniciar un container que exista y que este en ejecución.

```
root@javier-orta:/home/javier# docker stop 68542e09ffc3
68542e09ffc3
root@javier-orta:/home/javier# docker start 68542e09ffc3
68542e09ffc3
root@javier-orta:/home/javier# docker restart 68542e09ffc3
68542e09ffc3
root@javier-orta:/home/javier#
```

## Docker attach
Este comando tiene una función muy parecida a lo que es -i -t; se utiliza para adjuntar la entrada, salida y error de la terminal a un contenedor en ejecución usando la ID o el nombre del contenedor. Esto le permite ver su salida en curso o controlarla de forma interactiva, como si los comandos se ejecutaran directamente en su terminal.
Nos permite acceder a la terminal del contenedor, pero para poder utilizar el comando es necesario que el container este en ejecución.

Sintaxis : ```docker attach container_id```



Ejemplo :
Primero checamos que este en ejecución el container :
```
root@javier-orta:/media/javier/# docker ps
CONTAINER ID        IMAGE                          COMMAND             CREATED             STATUS              PORTS                                          NAMES
68542e09ffc3        miimagenconjavayescalaymaven   "bash"              2 hours ago         Up About a minute   0.0.0.0:9200->9200/tcp, 0.0.0.0:2222->22/tcp   containerconjavayescalaymaven
root@javier-orta:/media/javier/d93ce5a1-a402-4334-be45-7bb3077c129c/javier/Git#  
```
Despues ejecutamos el comando docker attach:
```
root@javier-orta:/media/javier/# docker attach 68542e09ffc3
root@68542e09ffc3:/#
```
Y como notamos que ya estamos dentro de la consola del container.

## Docker Commit :
Este comando se utiliza para crear una nueva imágen pero apartir de un container, es decir si a un container por ejemplo se le instala un servicio u otra cosa, y al realizar el commit se crea una nueva imagen apartir del container.
Para utilizar el commit es necesario que el container no este en ejecución.

Sintaxis :
```
docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]
```
Opciones:
* -a,  Autor (e.g., "Javier")
* -c,  Aplicar las instrucciones especificadas de Dockerfile mientras se ejecuta el commit la imagen
* -m,  Mensaje de Commit
* -p,  Pausar el container durante el Commit

Ejemplo :
Del container ```containerconjavayescalaymaven```, le instalamos git:
```
root@68542e09ffc3:/# apt install git
Reading package lists... Done
Building dependency tree       
Reading state information... Done
The following additional packages will be installed:
  git-man less libbsd0 libcurl3-gnutls libedit2 liberror-perl libpopt0 libx11-6 libx11-data libxau6 libxcb1 libxdmcp6 libxext6 libxmuu1
  openssh-client patch rsync xauth
Suggested packages:
  gettext-base git-daemon-run | git-daemon-sysvinit git-doc git-el git-email git-gui gitk gitweb git-arch git-cvs git-mediawiki git-svn
  keychain libpam-ssh monkeysphere ssh-askpass ed diffutils-doc openssh-server
The following NEW packages will be installed:
  git git-man less libbsd0 libcurl3-gnutls libedit2 liberror-perl libpopt0 libx11-6 libx11-data libxau6 libxcb1 libxdmcp6 libxext6 libxmuu1
  openssh-client patch rsync xauth
0 upgraded, 19 newly installed, 0 to remove and 0 not upgraded.
Need to get 8867 kB of archives.
After this operation, 41.7 MB of additional disk space will be used.
Do you want to continue? [Y/n]
```
Ahora hacemos un commit a la imágen:
```
root@javier-orta:/home/javier# docker commit -m="Container de java y scala ahora con git desde commit" --author="javier" 68542e09ffc3 javier/javascalagit
sha256:10f1bdd12d0091ec409440e203f63eece88535dd8277cfb6a351e8764c872867
root@javier-orta:/home/javier#
```
Checamos si la imágen se creo:
```
root@javier-orta:/home/javier# docker images
REPOSITORY                     TAG                 IMAGE ID            CREATED             SIZE
javier/javascalagit            latest              10f1bdd12d00        45 seconds ago      1.33GB
miimagenconjavayescalaymaven   latest              b306f5d869d8        4 hours ago         1.2GB

```
Creamos un nuevo container de la imágen ```javier/javascalagit```
```
# docker run -i -t --name contenedorcongit -p 9200:9200 -p 2222:22  javier/javascalagit
```
Ahora estamos dentro del nuevo container, y checamos git :
```
root@javier-orta:/home/javier# docker run -i -t --name contenedorcongit -p 9200:9200 -p 2222:22  javier/javascalagit
root@bb0af0b7fdab:/#
root@bb0af0b7fdab:/# git version
git version 2.11.0
root@bb0af0b7fdab:/
```
Listamos el nuevo container:
```
root@javier-orta:/home/javier# docker ps -a | grep bb0af0b7fdab
bb0af0b7fdab        javier/javascalagit            "bash"              2 minutes ago       Exited (0) 26 seconds ago                       contenedorcongit
root@javier-orta:/home/javier#
```

## Docker exec
Ejecuta un comando en un contenedor en ejecución; tiene que estar el container activo.

Sintaxis : ```docker exec [OPTIONS] CONTAINER COMMAND [ARG...]```

Opciones :
```
--detach , -d		    Modo independiente: ejecutar comando en el fondo
--detach-keys		    Anular la secuencia de teclas para separar un contenedor
--env , -e		      Establecer variables de entorno
--interactive , -i  Mantenga STDIN abierto incluso si no está conectado
--privileged		    Dar privilegios extendidos al comando
--tty , -t		      Asignar un pseudo-TTY
--user , -u		      Nombre de usuario o UID (formato: <nombre | uid> [: <grupo | gid>])
```

Ejemplo :
```
Primero iniciamos el container, ya que no esta activo:
root@javier-orta:/home/javier# docker start bb0af0b7fdab
bb0af0b7fdab

Después ejecutamos un hola con el comando docker exec :
root@javier-orta:/home/javier# docker exec -i -t bb0af0b7fdab  echo "hola javier"
hola javier
root@javier-orta:/home/javier#

```

* Para más información :
- Docker Commit:   <a href='https://www.mankier.com/1/docker-run' target='_blank' rel='nofollow'>https://blog.desdelinuhttps://www.mankier.com/1/docker-run</a>

- Docker Attach: <a href='https://docs.docker.com/engine/reference/commandline/attach/#description' target='_blank' rel='nofollow'>https://docs.docker.com/engine/reference/commandline/attach/#description</a>

- Docker Exec:   <a href='https://docs.docker.com/engine/reference/commandline/exec/' target='_blank' rel='nofollow'>https://docs.docker.com/engine/reference/commandline/exec/</a>
