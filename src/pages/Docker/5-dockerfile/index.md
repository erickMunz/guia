---
title: 5. Dockerfile
---

## Dockerfile

Un Dockerfile se compone de instrucciones comentarios y líneas vacías y se utiliza para crear una imágen(docker image); 
El dockerfile es un archivo con varias lineas de instrucciones y configuraciones, para eso es PRIMORDIAL que se cree un archivo con el nombre de ```Dockerfile``` sin ninguna extensión, ejemplo:
```
javier$ touch Dockerfile
```
, y con esos comandos creamos el archivo.



La línea de instrucciones de Dockerfile se compone de dos componentes, donde la línea de instrucción comienza con la instrucción misma, que es seguida por los argumentos para la instrucción. La instrucción podría escribirse de cualquier manera, es insensible a mayúsculas / minúsculas Sin embargo, la práctica o convención estándar es usar mayúsculas  para diferenciarlo de los argumentos.

Ejemplo :
```
FROM ubuntu:latest
CMD echo Hello World!!
```

Para realizar un comentario en el dockerfile se utiliza un # :
```
# mi primer comentario en un dockerfile
```

## Instrucciones
Existen varias instrucciones a utilizar en un dockerfile:

### FROM
La instrucción FROM es la más importante y es la primera instrucción válida de un
Dockerfile. Establece la imagen base para el proceso de compilación. Las instrucciones subsecuentes
usaría esta imagen base y construiría encima de ella. El sistema de compilación Docker te permite
utilizar de manera flexible las imágenes creadas por cualquier persona.

Sintaxis : ```FROM <image>[:<tag>] ```
* <image> es la imágen base que se va utilizar
* <tag> es una etiqueta que tiene la imágen base puede ser la versión
Ejemplo : ```FROM ubuntu:14.04```

### MAINTAINER
La instrucción MAINTAINER es una instrucción informativa de un Dockerfile.
Esta capacidad de instrucción permite a los autores establecer los detalles en una imagen.
Docker no impone ninguna restricción al colocar la instrucción MAINTAINER
en Dockerfile.

Sintaxis : ```MAINTAINER <author's detail>```

Ejemplo : ```MAINTAINER javier <javierhdezorta@gmail.com>```

### COPY
La instrucción COPY le permite copiar los archivos del host  al
sistema de archivos de la nueva imagen docker.

Sintaxis : ```COPY <src> ... <dst>```
* <src> es el path de donde se encuentra el archivo local
* ... son los path de los archivos locales que se van a copiar
* <dst> es la nueva dirección path en la imágen, en dode se va a colocar el archivo del host local

Ejemplo : ```COPY index.html index.php  /var/www/html```

### ADD
La instrucción ADD es similar a la instrucción COPY. Sin embargo, además de
la funcionalidad admitida por la instrucción COPY, la instrucción ADD puede manejar
los archivos TAR y las URL remotas.

Sintaxis : ```ADD <src> ... <dst>```
* <src> es el path de donde se encuentra el archivo, archivos en una url, archivos tar
* ... son los path de los archivos se van a copiar
* <dst> es la nueva dirección path en la imágen, en dode se va a colocar los archivos, archivos desde una url, tar.

Ejemplo : ```ADD web-page-config.tar /```

### ENV
La instrucción ENV establece una variable de entorno en la nueva imagen. Un ENV es una
variable, es un par clave-valor al que se puede acceder mediante cualquier secuencia de comandos o aplicación.
Las aplicaciones Linux usan mucho las variables de entorno para una configuración inicial, ejemplo java_home, etc.

Sintaxis : ```ENV <key> <value>```
* <key> esta es la variable de entorno
* <value> este es el valor que se debe establecer para la variable de entorno

Ejemplo : ```ENV APACHE_LOG_DIR /var/log/apache```

### USER
La instrucción USER establece la ID de usuario inicial o el Nombre de usuario en la nueva imagen.
De forma predeterminada, los contenedores se iniciarán con el usuario root como ID de usuario o UID.
Por lo que si se agrega un user modificara el usuario por default el cual es root por el nuevo.

Sintaxis : ```USER <UID>|<UName>```
* <UID>: este es un ID de usuario numérico
* <UName>: este es un nombre de usuario válido

Ejemplo : ```USER javier```

### WORKDIR
La instrucción WORKDIR cambia el directorio de trabajo actual de / a
ruta especificada por esta instrucción. Las siguientes instrucciones, tales como RUN, CMD,
y ENTRYPOINT también trabajará en el directorio establecido por la instrucción WORKDIR.

Sintaxis : ```WORKDIR <dirpath>```
* <dirpath> Es la dirección para directorio de trabajo asignado

Ejemplo : ```WORKDIR /var/log```

### VOLUME
La instrucción VOLUME crea un directorio en el sistema de archivos de imágenes, que luego puede ser
utilizado para montar volúmenes desde el host de  Docker u otros contenedores.

Sintaxis : ```VOLUME <mountpoint>```
*  <mountpoint> es el punto de montaje que debe crearse en la nueva imagen.

### EXPOSE
La instrucción EXPOSE abre un puerto de red de contenedor para comunicarse
entre el contenedor y el mundo externo. Permite definir varios puertos.

Sintaxis : ```EXPOSE <port>[/<proto>] [<port>[/<proto>]...]```
* <port>: este es el puerto de red que debe estar expuesto al mundo exterior.
* <proto>: este es un campo opcional proporcionado un protocolo de transporte específico, como TCP y UDP. Si no se ha especificado ningún protocolo de transporte, entonces TCP es por default.

Ejemplo : ```EXPOSE 8080 90 5432```

### RUN
Son comandos que se ejecutan sobre la imágen base al momento de ejecutar el dockerfile,la recomendación general es ejecutar comandos múltiples usando una instrucción RUN. Esto reduce las capas en la imagen Docker resultante porque el sistema Docker crea  una capa para cada vez que se invoca una instrucción en el Dockerfile.

Sintaxis : ```RUN <command>```
* <command> Depende de que se coloca en el from.

Ejemplo : Si es from ubuntu ```RUN apt-get upgrade -y```, si es from centos ```RUN yum install nano -y```

### CMD
La instrucción CMD puede ejecutar cualquier comando (o aplicación), es similar a la instrucción RUN. Sin embargo, la diferencia principal entre esos dos es el tiempo de ejecución.
El comando proporcionado a través de la instrucción RUN se ejecuta durante el tiempo de compilación.
mientras que el comando especificado a través de la instrucción CMD se ejecuta cuando el
contenedor se lanza desde la imagen recién creada.
Se puede colo varios CMD en el dockerfile pero solo va a tomar en cuenta el último.

Sintaxis : ```CMD <command>``` ó ```CMD ["<exec>", "<arg-1>", ..., "<arg-n>"]```
* <command> Este es el comando, que se ejecutará durante el tiempo de lanzamiento del contenedor
* [<><>]  Puede contener varios comandos por ejecutar al momento de lanzar el contenedor.

Ejemplo : ```CMD ["echo", "Dockerfile CMD demo"]```

### ENTRYPOINT
Ajusta el punto de entrada por defecto de la aplicación desde el contenedor, funiona igual que el CMD,  sólo que es mas dificil de anular al momento de ejecución.

Sintaxis : ```ENTRYPOINT <command>```` ó ```ENTRYPOINT ["<exec>", "<arg-1>", ..., "<arg-n>"]```
* <command> Este es el comando, que se ejecutará durante el tiempo de lanzamiento del contenedor
* [<><>]  Puede contener varios comandos por ejecutar al momento de lanzar el contenedor.

Ejemplo : ```ENTRYPOINT ["echo", "Dockerfile ENTRYPOINT demo"]```

### ONBUILD
La instrucción ONBUILD registra una instrucción de compilación en una imagen y esto
se activa cuando se crea otra imagen al usar esta imagen como su imagen base.
Cualquier instrucción de compilación puede registrarse como desencadenante y esas instrucciones serán
desencadenado inmediatamente después de la instrucción FROM en el archivo Docker en sentido descendente.
Por lo tanto, la instrucción ONBUILD se puede utilizar para diferir la ejecución de la construcción desde la imagen base a la imagen objetivo.

Sintaxis : ```ONBUILD <INSTRUCTION>```
* <INSTRUCTION> es otra instrucción de compilación de Dockerfile, que se activará más tarde

Ejemplo : ```ONBUILD ADD config /etc/appconfig```


## Ejemplo de un Dockerfile
Utilizando este dockerfile, se creara una imágen comó imagen base debian con java y scala instalado, y configurado en el enviroment(ambiente)
```
FROM debian
MAINTAINER javier <javierhdezorta@gmail.com>
RUN apt update -y
RUN apt upgrade -y
RUN apt dist-upgrade
RUN apt install -y wget nano curl sed


RUN wget   -c --header "Cookie: oraclelicense=accept-securebackup-cookie" http://download.oracle.com/otn-pub/java/jdk/8u162-b12/0da788060d494f5095bf8624735fa2f1/jdk-8u162-linux-x64.tar.gz
RUN wget https://downloads.lightbend.com/scala/2.12.4/scala-2.12.4.tgz
RUN wget http://www-eu.apache.org/dist/maven/maven-3/3.5.2/binaries/apache-maven-3.5.2-bin.tar.gz

RUN tar -zxf jdk-8u162-linux-x64.tar.gz
RUN tar -zxf scala-2.12.4.tgz
RUN tar -zxf apache-maven-3.5.2-bin.tar.gz

RUN mkdir /bin/java   /bin/scala  /bin/maven  
RUN mv jdk1.8.0_162  /bin/java
RUN mv scala-2.12.4 /bin/scala
RUN mv apache-maven-3.5.2  /bin/maven


RUN echo "\nexport M2_HOME=/bin/maven/apache-maven-3.5.2  \nexport SCALA_HOME=/bin/scala/scala-2.12.4  \nexport JAVA_HOME=/bin/java/jdk1.8.0_162" >> ~/.bashrc
RUN echo "\nexport M2_HOME=/bin/maven/apache-maven-3.5.2  \nexport SCALA_HOME=/bin/scala/scala-2.12.4  \nexport JAVA_HOME=/bin/java/jdk1.8.0_162" >> ~/.profile


ENV M2_HOME /bin/maven/apache-maven-3.5.2
ENV SCALA_HOME=/bin/scala/scala-2.12.4
ENV JAVA_HOME /bin/java/jdk1.8.0_162

ENV PATH=${JAVA_HOME}/bin:$PATH
ENV PATH=${M2_HOME}/bin:$PATH
ENV PATH=${SCALA_HOME}/bin:$PATH

EXPOSE 22
EXPOSE 9200
```

## Crear una imágen desde un dockerfile

El comando para compilar un dockerfile es : ``` docker build -t "miimagen" . ```
en el que -t es un tag que se pone a la imágen para reconocerla, si no por default pondría
< none >, y el punto hace referencia al dockerfile, para compilarlo se debe de estar en el mismo path que el dockerfile.

Ejemplo compilar y crear una nueva imágen del dockerfile mostrado anteriormente; es necesario utilizar sudo o loguearse como root.
Mostramos el Dockerfile :
```
root@javier-orta:/home/javier/DockerFiles/test# ls
Dockerfile
root@javier-orta:/home/javier/DockerFiles/test#
```

Mostramos el contenido del Dockerfile :
```
root@javier-orta:/home/javier/DockerFiles/test# tail Dockerfile
ENV M2_HOME /bin/maven/apache-maven-3.5.2
ENV SCALA_HOME=/bin/scala/scala-2.12.4
ENV JAVA_HOME /bin/java/jdk1.8.0_162

ENV PATH=${JAVA_HOME}/bin:$PATH
ENV PATH=${M2_HOME}/bin:$PATH
ENV PATH=${SCALA_HOME}/bin:$PATH

EXPOSE 22
EXPOSE 9200
root@javier-orta:/home/javier/DockerFiles/test#
```

Y compilamos el Dockerfile :
```
root@javier-orta:/home/javier/DockerFiles/test# docker build -t "miimagenconjavayescalaymaven" .
```

y notamos como en la terminal se van ejecutando los comandos del Dockerfile :
```
Removing intermediate container bda22bcf2fe7
 ---> a87035bf4c6c
Step 10/26 : RUN tar -zxf jdk-8u162-linux-x64.tar.gz
 ---> Running in 23fb4b9efae0
Removing intermediate container 23fb4b9efae0
 ---> 8b8a26e8da34
Step 11/26 : RUN tar -zxf scala-2.12.4.tgz
 ---> Running in f4d60738e778
Removing intermediate container f4d60738e778
 ---> a16a4c2c71bb
Step 12/26 : RUN tar -zxf apache-maven-3.5.2-bin.tar.gz
 ---> Running in 306927fbfb7a
Removing intermediate container 306927fbfb7a
 ---> e14466b314d4
Step 13/26 : RUN mkdir /bin/java   /bin/scala  /bin/maven
 ---> Running in 9c41c2f0a2bc
Removing intermediate container 9c41c2f0a2bc
 ---> 2c7c3565c229
Step 14/26 : RUN mv jdk1.8.0_162  /bin/java
 ---> Running in 74418c4f3693
```

Luego checamos si se creo la imágen :
```
root@javier-orta:/home/javier# docker images | grep miimagenconjavayescalaymaven
miimagenconjavayescalaymaven   latest              b306f5d869d8        50 seconds ago      1.2GB
root@javier-orta:/home/javier#
```
