---
title: elasticsearch
---

![Logo elastic](https://www.elastic.co/assets/blt6050efb80ceabd47/elastic-logo%20%282%29.svg)
# ¿Qué es elasticsearch?

Es un motor de **búsqueda** RESTful que también permite la **analitica**, creado a partir de la libreria  **lucene** una de las mas avanzadas en cuanto a búsqueda de texto. 
elacticsearch permite:
- Un almacen distribuidp para documentos en donde cada palabra es guardada y puede ser **búscada**
- Un motor de busqueda distribuido con analitica en **tiempo real**
- Escalable con cientos de servidores y petabytes de datos estructurados y desestructurados.

ElasticSearch es usado para hacer búsquedas de texto, estructuradas y analíticos, todo en una solución
--- 
## Características:

- Usado por **Wikipedia** con búsquedas de texto.
- **Github** lo usa para poder hacer **búsquedas** sobre 130  billones de lineas de codigo
- StackOverflow lo usa para encontrar preguntas y respuestas "***mas-como-esto***" de forma que el usuario encuentre mas rápido lo que quiera.

## ¿Por que elasticsearch?
Elasticsearch cuenta con herramientas como:

###RESTful API
 - Estas API nos permiten tener acceso a los datos de elasticsearch por medio de metodos HTTP como lo son: POST, GET, DELETE. elasticsearch tiene esta API integrada.

### Lucene

 - elasticsearch esta basado en **leucene2** como **SOLR**, o mas gestores de búsquedas de texto, lo que nos dara una mayor velocidad en la búsqueda de texto.

 
### Kibana
 - Al tener muchos datos dentro de elasticsearch tal vez nos gustaría tener una grafica con ellos, pues Kibana lo permite.

### Logstash

 - Sirve como sistema que se encargue de subir información de logs dentro del servidor a elasticsearch, logstash es una herramienta para hacer esto.

### Beats
- Adicionalmente elasticsearch cuenta con Beats, que son agentes  para subir información especifica a elasticsearch, tales como archivos, tramas. etc. para mas información consultar [Beats](https://www.elastic.co/downloads/elasticsearch)