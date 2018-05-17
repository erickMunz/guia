---
title: 2-Fundamentos
---

# Fundamentos

Como se mencionó anteriormente elasticsearch es un almacen de documentos distribuidos pero **¿Que clase de documentos guarda?** 
la respuesta es **JSON**

##JSON
**Javascript Object Notation** o bien JSON es un tipo de archivo que se caracteriza por su delimitación por etiquetas, este documento esta hecho para poder ser leido con facilidad y entendido por los programas.

JSON es un formato de texto que es completamente independiente del lenguaje pero utiliza convenciones que son ampliamente conocidos por los programadores de la familia de lenguajes C, incluyendo C, C++, C#, Java, JavaScript, Perl, Python, y muchos otros. Estas propiedades hacen que JSON sea un lenguaje ideal para el intercambio de datos.

Un objeto es un conjunto desordenado de pares nombre/valor. Un objeto comienza con { (llave de apertura) y termine con } (llave de cierre). Cada nombre es seguido por : (dos puntos) y los pares nombre/valor están separados por , (coma

##RESTful API

Esta API será de suma importancia para poder almacenar y obtener información de elasticsearch, dentro de esta API se hacen unos de metodos **HTTP**. Esto puede hacerse de diferentes maneras:
- Curl
Curl es un programa y una librería que permiten operaciones con un URL con comandos dentro de el **Terminal**.
Por ejemplo: 

    curl -X **VERBO** '**PROTOCOLO**://**HOST**/**PATH**?**QUERY_STRING**' -d '**CUERPO**'

- **METODO**: EL metodo apropiado para el protocolo utilizado, en nuestro caso **HTTP** como: **GET**,**POST**,**PUT**,**HEAD**, **DELETE**.
- **PROTOCOLO**: http o https si se tiene habilitado un proxy sobre elasticsearch
- **HOST**: la **dirección IP**a la maquina anfitrión de elastisearch, **localhost** para instalaciónes locales de elasticsearch
- **PUERTO**: **9200** para elasticsearch
- **PATH** : dentro de elasticsearch se manejan **Paths** para definir indices u operaciónes de elasticsearch
- **CUERPO**: El cuerpo es la especificación de la peticion mostrada, en formato **JSON** para su manejo en elasticsearch

Con la API RESTful obtendremos salidas en json a queries dados, por ejemplo una búsqueda:
``` json
    curl -XGET "http://localhost:9200/_search" -H 'Content-Type: application/json' -d' { "query": { "match_all": {} } }'
```
``` json
nos da como resultado:
  {"took": 11,"timed_out": false,"_shards": {"total": 21,"successful": 21,"skipped": 0,"failed": 0},"hits": {"total": 7,"max_score": 1,"hits": \[{..}]}
```
##Kibana pestaña "Dev"


Dentro de el tablero de **Kibana** se encuentra un boton de **Dev**, que nos permitirá tener un ambiente para la creación de queries.

![Kibana dev](https://www.elastic.co/guide/en/kibana/current/searchprofiler/images/gs2.png)

Dentro de este ambiente se pueden hacer uso de las siguientes herramientas:
- Autocompletado
- Selección de indices 
- Respuestas rápidas
- Un "**IDE**" de selección de información.

Para hacer uso de la opcion **Dev** de kibana debemos escribir algo asi dentro de la pestaña:
```json
GET _search
{
  "query": {
    "match_all": {}
  }
}
```
Esta opcion deberá de activar un boton de play y al presionarlo debemos de ver una salida como esta:

```json
{
  "took": 12,
  "timed_out": false,
  "_shards": {
    "total": 11,
    "successful": 11,
    "skipped": 0,
    "failed": 0
  },
  "hits": {
    "total": 1,
    "max_score": 1,
    "hits": [
      {
        "_index": ".kibana",
        "_type": "doc",
        "_id": "config:6.0.0",
        "_score": 1,
        "_source": {
          "type": "config",
          "config": {
            "buildNum": 16070
          }
        }
      }
    ]
  }
}
```
## Gestor HTTP (POSTMAN)

Existen gran variedad de gestores HTTP, pero para el tutorial se utilizará **Postman** por ser una herramienta gratuita e intuitiva de utilizar, ademas de que es multiplataforma.

Esta herramienta nos permitirá conectarnos con elasticsearch y mantener una comunicación con el protocolo **HTTP**, de manera gráfica.

### Instalación: 
![Descarga Postman](https://s3.amazonaws.com/postman-static-getpostman-com/postman-docs/59161734.png)
1. La página oficial de postman brinda una direcciónes directas para la [Descarga de Postman](https://www.getpostman.com/apps)de acuerdo a tu plataforma por ejemplo ubuntu.

2. Una vez descargado el archivo debemos de guardar el archivo **.tar.gz** y lo descomprimimos
3. Nos posicionamos en la carpeta y dentro de esta carpeta existirá un archivo **Postman** lo ejecutamos y tendremos y abrirá una ventana como la siguiente:

![Postman](https://www.getpostman.com/img/v2/homepage/express-api-development.png)
En donde podemos seleccionar el método para hacer la petición asi como la descripción de la descripción y digamos que en la selección ponemos algo como: