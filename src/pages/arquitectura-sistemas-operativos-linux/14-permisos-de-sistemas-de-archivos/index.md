---
title: 14. Permisos de Sistemas de archivo 
---
## 14. Permisos de Sistemas de archivo


### Permisos de archivos y directorios :


Existen 3 tipos de permisos:
– Lectura (R)
– Escritura (W)
– Ejecución (X)

Y cada tipo de permiso se asigna a:
– Usuario: Dueño del fichero
– Grupo: Grupo al que pertenece el fichero
– Otro: Otros usuarios que no pertenecen al mismo grupo


### Tipos de Permisos :

#### Permiso de Lectura :
Un usuario tiene permiso de lectura de un archivo, por lo que puede ver su contenido.
Y de igual manera si se tiene permiso de lectura sobre un directorio, entonces el usuario será capaz de listar los ficheros del directorio.

#### Permiso de Escritura :
Un usuario con permisos de escritura sobre un archivo entonces es capaz de editar el archivo, e igualmente si el usuario tiene permisos de escritura sobre un directorio entonces puede crear ficheros y carpetas.+

#### Permisos de Ejecución :
Los permisos de ejecución se utilizan principalmente en aplicaciones y scripts. Si dispones de permisos puedes ejecutar la aplicación/script.



###  Cómo interpretar los permisos :

En Linux, todo archivo y directorio tiene tres niveles de permisos de acceso: los que se aplican al propietario del archivo, los que se aplican al grupo que tiene el archivo y los que se aplican a todos los usuarios del sistema. 
Podemos ver los permisos cuando listamos un directorio con :

```
ls -l  ó ls -la
```

Los parametros que muestran al momento de ejecutar el comando son mas o menos así:

```
total 5676036
drwxr-xr-x  3 root   root         4096 feb  1 10:29  
drwxr-xr-x 62 javier javier       4096 feb  8 11:04 .
drwxr-xr-x  3 root   root         4096 feb  1 12:10 ..
drwxrwxr-x  3 javier javier       4096 ene 30 10:39 .android
drwxrwxr-x  3 javier javier       4096 ene 30 09:52 Android
drwxrwxr-x  4 javier javier       4096 ene 30 09:52 .AndroidStudio3.0
drwxrwxr-x  9 javier javier       4096 feb  6 12:36 .atom
-rw-------  1 javier javier      12968 feb  8 15:21 .bash_history
-rw-r--r--  1 javier javier        220 ene 29 10:43 .bash_logout
-rw-r--r--  1 javier javier       6894 feb  6 11:09 .bashrc
-rw-r--r--  1 javier javier       4353 ene 29 12:06 .bashrc-anaconda3.bak
drwxrwxr-x  2 javier javier       4096 ene 31 13:01 .beeline
drwx------ 26 javier javier       4096 feb  8 11:04 .cache
```

Los permisos se muestran como 10 caracteres:

![Permisos ](https://s3.amazonaws.com/bigdatamx/images-guides-permisos_sis-01-reparto_permisos.png)

El primer caracter al extremo izquierdo, representa el tipo de archivo, los posibles valores para esta posición son los siguientes:

*  -- : un guión representa un archivo comun (de texto, html, mp3, jpg, etc.)
* d : representa un directorio
* l : link, es decir un enlace o acceso directo
* b : binario, un archivo generalmente ejecutable

Los siguientes 9 restantes, representan los permisos del archivo y deben verse en grupos de 3.

Los tres primeros representan los permisos para el propietario del archivo. 
Los tres siguientes son los permisos para el grupo del archivo y los tres últimos son los permisos para el resto de usuarios.

```
rwx       rwx     rwx
usuario   grupo   otros
```

Los caracteres atribuidos a los permisos son:
* r : quiere decir escritura y viene de Read
* w : quiere decir lectura y viene de Write
* x : quiere decir ejecución y viene de eXecute


### Notación octal de los permisos :

Para asignar permisos se utilizan 3 números octal (de 0 a 7) que se obtienen tranformando un número binario que varía en función de los permisos para el usuario, grupo y otros.

![Notación Octal ](https://s3.amazonaws.com/bigdatamx/images-guides-permisos_sis-02-octal.png)

La combinación de bits encendidos o apagados en cada grupo da ocho posibles combinaciones de valores :


* -- -- --	=  0    =	no se tiene ningún permiso
* -- -- x	=  1    =	solo permiso de ejecución
* -- w --	=  2    =	solo permiso de escritura
* -- w x	=  3    =   permisos de escritura y ejecución
* r -- --	=  4	=   solo permiso de lectura
* r -- x	=  5	=   permisos de lectura y ejecución
* r w --	=  6	=   permisos de lectura y escritura
* r w x		=  7	=   todos los permisos establecidos, lectura, escritura y ejecución

Al unir los 3 permisos, los del usuario , grupo y otros :

![Notación Octal ](https://s3.amazonaws.com/bigdatamx/images-guides-permisos_sis-03-permisos.png)

### Modificar Permisos :


Los permisos se modifican usando el comando chmod; y la sintaxis es :

```chmod [opciones] permisos archivo[s]```

La estructura del comando es :

![chmod ](https://s3.amazonaws.com/bigdatamx/images-guides-permisos_sis-04-chmod-.png)


Los modificadores son : 

```
-f significa forzar 
-R recursivamente
```


### Estableciendo permisos en modo simbólico :

Es de la misma manera, sólo que en lugar de la notación númerica, se utilizan identificadores.

Los cuales son :

* usuario con la letra u
* grupo con la letra g
* otros usuarios con la letra o
* cuando nos referimos a todos (usuario, grupo, otros) con la letra a (all, todos en inglés)
* el signo + para establecer el permiso
* el signo - para eliminar o quitar el permiso

La sintaxis es :
```chmod augo[+|-]rwx[,...] archivo[s]```

Ejemplo :
```chmod o+w archivo```


### Cambiando propietario y grupo :

Para de cambiar de propietario un archivo o directorio, se utiliza el comando:
 ```chown  (change owner, cambiar propietario)```

Para cambia de grupo se utiliza el comando :
```chgrp (change group, cambiar grupo) ```


Ejemplos :

```
Comando chown :
chown usuario archivo[s]

Comando chgrp :
chgrp grupo archivo[s]
```

Y la manera más rápida de cambiar el usuario y grupo es de la siguiente manera :

```
chown usuario:grupo archivo(s)/directorio(s)
```
#### Para más información:
<!-- Please add any articles you think might be helpful to read before writing the article -->
- Permisos de archivos y directorios:   <a href='https://www.linuxtotal.com.mx/index.php?cont=info_admon_011' target='_blank' rel='nofollow'>https://www.linuxtotal.com.mx/index.php?cont=info_admon_011</a>


- Permisos :   <a href='https://thelinuxalchemist.wordpress.com/2017/04/04/gestion-de-permisos-en-linux/' target='_blank' rel='nofollow'>https://thelinuxalchemist.wordpress.com/2017/04/04/gestion-de-permisos-en-linux/</a>


- Gestión de Permisos :   <a href='https://blog.desdelinux.net/permisos-basicos-en-gnulinux-con-chmod/' target='_blank' rel='nofollow'>https://blog.desdelinux.net/permisos-basicos-en-gnulinux-con-chmod/</a>

- Administrar Permisos :   <a href='http://www.alcancelibre.org/staticpages/index.php/permisos-sistema-de-archivos' target='_blank' rel='nofollow'>http://www.alcancelibre.org/staticpages/index.php/permisos-sistema-de-archivos</a>

