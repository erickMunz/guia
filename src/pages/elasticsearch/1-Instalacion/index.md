
---
title: 1-Instalación
---
# ¿Como se instala?

La instalación de elasticsearch es relativamente sencilla, existen varias opciones:

### 1. Zip
### 2. Servicio
### 3. Docker

***

### Zip

Dentro de la página oficial de elasticsearch en la pestaña de downloads podemos encontrar a [elasticsearch](https://www.elastic.co/downloads/elasticsearch)
dentro de las opciones de encontrara **ZIP**

####Instalación

 1. **Descagar** y **descomprimir** la carpeta
 2. entrar al folden **bin**
 3. Ejecutar el archivo **elasticsearch** ( en ubuntu ./**elasticsearch**)
 4. Probar en el navegador con **localhost:9200** 
 5. Visualizar un json con la leyenda "**You know, for search**"

***

### Servicio

Dentro de la página oficial de elasticsearch en la pestaña de downloads podemos encontrar a [elasticsearch](https://www.elastic.co/downloads/elasticsearch)
dentro de las opciones de encontrara **DEB**

####Instalación

 1. Para instalar el archivo se hace uso del comando **dpgk -i** ***archivo.deb*** en donde **archivo.deb** es el archivo descargado
 2. Al ejecutar ese comando ya debería de haber instalado elasticsearch pero se debe de  invocar
 3. Para invocar elasticsearch se hace uso del comando **sudo service elasticsearch start**
 4. probar en el navegador con **localhost:9200** 
 5. Visualizar un json con la leyenda "**You know, for search**"

***

### Docker

**elasticsearch** ha habilitado una [pagina especial](https://www.docker.elastic.co/) para poder descargar e instalar **elasticsearch**, **kibana** , **logstash** o bien cualquier **beat** que necesitemos por medio de docker, dentro de esta página se puede tanto obtener el comando o bien el link para su uso dentro de **docker**.

####Instalación
1. Una vez que hayamos elegido la versión que instalaremos, seleccionaremos la opcion de **copy permalik** por ejemplo:
```
docker pull docker.elastic.co/elasticsearch/elasticsearch:X.X.X
```
2. Abriremos una **terminal** en modo super usuario, y pegar el codigo recien copiado, este comando empezará a descargar la version de elasticsearch seleccionada
3. Una vez que haya terminado docker de instalarlo, podemos verificar su existencia con el comando:
```
docker images 
```
4. una vez verificada la existencia podemos iniciar nuestra instancia local de elasticsearch con el comando
```
docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:6.2.2
```
5. probar en el navegador con **localhost:9200** 
6. Visualizar un json con la leyenda "**You know, for search**"
