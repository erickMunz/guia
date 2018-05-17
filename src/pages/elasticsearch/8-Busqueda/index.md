---
title: 8-Busqueda
---
#Búsqueda

Dentro de un gestor de información es importante poder realizar busqueda para encontrar información que contenga cierto criterio de evaluaión, elastic search permite la búsqueda real-time, y uno de sus fuertes es la busqueda full-text (de texto completo), que nos ayuda para diferentes casos de uso.

Elasticsearch permite :
- Cadena como consulta
- Consulta como parametro
- Consulta con el cuerpo en la solicitud

##Cadena como consulta

Se agregan los datos a la petición por medio de la API como el siguiente ejemplo:

GET /indice/_search?q=usuario:kimchy

se utiliza la letra q para definirle un tipo de búsqueda.

Cabe mencionar que este tipo de búsqueda es para datos básicos, es decir que no son de tipo arreglo, objeto o nested.

esta es un ejemplo de la respuesta 
```json
{
    "timed_out": false,
    "took": 62,
    "_shards":{
        "total" : 1,
        "successful" : 1,
        "skipped" : 0,
        "failed" : 0
    },
    "hits":{
        "total" : 1,
        "max_score": 1.3862944,
        "hits" : [
            {
                "_index" : "twitter",
                "_type" : "_doc",
                "_id" : "0",
                "_score": 1.3862944,
                "_source" : {
                    "user" : "kimchy",
                    "date" : "2009-11-15T14:12:12",
                    "message" : "trying out Elasticsearch",
                    "likes": 0
                }
            }
        ]
    }
}
```

## La búsqueda en el cuerpo de la solicitud

La solicitud de búsqueda se puede ejecutar con una búsqueda DSL, que incluye la Query DSL , dentro de su cuerpo. Aquí hay un ejemplo:
```json
GET /venta/_search
 { "query" : 
    { "term" : 
        { "tienda" : "la unica" } 
    } 
}
      
```
Dentro de esta consulta buscamos los resultados sobre la tienda "la unica"
 todo esto debe de ir sobre el campo "query".
 "term" es un tipo de busqueda, dentro de los tipos existen:

 |tipo de query|Descripcion|
 |--|--|
 |range|Busca documentos donde el campo especificado contenga valores (fechas, números o cadenas) en el rango especificado.|
 |exists|Encuentra documentos donde el campo especificado contenga algún valor no nulo.|
 |prefix|Encuentre documentos donde el campo especificado contiene términos que comienzan con el prefijo exacto especificado.|
 |wildcard|Encuentra documentos donde el campo especificado contenga términos que coincidan con el patrón especificado, donde el patrón admite comodines de un solo carácter ( ?) y comodines de múltiples caracteres ( *)|
 |regexp| Encuentre documentos donde el campo especificado contenga términos que coincidan con la expresión regular especificada.|
 |fuzzy|Encuentre documentos donde el campo especificado contiene términos que son difusamente similares al término especificado. La borrosidad se mide como una distancia de edición de Levenshtein de 1 o 2.|
 |type|Encuentra documentos del tipo especificado.|
 |ID|Encuentra documentos con el tipo y los ID especificados.|