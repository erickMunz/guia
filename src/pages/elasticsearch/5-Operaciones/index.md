---
title: 5-Operaciones 
---

#Creación, indización y eliminación de un documento

![Descripcion](https://www.elastic.co/guide/en/elasticsearch/guide/master/images/elas_0402.png)

Aquí está la secuencia de los pasos necesarios para crear, indexar o eliminar con éxito un documento tanto en el fragmento principal como en los fragmentos de réplica:

1. El cliente envía una solicitud de creación, índice o eliminación a Node 1.
2. El nodo usa el  _id del documento para determinar que el documento pertenece a shard(fragmento) 0. Reenvía la solicitud a Node 3, donde 0 está asignada la copia primaria de fragmento .
3. Node ejecuta la solicitud en el fragmento primario. Si tiene éxito, reenvía la solicitud en paralelo a los fragmentos de réplica en Node 1y Node 2. Una vez que todos los fragmentos de la réplica informan el éxito, Node 3informa el éxito al nodo de coordinación, que informa el éxito al cliente.

Para cuando el cliente recibe una respuesta exitosa, el cambio de documento se ha ejecutado en el fragmento primario y en todos los fragmentos de réplica. Tu cambio es seguro.

Hay una serie de parámetros de solicitud opcionales que le permiten influir en este proceso, posiblemente aumentando el rendimiento a costa de la seguridad de los datos. Estas opciones rara vez se utilizan porque Elasticsearch ya es rápido, pero se explican aquí para mayor completud
###consistency:
Por defecto, el fragmento primario requiere un *quórum* , o la mayoría, de copias de fragmentos (donde una copia de fragmento puede ser un fragmento primario o de réplica) para estar disponible antes de intentar una operación de escritura. Esto es para evitar escribir datos en el "lado equivocado" de una partición de red. Un **quórum** se define de la siguiente manera:
```
int ((primary + number_of_replicas) / 2) + 1
```
Dentro de los valores permitidos dentro de **consistency** son :
* one(solo el fragmento primario)
* all (el principal y todas las réplicas)
* el valor predeterminado quorum

hay que tener en cuenta que number_of_replicas es el número de réplicas especificado en la configuración del índice, no el número de réplicas que están activas actualmente.
###timeout
¿Qué sucede si hay suficientes copias de fragmentos disponibles? Elasticsearch espera, con la esperanza de que aparezcan más fragmentos. Por defecto, esperará hasta 1 minuto. Si lo necesita, puede usar el timeoutparámetropara hacerlo abortar antes: 100es de 100 milisegundos, y 30ses de 30 segundos.

#Recuperación del documento:
![Secuencia](https://www.elastic.co/guide/en/elasticsearch/guide/master/images/elas_0403.png)
¿Que sucede?
1. El cliente envía una solicitud de obtención a Node 1.
2. El nodo usa el _id del documento para determinar que el documento pertenece a shard 0. las copias de shard 0 existen en los tres nodos. Para esta ocasión, reenvía la solicitud a Node 2.
3. Node 2 devuelve el documento a Node 1, que devuelve el documento al cliente.

Para solicitudes de lectura, el nodo de coordinación elegirá una copia de fragmento diferente en cada solicitud para equilibrar la carga; gira alrededor de todas las copias de fragmentos.

Es posible que, mientras se indexa un documento, el documento ya estará presente en el fragmento primario pero aún no se haya copiado en los fragmentos de la réplica. En este caso, una réplica podría informar que el documento no existe, mientras que el primario habría devuelto el documento correctamente. Una vez que la solicitud de indexación ha devuelto el éxito al usuario, el documento estará disponible en el primario y en todos los fragmentos de réplica.

#Actualización parcial de un documento:

![Actualización parcial](https://www.elastic.co/guide/en/elasticsearch/guide/master/images/elas_0404.png)

Dentro de la imagen se visualiza lo siguiente:
1. El cliente envía una solicitud de actualización a Node 1.
2. Reenvía la solicitud a Node 3, donde se asigna el fragmento primario.
3. Node 3 recupera el documento del fragmento primario, cambia el JSON en el _sourcecampo e intenta reindexar el documento en el fragmento primario. Si el documento ya ha sido cambiado por otro proceso, vuelve a intentar el paso 3 hasta llegar a retry_on_conflictveces, antes de darse por vencido.
4. Si Node 3ha logrado actualizar el documento con éxito, reenvía la nueva versión del documento en paralelo a los fragmentos de la réplica en Node 1 y Node 2para volver a indexar. Una vez que todos los fragmentos de réplica informan el éxito, Node 3informa el éxito al nodo de coordinación, que informa el éxito al cliente.

La API *update* también acepta la routing, replication, consistency, y timeout, explicados anteriormente.
