---
title: 2- Instalación de Kafka standalone
---
## Instalación de Kafka standalone


La instalación que se realiza es através de un contenedor de Docker.
Al tener docker instalado, procedemos a iniciar el servicio: 
```
$ sudo service docker start
```

Descargar la imagen de Zookeeper Apache: 
```
$ sudo docker pull dockerkafka/zookeeper
```

Descargar la imagen de Kafka Apache:
```
$ docker pull dockerkafka/kafka
```
Es necesario iniciar el contenedor de Kafka Apache y Zookeeper Apache, dónde el puerto que se utiliza para Zookeeper es el 2181:
```
$ sudo docker run -d --name zookeeper -p 2181:2181 dockerkafka/zookeeper
```

Iniciamos el contenedor de Kafka, dónde el puerto que se utiliza para Kafka es el 9092
```
$ 	sudo docker run --name kafka -p 9092:9092 --link zookeeper:zookeeper dockerkafka/kafka
```

Verificamos que los contenedores se hayan ejecutado: 
```
$ sudo docker ps
```

Para realizar una prueba entre Productores y consumidores necesitamos encontrar las IP del contenedor de Zookeeper y la de Kafka. Por lo que se utilizan los siguientes comandos: 
```
export ZK_IP=$(sudo docker inspect --format '{{ .NetworkSettings.IPAddress }}' zookeeper)

export KAFKA_IP=$(sudo docker inspect --format '{{ .NetworkSettings.IPAddress }}' kafka)
```

## Logs en Kafka 
Para poder visualizar los logs de Kafka lo realizamos con el siguiente comando de docker: 
```
sudo docker logs -f kafka
```	

## Parar y remover los contenedores de Docker
Comando para parar el contenedor de Kafka: 
```	
sudo docker stop kafka
```	
Para remover el contenedor de Kafka: 
```	
sudo docker rm kafka
```	

Comando para parar el contenedor de Zookeeper: 
```	
sudo docker stop zookeeper
```	
Para remover el contenedor de Zookeeper:
```	
sudo docker rm zookeeper
```	

Para mayor información consultar el libro: Vohra, Deepak (2016) Pro Docker. Using Apache Kafka (pp.185-194)


## Instalación y configuración de kafka para un solo nodo y multiples brokers sin Docker 

Inicializar zookeeper: 
```
bin/zookeeper-server-start.sh config/zookeeper.
```



Tomar en cuenta que se deben de copiar los archivos de la carpeta de Kafka_2.12/config y copiar el archivo de server.properties según los brokers que se deseen(En este ejemplo son 3 brokers,por lo tanto copiar en la misma carpeta 

Por ejemplo: 

el archivo de server.properties 3 veces).
Tomar en cuenta que se tiene que modificar su contenido de cada uno de los archivos, en dónde se modifican las siguientes propiedades:  

- broker.id
- port
- log.dir

Por ejemplo: 
En el archivo  server-0.properties 	se define la siguiente configuración: 
```
broker.id=0
port=9092
log.dir=/tmp/kafka-logs-0
```
En el archivo  server-1.properties 	se define la siguiente configuración: 
```
broker.id=1
port=9093
log.dir=/tmp/kafka-logs-1
```
En el archivo  server-2.properties 	se define la siguiente configuración: 
```
broker.id=2
port=9094
log.dir=/tmp/kafka-logs-2
```

Ejecutar el siguiente comando según el número de brokers: 
```
# bin/kafka-server-start.sh	config/server-0.properties
# bin/kafka-server-start.sh	config/server-1.properties
# bin/kafka-server-start.sh	config/server-2.properties

...

```

## Topicos para un solo nodo y multiples brokers sin Docker 


Utilizando una terminal, se crea el tópico llamado prueba, con 3 replicas y una partición:  
```
# bin/kafka-topics.sh --create --zookeeper localhost:2181	--replication-factor 3 --partitions 1 --topic prueba
```

## Productor para un solo nodo y multiples brokers sin Docker 

Un sólo productor contectado a los 3 brokers, es necesario determinar los puertos de los brokers y el nombre del tópico: 
```
# bin/kafka-console-producer.sh	--broker-list	localhost:9092,	localhost:9093	--topic prueba 
```

## Consumidor para un solo nodo y multiples brokers sin Docker 
```
#	bin/kafka-console-consumer.sh --zookeeper localhost:2181 --from-beginning --topic prueba
```