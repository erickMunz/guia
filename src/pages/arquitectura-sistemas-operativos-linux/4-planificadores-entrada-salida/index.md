---
title: 4. Planificadores de Entrada y Salida
---
## 4. Planificadores de Entrada y Salida

### ¿Qué son los planificadores de entrada/salida?

La planificación de Entrada/Salida son metodos por el cual el sistema operativo controla las peticiones de lectura y escritura del disco
duro.
Para realizarlo el sistema operativo utiliza un algoritmo de planificación de Entrada y Salida, que tiene cómo objetivo disminuir los tiempos de búsqueda,además  de mejorar la indexación, los tiempos debúsqueda, mejorar el tiempo de espera y el tiempo de proceso.

### Tipos de Planificadores de Entrada/Salida disponibles en el núcleo de Linux.

#### * Anticipatory:
Tiene como objetivo incrementar la eficiencia de la utilización del disco duro al anticipar las operaciones sincrónicas de lectura. 
Funciona realizando una demora controlada antes de despachar los procesos de Entrada/Salida para agregar o re ordenar las operaciones de búsqueda, mejorando el desempeño y reduciendo de manera significativa las operaciones de petición de los discos duros. 

Está diseñado específicamente para optimizar los sub-sistemas de discos pequeños o bien muy lentos


#### * CFQ (Completely Fair Queuing) :
Es el planificador de Entrada/Salida predeterminado de CentOS y Red Hat Enterprise Linux. Brinda un rendimiento superior para la mayoría de los usos que se le pueda dar al sistema operativo.

Su objetivo es mantener una cola de procesamiento de Entrada/Salida escalable y por proceso que intenta distribuir equitativamente el ancho de banda disponible entre todas las peticiones de Entrada/Salida.

Realiza peticiones sincrónicas enviadas por un proceso dentro de un número de colas de procesamiento por proceso y luego distribuyendo intervalos de tiempo para cada una de las colas de procesamiento. La longitud de estos intervalos así como el número de peticiones que tiene permitido una cola de procesamiento depende de la prioridad del mismo procesos de Entrada/Salida. De este modo, las peticiones asincrónicas para todos los procesos son agrupadas y procesadas en menos colas de procesamientos, asignando una por prioridad.


#### * Deadline :
 Utiliza una política de asignación en circuito (round robin) que intenta distribuir equitativamente las peticiones de Entrada/Salida, evitando se agote la capacidad de procesamiento.

Impone tiempos de caducidad (deadline) a todas las operaciones de Entrada/Salida a fin de impedir que se agote la capacidad de recibir peticiones. Utiliza cinco colas de procesamiento, dos de las cuales son ordenadas de acuerdo a los tiempos de caducidad, al mismo tiempo que las colas de procesamiento son ordenadas de acuerdo a su número de sector.


#### * Noop :
Es un planificador muy simple; Funciona insertando todas las peticiones de Entrada/Salida dentro de una cola de procesamiento tipo FIFO (first in, first out) e implementando fusión de peticiones.




### Como utilizarlos de buena manera :

* Anticipatory : En equipos con discos duros viejos o equipos muy viejos.
* Cfq : Se utilizan en sistemas normales o de uso general.
* Dealine : Se utiliza en servidores o equipos de alto rendimiento y procesamiento.
* Noop : Se utiliza en equipos con discos SSD,  de alto rendimiento y velocidad.




#### Para más información:
<!-- Please add any articles you think might be helpful to read before writing the article -->
- Planificadores de Entrada/Salida en Linux:   <a href='http://www.alcancelibre.org/staticpages/index.php/planificadores-entrada-salida-linux' target='_blank' rel='nofollow'>http://www.alcancelibre.org/staticpages/index.php/planificadores-entrada-salida-linux</a>