---
title: 28. Programación Bash
---
##28. Programación Bash

### Shell :
Es la interfaz entre el usuario y el sistema operativo; permitiéndole interactuar con el sistema y sus recursos.

### Bash :
Bash (Bourne	Again	SHell); es un interprete	de	los	comandos	UNIX	del	
usuario, escrito para el proyecto GNU.
Es un bash en el cual el usuario teclea los comandos y el sistemas por medio de bash reconoce los comandos y los interpreta.


### Características principales de BASH :

* Ejecución síncrona de órdenes (una tras otra) o asíncrona (en paralelo).
* Distintos tipos de redirecciones de entradas y salidas para el control y filtrado de la
información.
* Control del entorno de los procesos.
* Ejecución de mandatos interactiva y desatendida, aceptando entradas desde teclado o
desde ficheros.
* Proporciona una serie de órdenes internas para la manipulación directa del intérprete y
su entrono de operación.
* Un lenguaje de programación de alto nivel, que incluye distinto tipos de variables,
operadores, matrices, estructuras de control de flujo, entrecomillado, sustitución de
valores y funciones.
* Control de trabajos en primer y segundo plano.
* EAcceso al historial de comandos ejecutados.

### Scripting :

El shell scripting permite utilizar las capacidades de la shell para
automatizar múltitud de tareas, en el cual te creas un archivo y dentro del archivo escribe los comandos
que quieras realizar, y una ves creado el archivo se ejecuta, y automaticamente ejecuta el proceso; 
es una forma de automatizar un proceso sin tener que escribir a cada rato los comandos.


### La línea de comandos :

La línea de comandos es el interfaz del usuario con el sistema, que permite personalizar el
entorno de operación y ejecutar programas y guiones.

El formato típico de una línea consta de una orden y unos modificadores y parámetros
opcionales, aunque puede incluir algunos caracteres especiales, que modifican el
comportamiento típico.

### Requerimientos para el Scripting :
* Una terminal
* Un editor, puede ser vi , nano , gedit, u otro.

### Shebang :
Al momento de crear una archivo, en ese script se coloca un header (Shebang),
el cual le dice al shell con qué programa interpretar el script, cuando se ejecuta.

* Tipos de Shebang :
```
#!/bin/sh — Ejecuta usando sh, the Bourne shell
#!/bin/bash — Ejecuta utilizando el interprete bash
#!/usr/bin/perl -T — Ejecuta Utilizando Perl
#!/usr/bin/php — Ejecuta utilizando Php
#!/usr/bin/python -O — Ejecuta utilizando python
#!/usr/bin/ruby — Ejecuta usando Ruby
```




### Crear primer Script :

Para crea un Script, primero se abre una terminal :
```ctrl alt t```

Una vez en la terminal, creas un archivo, el archivo puede tener extensión sh o no puede tener ninguna extensión; 

Si se quiere hacer un script de un lenguaje especifico, se le coloca la terminación adecuada al archivo ( .py, .php, .go, etc).

Ejemplo :
```javier@javier-orta:~$ touch primer_script```

Una vez ejecutado el comando, procedemos a ver si se creo el archivo :
```ls   ó   ls | grep primer_script```

Y nos tiene que mostrar lo siguiente :
```
javier@javier-orta:~$ ls | grep primer_script
primer_script
javier@javier-orta:~$
``` 
Ahora abrimos el archivo con cualquier editor :
```javier@javier-orta:~$ nano primer_script```

Después editamos el archivo, y al principio en la primera linea colocamos el header :
```#!/bin/bash        ya que lo creamos sin ninguna extensión```

Y para imprimir un hola mundo se utiliza el comando echo, es el que se encarga de los prints :
```
#!/bin/bash
echo "hola mundo"
```
Por último guardamos los cambios al archivo , y le damos permisos, como es script para un sólo print
le damos todos los permisos, pero los permisos es un tema muy importante, ya que depende de para que 
se va a utilizar el script y de acuerdo a eso es de como se le deben de asignar los permisos y sólo  el usuario root
o algún usuario administrador puede dar y quitar permisos  :
```javier@javier-orta:~$ sudo chmod 777 primer_script```

Ahora verificamos los permisos :
```
javier@javier-orta:~$ ls -lr | grep primer_script
-rwxrwxrwx  1 javier javier         30 feb 12 11:35 primer_script
javier@javier-orta:~$ 

```

Y cómo notamos tiene todos los permisos.

procedemos a ejecutar el script, es de la siguiente manera:

```# ./nombre_script```

Y ahora procedemos a ejecutar nuestro Script :
```
javier@javier-orta:~$ ./primer_script 
hola mundo
javier@javier-orta:~$ 
```
Y cómo notamos imprime el hola mundo.

### Recomendaciones de Scripting :
* El código debe ser fácilmente legible, incluyendo espacios y sangrías que separen
claramente los bloques de código
* Deben añadirse comentarios claros sobre el funcionamiento general del programa
principal y de las funciones, que contengan: autor, descripción, modo de uso del
programa, versión y fechas de modificaciones.
* Incluir comentarios para los bloques o mandatos importantes, que requieran cierta
aclaración.
* Agregar comentarios y ayudas sobre la ejecución del programa.
* Depurar el código para evitar errores, procesando correctamente los parámetros de
ejecución.
* No desarrollar un código excesivamente enrevesado, ni complicado de leer, aunque
ésto haga ahorrar líneas de programa.
* Utilizar funciones y las estructuras de programación más adecuadas para evitar repetir
código reiterativo.
* Los nombres de variables, funciones y programas deben ser descriptivos, pero sin
confundirse con otros de ellos, ni con los mandatos internos o externos; no deben ser
ni muy largos ni muy cortos.
* Todos los nombres de funciones y de programas suelen escribirse en letras
minúsculas, mientras que las variables acostumbran a definirse en mayúsculas.


#  Redirecciones :

Las redirecciones representan las
funciones de entrada y salida de cada programa. Éstos son:
* Entrada estándar: procede del teclado; abre el fichero con descriptor 0 (stdin) para
lectura.
* Salida estándar: se dirige a la pantalla; abre el fichero con descriptor 1 (stdout) para
escritura.
* Salida de error: se dirige a la pantalla; abre el fichero con descriptor 2 (stderr) para
escritura y control de mensajes de error.

El proceso de redirección permite hacer una copia de uno de estos ficheros especiales hacia o
desde otro fichero normal.

 
Ejemplo: stdout a un fichero

Esto hará que la salida se escriba en un fichero.
```ls -l > ls-l.txt```
        
En este caso, se creará un fichero llamado 'ls-l.txt' que contendrá lo que ejecuta y muestra el comando.
Lo verificamos de la siguiente manera :
```javier@javier-orta:~$ cat ls-l.txt ```

Y mostramos lo que tiene el archivo.
```
javier@javier-orta:~$ cat ls-l.txt 
total 5675796
drwxr-xr-x  3 root   root         4096 feb  1 10:29  
drwxrwxr-x  3 javier javier       4096 ene 30 09:52 Android
drwxr-xr-x  2 javier javier       4096 feb  6 18:08 cloudera-quickstart-vm-5.12.0-0-vmware
-rw-rw-r--  1 javier javier 5811085017 dic 23 18:06 cloudera-quickstart-vm-5.12.0-0-vmware.zip
drwxr-xr-x  2 javier javier       4096 jul 19  2017 cloudera-quickstart-vm-5.12 (copia).0-0-vmware
drwxrwxr-x  8 javier javier       4096 ene 31 17:23 config hadoop cluster
-rw-------  1 javier javier          0 feb  7 12:31 core
-rw-r--r--  1 root   root          653 feb  1 10:33 derby.log
drwxr-xr-x  3 javier javier       4096 feb  9 17:29 Descargas
drwxr-xr-x  3 javier javier       4096 feb  9 17:28 Documentos
drwxr-xr-x  2 javier javier       4096 ene 29 16:53 Escritorio
-rw-r--r--  1 javier javier       8980 ene 29 10:43 examples.desktop
drwxrwxrwx  3 javier javier       4096 feb  9 10:18 Git
-rw-rw-r--  1 javier javier         24 ene 30 15:46 hola.scala
drwxrwxr-x  3 javier javier       4096 ene 30 11:43 IdeaProjects
drwxr-xr-x  2 javier javier       4096 feb  9 17:47 Imágenes
drwxrwxr-x  2 javier javier       4096 dic 16 09:28 ingestaHadoop
-rw-rw-r--  1 javier javier        106 feb  1 10:50 iniciarHadoopCluster
-rw-rw-r--  1 javier javier          0 feb 12 12:08 ls-l.txt
drwxr-xr-x  5 root   root         4096 feb  1 10:33 metastore_db
drwxr-xr-x  2 javier javier       4096 ene 29 10:59 Música
drwxr-xr-x  2 javier javier       4096 ene 29 10:59 Plantillas
-rwxrwxrwx  1 root   root       794639 feb  1 12:11 postgresql-42.2.1.jar
-rwxrwxrwx  1 javier javier         30 feb 12 11:35 primer_script
drwxr-xr-x  2 javier javier       4096 ene 29 10:59 Público
drwxrwxr-x 28 javier javier       4096 feb  6 09:58 Software
drwxr-xr-x  2 javier javier       4096 ene 29 10:59 Vídeos
drwxrwxr-x  4 javier javier       4096 ene 30 12:07 VirtualBox VMs
drwxrwxr-x  2 javier javier       4096 ene 29 15:44 vmware
drwxrwxr-x  3 javier javier       4096 ene 29 16:57 workspace-scala
-rw-r--r--  1 root   root         6997 feb  1 10:33 zookeeper.out
javier@javier-orta:~$ 

```


### Tuberías o pipes :
Una tubería o pipe es una combinación de varios comandos que se ejecutan
simultáneamente, donde el resultado del primero se envía a la entrada del siguiente. Esta
tarea se realiza por medio del carácter barra vertical | .

Ejemplo :
Hacer un ls que pase por un grep (filtro)
```javier@javier-orta:~$ ls | grep ".scala"```
Lo que hace es que primero ejecuta el comando ls, y luego el resultado del ls lo pasa al grep, en el cual 
hacemos el filtro.

Y el resultado es:
```
javier@javier-orta:~$ ls | grep ".scala"
hola.scala
workspace-scala
javier@javier-orta:~$ 

``` 
### Variables :

Se pueden usar variables como en cualquier otro lenguaje de programación. No existen tipos de datos. Una variable de bash puede contener un número, un caracter o una cadena de caracteres.

No necesita declarar una variable. Se creará sólo con asignarle un valor a su referencia.
  
Ejemplo :

```
#!/bin/bash          
CAD="¡Hola Mundo!"
echo $CAD    
```

#### Tipos de variables :
Las variables del intérprete BASH pueden considerarse desde los siguientes puntos de vista:
* Las variables locales son definidas por el usuario y se utilizan únicamente dentro de
un bloque de código, de una función determinada o de un guión.
* Las variables de entorno son las que afectan al comportamiento del intérprete y al de
la interfaz del usuario.
* Las variables especiales son aquellas que tienen una sintaxis especial y que hacen
referencia a valores internos del proceso. Los parámetros de posición pueden incluirse
en esta categoría.


#### Variables locales :
Las variables locales son definidas para operar en un ámbito reducido de trabajo, ya sea en un
programa, en una función o en un bloque de código. Fuera de dicho ámbito de operación, la
variable no tiene un valor preciso.
  
Ejemplo :
```
#!/bin/bash          
CAD="¡Hola Mundo!"
echo $CAD 
```

Cad es una variable local, ya que sólo se útiliza en ese bloque.

####  Variables de entorno :

Las Variables del entorno se establecen por el sistema y se pueden
encontrar utilizando el comando env.
Las variables de entorno contiene valores especiales. 
Las variables del entorno se definen en /etc/profile,
/etc/profile.d/ y ~/.bash_profile.
Estos ficheros son de inicialización y son leídos cuando
se invoca la bash shell.

Ejemplo imprimir una variable de entorno:
```
#!/bin/bash          
echo $PATH
echo $JAVA_HOME
```

En este Ejemplo imprimimos la variable de entorno de JAVA_HOME y del PATH, y estas variables encuentran 
en bashrc , o en cualquier archivo ya mencionado :

Para mostrar la variables pode realizar lo siguiente :
```javier@javier-orta:~$ cat ~/.bashrc```

Y nos muestra algo parecido :
```
JAVA_HOME=/home/javier/Software/jdk1.8.0_162
PATH=$PATH:$HOME/bin:$JAVA_HOME/bin
export JAVA_HOME
export PATH

SCALA_HOME=/home/javier/Software/scala-2.12.4
PATH=$PATH:$SCALA_HOME/bin
export SCALA_HOME
export PATH

GOROOT=/home/javier/Software/go
PATH=$PATH:$GOROOT/bin
export GOROOT
export PATH

export SPARK_HOME=/home/javier/Software/spark
export PATH=$PATH:$SPARK_HOME/bin

export NEO4J_HOME=/home/javier/Software/neo4j-community-3.3.2
export PATH=$PATH:$NEO4J_HOME/bin

```

####   Variables especiales :
Las variables especiales informan sobre el estado del proceso, son tratadas y modificadas
directamente por el intérprete, por lo tanto, son de sólo lectura. La siguiente tabla muestra estas variables.

![Variables especiales ](https://s3.amazonaws.com/bigdatamx/images-guides-bash-01-variables.png)


### Condicionales (if) :

La sintaxis básica de un condicional es la siguiente:

```
if [[ CONDICIÓN 1 ]];
	then
	  COMANDO 1 si se cumple la condición 1
	elif [[ CONDICIÓN 2 ]];
	then
	  COMANDO 2 si se cumple la condición 2
	else
	  COMANDO 3 si no se cumple la condición 2
	fi
```

Al comparar números podemos realizar las siguientes operaciones:

```
operador	significado
-lt			menor que (<)
-gt			mayor que (>)
-le			menor o igual que (<=)
-ge			mayor o igual que (>=)
-eq			igual (==)
-ne			no igual (!=)
```

Ejemplo :
```
#!/bin/bash
num1=1  # la variable toma el primer valor que le pasamos al script
num2=2  # la variable toma el segundo valor que le pasamos al script
if [[ $num1 -gt $num2 ]];
then
  echo $num1 es mayor que $num2
else
  echo $num2 es mayor que $num1
fi
```
Ejecución :
```
javier@javier-orta:~$ ./primer_script 
2 es mayor que 1
javier@javier-orta:~$ 

```

A la hora de comparar cadenas de texto:
```
operador	significado
=			igual, las dos cadenas de texto son exactamente idénticas
!=			no igual, las cadenas de texto no son exactamente idénticas
<			es menor que (en orden alfabético ASCII)
>			es mayor que (en orden alfabético ASCII)
-n			la cadena no está vacía
-z			la cadena está vacía
```

Ejemplo :
```
#!/bin/bash
string1='reo'
string2='teo'
if [[ $string1 > $string2 ]];
then
  echo True
else
  echo False
fi
```

Ejecución :
```
javier@javier-orta:~$ ./primer_script 
False
javier@javier-orta:~$
```

Condicionales con archivos :

```
operador	Devuelve true si
-e name		name existe
-f name		name es un archivo normal (no es un directorio)
-s name		name NO tiene tamaño cero
-d name		name es un directorio
-r name		name tiene permiso de lectura para el user que corre el script
-w name		name tiene permiso de escritura para el user que corre el script
-x name		name tiene permiso de ejecución para el user que corre el script
```

Ejemplo :
```
#!/bin/bash
FILE=$@
if [ -f $FILE ]; then
echo el fichero $FILE existe
else
echo fichero no encontrado
fi
```

Ejecución :
```
javier@javier-orta:~$ ./primer_script Android/
fichero no encontrado
javier@javier-orta:~$ 
```

Operadores Arítmeticos :

```
+ 		suma
- 		resta
* 		multiplicación
/ 		división
** 		exponenciación
% 		módulo
```

Ejemplo :
```
#!/bin/bash
var1=12
var2=3
echo "suma :" $((var1+var2))
echo "resta :" $((var1-var2))
echo "potencia : " $((var1**var2))
echo "multiplicacion : " $((var1*var2))  

```

Ejecución :
```
javier@javier-orta:~$ ./primer_script 
suma : 15
resta : 9
potencia : 1728
multiplicacion : 36
javier@javier-orta:~$ 
```

###  Los bucles for, while y until :

El bucle for es distinto a los de otros lenguajes de programacion. Básicamente, le permite iterar sobre una serie de
'palabras' contenidas dentro de una cadena.

  
El bucle while ejecuta un trozo de codigo si la expresión de control es verdadera, y sólo se para cuando es falsa (o se 
encuentra una interrupcion explícita dentro del codigo en ejecución). 
  
El bucle until es casi identico al bucle loop, excepto en que el código se ejecuta mientras la expresión de control se 
evalue como falsa.	


Ejemplo for :
```
#!/bin/bash
for i in $( ls ); do
echo item: $i
done
```

Ejecución :
```
javier@javier-orta:~$ ./primer_script Android/
item: Android
item: cloudera-quickstart-vm-5.12.0-0-vmware
item: cloudera-quickstart-vm-5.12.0-0-vmware.zip
item: cloudera-quickstart-vm-5.12
item: (copia).0-0-vmware
item: config
item: hadoop
item: cluster
item: core
item: derby.log
item: Descargas
item: Documentos
item: Escritorio
item: examples.desktop
item: Git
item: hola.scala
item: IdeaProjects
item: Imágenes
item: ingestaHadoop
item: iniciarHadoopCluster
item: ls-l.txt
item: metastore_db
item: Música
item: Plantillas
item: postgresql-42.2.1.jar

```

Ejemplo while:

```
#!/bin/bash
CONTADOR=0
while [ $CONTADOR -lt 10 ]; do
echo El contador es $CONTADOR
let CONTADOR=CONTADOR+1
done
```

Ejecución :
```
javier@javier-orta:~$ ./primer_script 
El contador es 0
El contador es 1
El contador es 2
El contador es 3
El contador es 4
El contador es 5
El contador es 6
El contador es 7
El contador es 8
El contador es 9

```

Ejemplo until :
```
#!/bin/bash
CONTADOR=20
until [ $CONTADOR -lt 10 ]; do
echo CONTADOR $CONTADOR
let CONTADOR-=1
done
```

Ejecución :
```
javier@javier-orta:~$ ./primer_script 
CONTADOR 20
CONTADOR 19
CONTADOR 18
CONTADOR 17
CONTADOR 16
CONTADOR 15
CONTADOR 14
CONTADOR 13
CONTADOR 12
CONTADOR 11
CONTADOR 10

```

### Funciones :
Utilizar funciones se utilizan para agrupar trozos de código de una manera 
mas lógica o estructurada.
Declarar una funcion sólo se escribe : function mi_func { mi codigo  }.
Llamar a la funcion  sólo hay que escribir su nombre.

Ejemplo :
```
#!/bin/bash

function hola {
echo Hola!
}

hola

```

Ejecución :
```
javier@javier-orta:~$ ./primer_script 
Hola!
javier@javier-orta:~$
```

### Manipulación de cadenas de texto :

Extraer subcadena
Mediante ${cadena:posicion:longitud} podemos extraer una subcadena de otra cadena. 

Ejemplo :
```
#!/bin/bash
#Por ejemplo en la cadena string=abcABC123ABCabc:
string=abcABC123ABCabc
echo ${string:0} # : abcABC123ABCabc
echo ${string:0:1} # : a (primer caracter)
echo ${string:7} #: 23ABCabc
echo ${string:7:3} # : 23A (3 caracteres desde posición 7)
echo ${string:7:-3} # : 23ABCabc (desde posición 7 hasta el final)
echo ${string: -4} #: Cabc (atención al espacio antes del menos)
echo ${string: -4:2} # : Ca (atención al espacio antes del menos)
```

Ejecución :

```
javier@javier-orta:~$ ./primer_script 
abcABC123ABCabc
a
23ABCabc
23A
23ABC
Cabc
Ca

```


#### Para más información:
<!-- Please add any articles you think might be helpful to read before writing the article -->
- Programación Avanzada en Shell:   <a href='http://www.informatica.us.es/~ramon/articulos/Programacion-BASH.pdf' target='_blank' rel='nofollow'>http://www.informatica.us.es/~ramon/articulos/Programacion-BASH.pdf</a>

- El She Bash :
<a href='https://ubuntulife.files.wordpress.com/2009/02/bash.pdf' target='_blank' rel='nofollow'>https://ubuntulife.files.wordpress.com/2009/02/bash.pdf</a> 


- Programacion en BASH :
<a href='http://es.tldp.org/COMO-INSFLUG/es/pdf/Bash-Prog-Intro-COMO.pdf' target='_blank' rel='nofollow'>http://es.tldp.org/COMO-INSFLUG/es/pdf/Bash-Prog-Intro-COMO.pdf</a> 

- Programacion Shell :
<a href='https://www.freeshell.de/~rasoda/programacion/guia-shell.pdf' target='_blank' rel='nofollow'>https://www.freeshell.de/~rasoda/programacion/guia-shell.pdf</a> 


- Scripts de bash :
<a href='https://bioinf.comav.upv.es/courses/unix/scripts_bash.html#manipulacin-de-cadenas-de-texto' target='_blank' rel='nofollow'>https://bioinf.comav.upv.es/courses/unix/scripts_bash.html#manipulacin-de-cadenas-de-texto</a> 

- Expresiones Regulares :
<a href='http://tldp.org/LDP/GNU-Linux-Tools-Summary/html/x11655.htm' target='_blank' rel='nofollow'>http://tldp.org/LDP/GNU-Linux-Tools-Summary/html/x11655.htm</a> 


