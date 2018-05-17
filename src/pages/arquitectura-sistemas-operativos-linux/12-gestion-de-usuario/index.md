---
title: 12. Gestión de Usuarios
---
## 12. Gestión de Usuarios


### Administración de usuarios :

Linux es un sistema multiusuario, por lo tanto, la tarea de añadir, modificar, eliminar y en general administrar usuarios no es algo muy complicado y mejora la seguridad de un sistema linux, junto con sus carpetas, etc.


### Tipos de usuarios :
 
Los usuarios en Linux, se identifican por un id, además de que un usuario pertenece a un grupo, y los grupos también se identifican por un id;
Un usuario puede pertencer a varios grupos de usuarios.

Se identifican tres tipos de usuarios :

##### Usuario Root :

* También llamado superusuario o administrador.
* Su UID (User ID) es 0 (cero).
* Es la única cuenta de usuario con privilegios sobre todo el sistema.
* Acceso total a todos los archivos y directorios con independencia de propietarios y permisos.
* Controla la administración de cuentas de usuarios.
* Ejecuta tareas de mantenimiento del sistema.
* Puede detener el sistema.
* Instala software en el sistema.
* Puede modificar o reconfigurar el kernel, controladores, etc.

##### Usuarios especiales

* Se les llama también cuentas del sistema.
* No tiene todos los privilegios del usuario root, pero dependiendo de la cuenta asumen distintos privilegios de root.
* Lo anterior para proteger al sistema de posibles formas de vulnerar la seguridad.
* No tienen contraseñas pues son cuentas que no están diseñadas para iniciar sesiones con ellas.
* También se les conoce como cuentas de "no inicio de sesión" (nologin).
* Se crean (generalmente) automáticamente al momento de la instalación de Linux o de la aplicación.
* Generalmente se les asigna un UID entre 1 y 100 (definifo en /etc/login.defs)

##### Usuarios normales
* Se usan para usuarios individuales.
* Cada usuario dispone de un directorio de trabajo, ubicado generalmente en /home.
* Cada usuario puede personalizar su entorno de trabajo.
* Tienen solo privilegios completos en su directorio de trabajo o HOME.
* Por seguridad, es siempre mejor trabajar como un usuario normal en vez del usuario root, y cuando se requiera hacer uso de comandos solo de root, utilizar el comando su.
* En las distros actuales de Linux se les asigna generalmente un UID superior a 500

### Archivos :
#### /etc/passwd
En este archivo se encuentran definidas todas las cuentas de usuario, se ubica en el directorio etc.
Este archivo se crea automáticamente al instalar el sistema operativo, además en este achivo se van agregando automáticamente los usuarios, ya sea si los creamos manualmente o son agregados al instalar un software.


El archivo /etc/passwd contiene una linea para cada usuario: 

```
root:x:0:0:root:/root:/bin/bash
sergio:x:501:500:Sergio González:/home/sergio:/bin/bash
```

Cada parametro separado por un :, es un campo; y en total cada línea tiene 7 campos.

Los campos son:

* Campo 1 :	Es el nombre del usuario, identificador de inicio de sesión (login). Tiene que ser único.
* Campo 2 :	La 'x' indica la contraseña encriptada del usuario, además también indica que se está haciendo uso del archivo /etc/shadow, si no se hace uso de este archivo, este campo se vería algo así como: 'ghy675gjuXCc12r5gt78uuu6R'.
* Campo 3 :	Número de identificación del usuario (UID). Tiene que ser único. 0 para root, generalmente las cuentas o usuarios especiales se numeran del 1 al 100 y las de usuario normal del 101 en delante, en las distribuciones mas recientes esta numeración comienza a partir del 500.
* Campo 4 :	Numeración de identificación del grupo (GID). El que aparece es el número de grupo principal del usuario, pero puede pertenecer a otros, esto se configura en /etc/groups.
* Campo 5 :	Comentarios o el nombre completo del usuario.
* Campo 6 :	Directorio de trabajo donde se sitúa al usuario después del inicio de sesión.
* Campo 7 :	Shell que va a utilizar el usuario de forma predeterminada.

#### /etc/shadow
Es un archivo en el cual se encuentran almacendas las contraseñas de los usuarios, estas contraseña se encuentran y se muestran cifradas, también almacena otros campos por usuario, este archivo solo puede ser utilizado por un usuario root.

El archivo /etc/shadow contiene una línea para cada usuario :

```
root:ghy675gjuXCc12r5gt78uuu6R:10568:0:99999:7:7:-1::
sergio:rfgf886DG778sDFFDRRu78asd:10568:0:-1:9:-1:-1::
```

Cada línea cuenta con 9 campos separados por : .

Los campos son: 

* Campo 1 :	Nombre de la cuenta del usuario.
* Campo 2 :	Contraseña cifrada o encriptada, un '*' indica cuenta de 'nologin'.
* Campo 3 :	Días transcurridos desde el 1/ene/1970 hasta la fecha en que la contraseña fue cambiada por última vez.
* Campo 4 :	Número de días que deben transcurrir hasta que la contraseña se pueda volver a cambiar.
* Campo 5 :	Número de días tras los cuales hay que cambiar la contraseña. (-1 significa nunca). A partir de este dato se obtiene la fecha de expiración de la contraseña.
* Campo 6 :	Número de días antes de la expiración de la contraseña en que se le avisará al usuario al inicio de la sesión.
* Campo 7 :	Días después de la expiración en que la contraseña se inhabilitara, si es que no se cambio.
* Campo 8 :	Fecha de caducidad de la cuenta. Se expresa en días transcurridos desde el 1/Enero/1970 (epoch).
* Campo 9 :	Reservado.


  
#### /etc/group :

Este archivo guarda la relación de los grupos a los que pertenecen los usuarios del sistema, contiene una línea para cada usuario con tres o cuatro campos por usuario:

```
cat /etc/group :

root:x:0:root
ana:x:501:
sergio:x:502:ventas,supervisores,produccion
cristina:x:503:ventas,sergio
```

Campos :
* El campo 1 indica el usuario.
* El campo 2 'x' indica la contraseña del grupo, que no existe, si hubiera se mostraría un 'hash' encriptado.
* El campo 3 es el Group ID (GID) o identificación del grupo.
* El campo 4 es opcional e indica la lista de grupos a los que pertenece el usuario


Automaticamente al crear un usuario con useradd se crea también su grupo principal de trabajo GID, con el mismo nombre del usuario.

#### /etc/login.defs :

En el archivo de configuración /etc/login.defs están definidas las variables que controlan los aspectos de la creación de usuarios y de los campos de shadow usadas por defecto. 

Algunos de los aspectos que controlan estas variables son:

* Número máximo de días que una contraseña es válida PASS_ MAX_D AYS
* El número mínimo de caracteres en la contraseña PASS_ MIN_ LEN
* Valor mínimo para usuarios normales cuando se usa useradd UID_ MIN
* El valor umask por defecto UMASK
* Si el comando useradd debe crear el directorio home por defecto CREATE_HOME

### Manejo de Usuarios :

#### Creación de Usuarios :

Para crear un nuevo usuario se utilizan los siguientes comandos :useradd o adduser, estos comandos permiten añadir nuevos usuarios al sistema desde la línea de comandos. 

Sus opciones más comunes o importantes son las siguientes:

* -c añade un comentario al momento de crear al usuario, campo 5 de /etc/passwd
* -d directorio de trabajo o home del usuario, campo 6 de /etc/passwd
* -e fecha de expiración de la cuenta, formato AAAA-MM-DD, campo 8 de /etc/shadow
* -g número de grupo principal del usuario (GID), campo 4 de /etc/passwd
* -G otros grupos a los que puede pertenecer el usuario, separados por comas.
* -r crea una cuenta del sistema o especial, su UID será menor al definido en /etc/login.defs en la variable UID_MIN, además no se crea el directorio de inicio.
* -s shell por defecto del usuario cuando ingrese al sistema. Si no se especifica, bash, es el que queda establecido.
* -u UID del usuario, si no se indica esta opción, automáticamente se establece el siguiente número disponible a partir del último usuario creado.

Al momento de crear un usuario ta,bien se crean todos los directorios correspondientes; se creará el usuario y su grupo, asi como las entradas correspondientes en /etc/passwd, /etc/shadow, /etc/group y su directorio home.


Ejemplo de como crear un usuario :

```
#> useradd juan
``` 

#### Modificación de Usuarios :

Para realizar modificaciones a un usuario se utiliza el comando usermod, este comando permite modificar los parametros de un usuario.

Las opciones con los que cuenta son :

* -c añade o modifica el comentario, campo 5 de /etc/passwd
* -d modifica el directorio de trabajo o home del usuario, campo 6 de /etc/passwd
* -e cambia o establece la fecha de expiración de la cuenta, formato AAAA-MM-DD, campo 8 de /etc/shadow
* -g cambia el número de grupo principal del usuario (GID), campo 4 de /etc/passwd
* -G establece otros grupos a los que puede pertenecer el usuario, separados por comas.
* -l cambia el login o nombre del usuario, campo 1 de /etc/passwd y de /etc/shadow
* -L bloque la cuenta del usuario, no permitiendolé que ingrese al sistema. No borra ni cambia nada del usuario, solo lo deshabilita.
* -s cambia el shell por defecto del usuario cuando ingrese al sistema.
* -u cambia el UID del usuario.
* -U desbloquea una cuenta previamente bloqueada con la opción -L.

Ejemplo :

```
Cambiar el nombre del usuario sergio a sego. 

# usermod -l sego sergio
```

#### Eliminar Usuarios :
Para eliminar un usuario se utiliza el comando userdel, existen 3 maneras de eliminar un usuario:


* userdel nombre_user :
Este comando elimina la cuenta del usuario de /etc/passwd y de /etc/shadow, pero no elimina su directorio de trabajo ni archivos contenidos en el mismo, este comando elimina la cuenta pero no la información de la misma.

```
Ejemplo :

# userdel javier
```

* userdel -r nombre_user

Este comando lo que hace a diferencia del solo userdel, es que este elimina todo completamente, incluyendo los directorios de trabajo, la carpeta de home.

La cuenta no se podrá eliminar si el usuario esta logueado o en el sistema al momento de ejecutar el comando.

```
Ejemplo :
# userdel -r javier
```

* userdel -f nombre_user :
Este comando lo que hace es que hace lo mismo que el comando userdel -r, solo que la unica diferencia es que elimina el usuario aunque el usuario este logueado.

```
Ejemplo :

userdel -f javier
```
#### Cambiar contraseña a Usuarios :

Para cambiar la contraseña a un usuario se utiliza el siguiente comando :

```
# passwd nombre_user
```

El usuario root, es el único que puede manejar las contraseñas de los usuarios; además el comando passwd tiene integrado validación de contraseñas comunes, cortas, de diccionario, etc.

Para cambiar la contraseña a un usuario, el usuario debe de existir.}

```
Ejemplo de utilización de passwd :

#> passwd javier
Changing password for user prueba.
New UNIX password:
Retype new UNIX password:
passwd: all authentication tokens updated successfully.
#>
```

#### Archivos de configuración de un Usuario :


Los usuarios normales y root en sus directorios de inicio tienen varios archivos que comienzan con "." es decir están ocultos. 

Algunos ejemplos son :

* .bash_profile aquí podremos indicar alias, variables, configuración del entorno, etc. que deseamos iniciar al principio de la sesión.

* .bash_logout aquí podremos indicar acciones, programas, scripts, etc., que deseemos ejecutar al salirnos de la sesión.

* .bashrc es igual que .bash_profile, se ejecuta al principio de la sesión, tradicionalmente en este archivo se indican los programas o scripts a ejecutar, a diferencia de .bash_profile que configura el entorno.


### Manejo de Grupos :

#### Creación de grupos :

En este caso, tenemos el comando groupadd, tan solo debemos indicar el nombre del grupo como parámetro. 

```
Ejemplo crear un grupo :

# sudo groupadd bigdata

```

### Modificación de grupos :

Los grupos también pueden ser modificados al igual que hacemos con los usuarios. 
Para ello, usamos el comando groupmod. En el caso de los grupos podemos editar su nombre o su gid(id).

La sintaxis para el comando es: sudo groupmod [-g nuevo-gid] [-n nuevo-nombre] nombre-grupo, ejemplo:

```
# sudo groupmod -g 2000 bigdata

```

### Eliminación de grupos :

Se utiliza el comando groupdel seguido del nombre del grupo, para eliminar a un usuario.

```
sudo groupdel bigdata
```


Se eliminará el grupo sólo en caso de que no tenga usuarios con el grupo asignado como primario. 
Si existiera algún usuario con esta condición, el grupo no se eliminara.


### Añadir usuarios a un grupo :

Para añadir un usuario se utiliza el comando adduser y a continuación el nombre del usuario y el nombre del grupo. 

El usuario debe de existir para que se pueda añadir.

```
Ejemplo agregar un usuario :

sudo adduser javier bigdata
```


### Quitar usuarios de un grupo :

Para eliminar un usuario de un grupo, utilizamos el comando deluser acompañado del nombre del usuario y del grupo. 

```
Ejemplo si queremos quitar un usuario :
sudo deluser luis bigdata
```



#### Para más información:
<!-- Please add any articles you think might be helpful to read before writing the article -->
- Gestión de Usuarios:   <a href='https://www.linuxtotal.com.mx/index.php?cont=info_admon_008' target='_blank' rel='nofollow'>https://www.linuxtotal.com.mx/index.php?cont=info_admon_008</a>


- Gestión de Grupos:   <a href='https://www.profesionalreview.com/2017/03/11/gestionar-usuarios-grupos-linux/' target='_blank' rel='nofollow'>https://www.profesionalreview.com/2017/03/11/gestionar-usuarios-grupos-linux/</a>

- Mas información :
* <a href='https://www.fing.edu.uy/tecnoinf/mvd/cursos/adminf/material/ADI-usuarios-y-grupos-en-linux.pdf' target='_blank' rel='nofollow'>https://www.fing.edu.uy/tecnoinf/mvd/cursos/adminf/material/ADI-usuarios-y-grupos-en-linux.pdf</a>
* <a href='https://jlquerol.files.wordpress.com/2012/01/comandos-linux-para-gestiocc81n-de-usuarios-y-grupos1.pdf' target='_blank' rel='nofollow'>https://jlquerol.files.wordpress.com/2012/01/comandos-linux-para-gestiocc81n-de-usuarios-y-grupos1.pdf</a>
