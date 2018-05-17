---
title: 4-Cambios persistentes
---

#Hacer los cambios persistentes

Sin un **fsync** vaciado de datos en la caché del sistema de archivos en el disco, no podemos estar seguros de que los datos todavía estar allí después de un corte de energía, o incluso después de salir de la aplicación normalmente. Para que Elasticsearch sea confiable, necesita asegurarse de que los cambios persistan en el disco.

Como se mencionó en los indices de actualización dinamica de mencionó que onfirmación completa vacía los segmentos en el disco y escribe un punto de confirmación, que enumera todos los segmentos conocidos. Elasticsearch utiliza este punto de confirmación durante el inicio o al volver a abrir un índice para decidir qué segmentos pertenecen al fragmento actual.

La actualización se hace cada segundo para poder llegar a una búsqueda casi en tiempo real. Para garantizar que los cambios que se hacen a los documentos dentro de elasticsearch en este tiempo de espera elasticsearch lleva un *translog* o bien log de transacciones que registra cualquier operación en Elasticsearch y cuando ocurre, con el translog el proceso se puede ver de la siguiente manera:
![translog](https://www.elastic.co/guide/en/elasticsearch/guide/current/images/elas_1106.png)

La actualización deja el fragmento en el estado descrito en la imagen.
Una vez por segundo, el fragmento se actualiza:

* Los documentos en el búfer en memoria se escriben en un nuevo segmento, sin un fsync.
* El segmento se abre para que sea visible para buscar.
* El búfer en memoria se borra.

![Despues de la actualización](https://www.elastic.co/guide/en/elasticsearch/guide/current/images/elas_1108.png)
Como podemos ver el bufer de memoria se ha borrado pero aun tenemos el log de transacciones o bien *translog* esto nos ayuda a tener una idea sobre las acciones realizadas al indice de elasticsearch.

![Translog gigante](https://www.elastic.co/guide/en/elasticsearch/guide/current/images/elas_1108.png)

Una vez que el translog se ha vuelto demasiado grande es necesario hacer una confirmación completa, que a su ves hace que :
* Cualquier documento en el búfer en memoria se escribe en un nuevo segmento.
* El buffer está despejado.
* Un punto de confirmación se escribe en el disco.
* La memoria caché del sistema de archivos se vacía con un fsync.
* El viejo translog se borra.

El translog proporciona un registro persistente de todas las operaciones que aún no se han descargado al disco. Al iniciar, Elasticsearch utilizará el último punto de confirmación para recuperar segmentos conocidos del disco, y luego volverá a reproducir todas las operaciones en el translog para agregar los cambios que ocurrieron después de la última confirmación. 

El translog también se usa para proporcionar CRUD en tiempo real. Cuando intenta recuperar, actualizar o eliminar un documento por ID, primero comprueba el translog de cualquier cambio reciente antes de intentar recuperar el documento del segmento relevante. Esto significa que siempre tiene acceso a la última versión conocida del documento, en tiempo real.
De forma que esta seria la vista final despues de hacer una confirmación completa

![Confirmacion completa](https://www.elastic.co/guide/en/elasticsearch/guide/current/images/elas_1109.png)

Si quisieramos realizar esta operación existe la API **flush**
´´´json
1. POST / blogs / _flush 

2. POST / _flush ? wait_for_ongoing 2
´´´
En donde 1. Vaciar el blogsíndice. 

y 2. ejecutar en todos los índices y esperar hasta que se completen todas las descargas antes de regresar.