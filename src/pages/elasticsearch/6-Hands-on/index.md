---
title: 6-Hands-on 
---
#Tutorial para el uso de elasticsearch

En este pequeño tutorial veremos :
- 1.Creación de un indice

- 2.Guardar información en el indice

- 3.Buscar esta información 

##Creación de el indice

Como se mencionó anteriormente, elasticsearch cuenta con una REST API, que sirve para definirle los tipos de operaciónes que haremos, estas estarán definidas con metodos HTTTP, como lo son: 
- GET, POST, PUT, DELETE.

La forma mas fácil de crear un indice es por medio de **Kibana** aunque existen diferentes herramientas para crearlo.

Una vez dentro de kibana nos posicionaremos sobre la etiqueta **Dev tools**.

Dentro de Dev tools encontramos una pequeña consola bajo la etiqueta **Console**

y debería de encontrarse la siguiente operación:

```json
GET _search
{
  "query": {
    "match_all": {}
  }
}

```
Esta es una operación típica de kibana a elasticsearch se puede ver de la siguiente forma:

``` json
METODO OPERACIONES
{
    "argumento"
}
```
Entonces para la creación de in indice se hace por medio del metodo PUT seguido por el nombre de el indice, de la siguiente forma:
```
PUT tienda
```
Con esta instrucción basta para crear el indice, pero de esta forma y tambien el indice estara en modo **dynamico** que nos permitira guardar información en el indice sin definirle un esquema.
si queremos definir un esquema este debe de estar en el cuerpo de la petición.
Supongamos que queremos definir un indice para las ventas de una tienda, la operacion seria algo asi:
```json
PUT tienda
{
  "mappings": {
    "ventas":{
      "dynamic":"strict",
      "properties": {
        "id_venta":{"type": "integer"},
        "nombre":{"type": "text"},
        "fecha":{"type": "date"},
        "articulo":{"type": "text"},
        "cantidad":{"type": "integer"},
        "precio":{"type":"double"}
      }
    }
  }
}
```
En donde "mappings" es la definición del esquema, "ventas" es el **type**.
El **type** es la abtracción de un topico para un indice, algo parecido como una tabla en visto de forma relacional.

La operación **"dynamic":"strict"** hace que el indice no admita información diferente a la definida en el esquema.
Dentro de **"properties":**, se deberán definir los campos y tipos de dato para este indice.

Si todo salio bien tendremos una respuesta como esta.
```json
{
  "acknowledged": true,
  "shards_acknowledged": true,
  "index": "tienda"
}
```
Adicionalmente podemos definirle diferentes operaciones, como:

```json
PUT tienda
{
    "settings" : {
        "index" : {
            "number_of_shards" : 3,
            "number_of_replicas" : 2
        }
    }
}
```
Asi le definimos a elasticsearch el numero de fragmentos y replicas que queremos para el indice.

Si todo salio bien en la parte derecha deberiamos ver la siguiente salida:
```json
{
  "acknowledged": true
}
```
Esto significa que elasticsearch ha creado el indice y esta listo para utilizarlo.

Una forma de verificar la existencia del indice es buscarlo con el metodo GET de la siguiente forma:

```json
GET tienda
```
y recibimos la siguiente respuesta:
```json
{
    "tienda": {
        "aliases": {},
        "mappings": {
            "ventas": {
                "dynamic": "strict",
                "properties": {
                    "articulo": {
                        "type": "text"
                    },
                    "cantidad": {
                        "type": "integer"
                    },
                    "fecha": {
                        "type": "date"
                    },
                    "id_venta": {
                        "type": "integer"
                    },
                    "nombre": {
                        "type": "text"
                    },
                    "precio": {
                        "type": "double"
                    }
                }
            }
        },
        "settings": {
            "index": {
                "number_of_shards": "5",
                "blocks": {
                    "read_only_allow_delete": "true"
                },
                "provided_name": "tienda",
                "creation_date": "1522216611345",
                "number_of_replicas": "1",
                "uuid": "2ltm3LhvT56haEdy4gdteA",
                "version": {
                    "created": "6000099"
                }
            }
        }
    }
}
```
Que nos indica la descripción de el esquema del indice guardado.

## 2.Guardar información en el indice

Es importante guardar la información en algún lado, para nuestra suerte elasticsearch es muy bueno haciendo esto, y lo hace de una manera muy fácil, con su API REST, a continuación mostraremos la forma de hacerlo con elasticsearch.

elasticsearch nos permite guardar la información en un indice schema-less, que sirve para guardar información, tal y como se encuentra y elasticsearch tratará de averiguar el tipo de dato para un campo dado.

Asimismo, permite integrar un modo "estricto", en donde se guarda la información de acuerdo a como se haya definido el indice, de una forma mas parecida a la relacional.

De acuerdo al ejercicio insertaremos información de acuerdo al esquema.

Hay que recordar que elasticsearch se comunica mediante de JSON, de forma que la entrada y salida debe de ser en un formato válido de JSON.

Para agregar la información utilizaremos el metodo POST, con la información a subir en el cuerpo del documento.

```json
POST tienda/ventas
{
  "id_venta":1,
  "nombre":"Tienda la unica",
  "fecha":"2018-01-01",
  "articulo":"Coca cola",
  "cantidad": 2,
  "precio": 15.50
}
```
Si todo ha salido bien recibiremos una respuesta como la siguiente:
```json
{
  "_index": "tienda",
  "_type": "ventas",
  "_id": "CYI9a2IBtR3stZ4EprLS",
  "_version": 1,
  "result": "created",
  "_shards": {
    "total": 2,
    "successful": 1,
    "failed": 0
  },
  "_seq_no": 0,
  "_primary_term": 2
}
```
Que nos indica que genero un id CYI9a2IBtR3stZ4EprLS, con la version 1.

Esto es de suma importancia, ya que elasticsearch al actualizar un documento no sobreescribe el primero, si no que crea uno nuevo con una version diferente, esto por el motor de busqueda lucene.

Como vimos debemos definir bien los datos que vamos a subir y su tipo ya que de agregar un nuevo campo por ejemplo, vendedor con un request como este:
```json
POST tienda/ventas
{
  "id_venta":1,
  "nombre":"Tienda la unica",
  "fecha":"2018-01-01",
  "articulo":"Coca cola",
  "cantidad": 2,
  "precio": 15.50,
  "vendedor":"Mario Bros"
}
```

recibiremos una respuesta como la siguiente:
```json
{
  "error": {
    "root_cause": [
      {
        "type": "strict_dynamic_mapping_exception",
        "reason": "mapping set to strict, dynamic introduction of [vendedor] within [ventas] is not allowed"
      }
    ],
    "type": "strict_dynamic_mapping_exception",
    "reason": "mapping set to strict, dynamic introduction of [vendedor] within [ventas] is not allowed"
  },
  "status": 400
}
```
Que nos indica que no se pudo subir el JSON dado que el campo vendedor, no esta permitido.


##3. Obtener un documento

Una parte muy importante de elasticsearch es la obtención de información, si bien elasticsearch cuenta con toda una API para su busqueda, en esta parte veremos solo la forma "basica de obteer la información"

La forma mas rapida de encontrar la información dentro de elasticsearch es por el metodo **"Search all"**

simplemente debemos apuntar el API hacia nuestro **_type** y poner el siguiente JSON en el cuerpo de la peticion.

```json
GET tienda/ventas/_search
{
  "query":{
    "match_all": {}
  }
}
```
Dentro de el query, decimos que busque toda la información dentro de el indice. y nos regresa la siguiente respuesta.
```json
{
  "took": 100,
  "timed_out": false,
  "_shards": {
    "total": 5,
    "successful": 5,
    "skipped": 0,
    "failed": 0
  },
  "hits": {
    "total": 1,
    "max_score": 1,
    "hits": [
      {
        "_index": "tienda",
        "_type": "ventas",
        "_id": "CYI9a2IBtR3stZ4EprLS",
        "_score": 1,
        "_source": {
          "id_venta": 1,
          "nombre": "Tienda la unica",
          "fecha": "2018-01-01",
          "articulo": "Coca cola",
          "cantidad": 2,
          "precio": 15.5
        }
      }
    ]
  }
}
```
La respuesta, esta partida en dos, una parte que nos indica el rendimiento de el query, su velocidad, y la cantidad de respuestas, denotadas por "hits", esta información nos dira los documentos guardados en el indice.
y como podemos ver se encuentra el documento guardado anteriormente.

La otra forma de obtener un documento en elasticsearch es buscando por el id y se hace de la siguiente manera:
```json
GET tienda/ventas/CYI9a2IBtR3stZ4EprLS
```
En esta petición se define el indice, el _type (ventas) y el ID del documento, este request nos regresa la siguiente respuesta.
```json
{
  "_index": "tienda",
  "_type": "ventas",
  "_id": "CYI9a2IBtR3stZ4EprLS",
  "_version": 1,
  "found": true,
  "_source": {
    "id_venta": 1,
    "nombre": "Tienda la unica",
    "fecha": "2018-01-01",
    "articulo": "Coca cola",
    "cantidad": 2,
    "precio": 15.5
  }
}
```
En esta respuesta se ve el contenido del JSON dentro de el ID y nos dice el indice, type y la versión de este.

y asi es como se obtiene información de elasticsearch.