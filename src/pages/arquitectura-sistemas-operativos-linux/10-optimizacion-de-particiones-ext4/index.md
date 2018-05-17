---
title: 10. Optimización de Particiones ext4
---
## 10. Optimización de Particiones ext4


### Acerca de Ext4 (fourth extended filesystem o cuarto sistema de archivos extendido) :

  Es un sistema de archivos con registro por diario, publicado por Andrew Morton como una mejora del formato Ext3 el 10 de octubre de 2006. 

  Las mejoras respecto de Ext3 incluyen:
  * El soporte de volúmenes de hasta 1024 PiB
  * Soporte añadido de extents (conjunto de bloques físicos contiguos)
  * Menor uso de recursos de sistema
  * Mejoras en la velocidad de lectura y escritura 
  * Verificación más rápida con fsck. 


### Registro por diario (journaling) :

Es un mecanismo por el cual un sistema de archivos implementa transacciones, el cual consiste en un registro el cual almacena información necesaria para restablecer los datos; es como una captura del sistema, en el cual si hay un fallo, este toma la última transacción para restablecer los archivos.


### Como verificar las particiones de la unidad de almacenamiento :

Para verificar las particiones se utiliza el siguiente comando, informa la cantidad de espacio de disco disponible que utilizan los sistemas de archivos :

```
df
```

También el comando permite opciones en los parametros :
 ```
-a	Incluye sistemas de archivos falsos.
-h	Mostrar los tamaños en formato legible  (1K 234M 2G)
-H	Muestra tamaños en formato legible, pero utiliza potencias de 1000, no de 1024.
-i	Listar información de inodos en vez de uso de bloques.
-l	Limitar el listado a sistemas de archivos locales.
-P	Usar el formato de salida POSIX.
-T	Mostrar el tipo de sistema de archivos.
```

### Comandos para montar y desmontar particiones :

* Para montar se utiliza el siguiente comando, en el cual debe de especificar la dirección de la partición  :

```
sudo mount /dev/sdb1 /mnt
```


* Para desmontar la partición se utiliza el siguiente comando, en el cual tambien se le debe de especificar la ruta :

```
sudo umount /dev/sdb1
```

 
### E2fsck :

Se trata de una herramienta que sirve para particiones ext2, ext3 y ext4 que realiza la detección automática del formato y realiza la verificación y reparación del sistema de archivos en formato ext2, ext3 y ext4.


#### Opciones en los parámetros :
* La opción -D realiza la optimización de directorios en el sistema de archivos. 
* La opción  -f se utiliza para forzar la verificación de la partición.

Por lo general se utilizan las dos opciones al ejecutar e2fsck.
Antes de ejecutar el comando es necesario que la partición este desmontada.

Para ejecutar e2fsck, se utiliza el siguiente comando, en el cual se le especifica la ruta de la partición :

```
e2fsck -f -D /dev/sda3
```

Y debe de aparecer en la consola algo parecido a :

```
[root@m100 SPECS]# e2fsck -D -f /dev/sda3
e2fsck 1.39 (29-May-2006)
Pass 1: Checking inodes, blocks, and sizes
Pass 2: Checking directory structure
Pass 3: Checking directory connectivity
Pass 3A: Optimizing directories
Pass 4: Checking reference counts
Pass 5: Checking group summary information

/home: ***** FILE SYSTEM WAS MODIFIED *****
/home: 13/5244736 files (7.7% non-contiguous), 208319/5243214 blocks
```


### Opciones noatime y nodiratime (eliminar tiempos de acceso) :

Estas opciones constituyen la forma más rápida y fácil de lograr mejoras en el desempeño. Impiden que se actualicen los tiempos de acceso de los inodos (nodos índice), los cuales casi no se utilizan.

Y mejoran el desempeño del sistema.

* noatime - Desactiva la actualización del tiempo de acceso de los archivos.
* nodiratime - Desactiva la actualización del tiempo de acceso de los directorios.
* relatime - Actualiza el tiempo de acceso relativo a modificar o cambiar el tiempo. El tiempo de acceso solo se actualiza si la hora de acceso anterior era anterior a la modificación actual o la hora de cambio.


1. Para utilizarlos se edita el archivo fstab :
```
sudo gedit / etc / fstab
```

2. Una vez abierto el archivo se agregan las lineas de la configuración :

```
/sistema de archivos/punto de montaje/  tipo   opciones  volcado   paso

Ejemplo: 

/dev/sda/ext4 errors = remount-ro , noatime, nodiratime  0 0

```

3. Y se guardan los cambios.

#### Para más información:
<!-- Please add any articles you think might be helpful to read before writing the article -->
- Comando df:   <a href='https://www.hscripts.com/es/tutoriales/linux-commands/df.html'>https://www.hscripts.com/es/tutoriales/linux-commands/df.html</a>

- Montar y desmontar particiones:   <a href='https://www.solvetic.com/tutoriales/article/3607-comandos-montar-desmontar-particiones-linux/' target='_blank' rel='nofollow'>https://www.solvetic.com/tutoriales/article/3607-comandos-montar-desmontar-particiones-linux/</a>

- Optimización de particiones:   <a href='http://www.alcancelibre.org/staticpages/index.php/como-optimizar-ext3' target='_blank' rel='nofollow'>http://www.alcancelibre.org/staticpages/index.php/como-optimizar-ext3</a>



- Noatime y nodiratime:   <a href='https://almost-a-technocrat.blogspot.mx/2011/02/reduce-disk-writes-with-noatime.html' target='_blank' rel='nofollow'>https://almost-a-technocrat.blogspot.mx/2011/02/reduce-disk-writes-with-noatime.html</a>


