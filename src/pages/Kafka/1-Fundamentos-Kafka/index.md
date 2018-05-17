---
title: 1-Fundamentos de Kafka
---
## Fundamentos de Kafka

Apache Kafka fué desarrollado por la Apache Software Foundation la cual es un sistema de intermediacíón para la manipulación de mensajes en tiempo real de fuentes de datos. Proporciona una plataforma unificada, de alto rendimiento, distribuido, particionado, replicado, rápido en lecturas y escrituras que deben de ser gestionados por una o varias aplicaciones. 

Características: 

1.-Creado por LinkedIn.
2.-Escrito en Scala.
3.-Escalable y tolerante a fallos.
4.-Funciona como un servicio de mensajería, categoriza los mensajes llamados TOPICS.
5.-Clientes conectados a Kafka responsables de publicar los mensajes. Estos mensajes son publicados sobre uno o varios topics, se llaman PRODUCTORES.  
6.-Clientes conectados a Kafka subcritos a uno o varios topics responsabes de consumir los mensajes, se llaman CONSUMIDORES. 
7.-Cada uno de los nodos de kafka que forman el cluster, a estos se le denominan BROKER. 
8.-Se pueden programar productores/consumidores en diferentes lenguajes: Java, Scala, Python, Ruby, C++...
7.-Se puede utilizar para servicios de mensajería, procesamiento de streams, web tracking, 	Estadísticas, monitorización, histórico de Logs...

## Zookeeper
Es un proyecto de Apache Software Foundation que nos provee de un servicio centralizado para diversas tareas como por ejemplo mantenimiento de configuración, naming, sincronización distribuida o servicios de agrupación, servicios que normalmente son consumidos por otras aplicaciones distribuidas. 

Características: 

1.-Sencillo: Permite la coordinación entre procesos distribuidos mediante un namespace jerárquico que se organiza de manera similar a un file system. El namespace consiste en registros (znodes) similares a ficheros o directorios, ZooKeeper mantiene la información en memoria.
2.-Replicable: Permite las replicas instaladas en múltiples hosts, llamados conjuntos o agrupaciones. Los servidores que conforman el servicio ZooKeeper deben conocerse todos entre ellos. 
3.-Ordenado: ZooKeeper se encarga de marcar cada petición con un número que refleja su orden entre todas las transacciones.
4.-Rápido: Sobre operaciones de lectura.
5.-Secuencialidad: Asegura que las operaciones de actualización se aplican en el mismo orden en el que se envían.
6.-Atomicidad: No existen los resultados parciales, las actualizaciones fallan o son un éxito.
7.-Seguridad: En el momento en el que una actualización se ha aplicado, dicha modificación se mantendrá hasta el momento en que un cliente la sobreescriba.
8.-Actualización: El cliente tiene garantizado que, en un determinado intervalo temporal, los servicios estarán actualizados.

##Docker 

La idea detrás de Docker es crear contenedores ligeros y portables para las aplicaciones software que puedan ejecutarse en cualquier máquina con Docker instalado, independientemente del sistema operativo que la máquina tenga por debajo, facilitando así también los despliegues.

Docker, me permite meter en el contenedor todas aquellas cosas que mi aplicación necesita para ser ejecutada (java, Maven, tomcat…) y la propia aplicación. Así yo puedo llevar ese contenedor a cualquier máquina que tenga instalado Docker y ejecutar la aplicación sin preocuparme de qué versiones de software tiene instalada esa máquina, de si tiene los elementos necesarios para que funcione mi aplicación , de si son compatibles…

Instalación de docker en Ubuntu: 

Actualizar la base de datos de paquetes:
```
$ sudo apt-get update
```

Agregue la clave GPG para el repositorio oficial de Docker al sistema:
```
$ sudo apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
```

Agregue el repositorio Docker a fuentes APT:
```
$ sudo apt-add-repository 'deb https://apt.dockerproject.org/repo ubuntu-xenial main'
```

Actualizar la base de datos de paquetes, con los paquetes Docker desde el repositorio recién agregado:
```
$ sudo apt-get update
```

Asegurarte de que se va a instalar desde el repositorio de Docker:
```
$ apt-cache policy docker-engine
```

Debería ver una salida similar a la siguiente:	
```
docker-engine:
  Installed: (none)
  Candidate: 1.11.1-0~xenial
  Version table:
     1.11.1-0~xenial 500
        500 https://apt.dockerproject.org/repo ubuntu-xenial/main amd64 Packages
     1.11.0-0~xenial 500
        500 https://apt.dockerproject.org/repo ubuntu-xenial/main amd64 Packages
```

Por último, instale Docker:
```
$ sudo apt-get install -y docker-engine
```

Docker ahora debe estar instalado, el daemon iniciado, y el proceso habilitado para iniciar en el arranque. Compruebe que se está ejecutando:
```
$sudo systemctl status docker
```

La salida debe ser similar a la siguiente, mostrando que el servicio está activo y en ejecución:
```
Output
● docker.service - Docker Application Container Engine
   Loaded: loaded (/lib/systemd/system/docker.service; enabled; vendor preset: enabled)
   Active: active (running) since Sun 2016-05-01 06:53:52 CDT; 1 weeks 3 days ago
     Docs: https://docs.docker.com
 Main PID: 749 (docker)
 ```


Para mayor información sobre kafka: <a href='https://loquemeinteresadelared.wordpress.com/2014/07/15/apache-kafka/' target='_blank' rel='nofollow'>https://loquemeinteresadelared.wordpress.com/2014/07/15/apache-kafka/</a>

Para mayor información sobre zookeeper: <a href='https://www.adictosaltrabajo.com/tutoriales/introduccion-a-zookeeper/' target='_blank' rel='nofollow'>https://www.adictosaltrabajo.com/tutoriales/introduccion-a-zookeeper/</a>

Para mayor información sobre instalación de Docker: <a href='https://www.digitalocean.com/community/tutorials/como-instalar-y-usar-docker-en-ubuntu-16-04-es' target='_blank' rel='nofollow'>https://www.digitalocean.com/community/tutorials/como-instalar-y-usar-docker-en-ubuntu-16-04-es</a>


