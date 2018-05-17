---
title: 7-Tipos de dato
---
#Tipos de dato

Para la definición de un indice es importante saber los tipos de datos que maneja, y la mejor forma para guardar la información.

Los datos los definiremos como los siguientes:
- Datos básicos
- Datos complejos
- Datos geométricos
- Datos especializados

## Datos básicos:
Por datos básicos se entienden definiciónes encontradas también en relaciónal.

|**Dato**  |**Dato elasticsearch**  |
|--|--|
|**Cadena**  | text, keyword |
|**Datos númericos** |long, integer, short, byte, double, float, half_float, scaled_float  |
|**Tipo fecha** |date |
|**Tipos de dato booleano** |boolean |
|**Tipos de dato binario** |binary |
|**Tipos de rango** |integer_range, float_range, long_range, double_range, date_range  |

## Tipos de datos complejos

- Tipo arreglo:
En Elasticsearch, no hay un tipo arreglo dedicado . Cualquier campo puede contener cero o más valores por defecto, sin embargo, todos los valores en la matriz deben ser del mismo tipo de datos. Por ejemplo:

una serie de cadenas: [ "one", "two"]
una arreglo de enteros: [ 1, 2]
una arreglo de matrices: [ 1, [ 2, 3]], que es el equivalente de [ 1, 2, 3]
una arreglo de objetos: [ { "nombre": "Diana", "edad": 12 }, { "nombre": "Eduardo", "edad": 10 }]

y la forma de escribirlo es la siguiente:

```json
PUT indice/tipo/1
{
  "mensaje": "algunas matrices en este documento ...",
  "etiquetas": ["elasticsearch", "wow"], 
  "listas": [ 
    {
      "nombre": "prog_list",
      "descripción": "lista de programación"
    },
    {
      "nombre": "cool_list",
      "descripción": "lista de cosas interesantes"
    }
  ]
}
```

- Tipo Objeto

Como sabemos los documentos JSON son de naturaleza jerárquica: el documento puede contener objetos internos que, a su vez, pueden contener objetos internos, esto es una natural dentro de un JSON.

y se puede integrar a elasticsearch de la siguiente forma:
```json
PUT indice/tipo/1
{
 
  "región" : "EE. UU." , "gerente" : { 
    
    "edad" : 30 , "nombre" : {     
      
      "primero" : "John" , "ultimo" : "Smith" 
        } 
    } 
} 
```
Es importante mencionar que el documento internamente es indexado como una lista simple de pares clave-valor, como esto:
```json
{ "region" : "US" , "gerente.edad" : 30 , "gerente.nombre.primero" : "John" , "gerente.nombre.ultimo" : "Smith" }
```

- Tipo nested 

Este tipo de dato es una versión especializada del tipo objecto de datos que permite que los arreglos de objetos sean indexados y consultados independientemente uno de el otro.

Los arreglos  de objetos internos no funcionan de la manera que usted puede esperar.
* Lucene no tiene ningún concepto de objetos internos, por lo que Elasticsearch aplana las jerarquías de objetos en una lista simple de nombres y valores de campo. Por ejemplo, el siguiente documento:

Es importante mencionar que el tipo de dato anidado funciona para ciertos casos de uso, pero igual puede complicar la búsqueda y la integración con kibana, ya que esta misma no brinda soporte completo a los tipos de dato nested y en elasticsearch se ha mencionado que en futuras versiones ya no brindarán soporte.

la forma de guardar la información es la siguiente:
```json
PUT indice/tipo/1
{
  "grupo": "fanáticos",
  "usuario": [ 
    {
      "primero": "John",
      "último": "Smith"
    },
    {
      "primero": "Alice",
      "último": "blanco"
    }
  ]
}
```
como podemos ver que en la etiqueta usuario existe un arreglo de objetos, denotados por primero y ultimo.

## Datos geométricos

|**Dato**  |**Dato elasticsearch**  |
|--|--|
|**Tipo de datos de punto geográfico como lat y lon** | geo_point |
|**Tipo de datos Geo-Shape** | geo_shape |

## Datos especializados

|**Dato**  |**Dato elasticsearch**  |
|--|--|
|**Tipo de datos IP para direcciones IPv4 e IPv6**  | ip |
|**Tipo de datos de finalización  para proporcionar sugerencias de autocompletar**|completition |
|**Contar el número de tokens en una cadena** |token_count |
|**Calcular hashes de valores en tiempo de índice y almacenarlos en el índice** |murmur3 |
|**Acepta consultas de la consulta-dsl**| percolator|
|**Define la relación padre / hijo para documentos dentro del mismo índice** | join|