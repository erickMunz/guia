---
title: 2. Comandos Necesarios para la administración de Servidores
---
## 2. Comandos Necesarios para la administración de Servidores

Linux al ser un gran sistema operativo con el que cuenta con cientos de comandos, en esta  sección tratare de resumir con un enfoque a que comandos son los que más se utilizan para la administración de servidores, se pondrán algunos ejemplos y su utilidad.

Pero como tal Linux, cuenta con varios comandos para diferentes utilidades o ámbitos. 


## Lista de Comandos

```

* cat  file =  Muestra el contenido de archivos y concatena archivos.

* cd [dir]  =  Cambia de directorio

* chown usuario:grupo fich  =  Cambia el dueño un archivo

* cp fich1  /file path/fich1  =  Copia archivos

* du [-sabr] fich  =  Reporta el tamaño del directorio

* file archivo  =   Muestra el tipo de un archivo

* mkdir dir   =  Crea un directorio

* touch file   =  Crea un archivo

* mv fich1   /file path/file  =  Mueve un archivo(s) a un directorio

* mv file1   file2   =   Renombra archivo
* ln [-s] fich acceso   =   Crea un acceso directo a un archivo

* ls -param  =  Lista el contenido del directorio

* pwd  =   Muestra la ruta actual del directorio

* rm fich  =  Borra un fichero

* rm -r dir  =  Borra todo un directorio

* rmdir dir  =  Borra un directorio vacío

* tail  file  =  Muestra el final de un archivo
* echo file ó String =  Imprime el contenido de un archivo o de una cadena de texto

* vi file  =  Edita un fichero

* kill  PID  = Termina con un proceso

* whoami   =  Muestra el usuario actual

* passwd  user =  Cambia la contraseña de un Usuario

* ps -[axiu]  =  Muestra información sobre los procesos

* who  =  Muestra información de los usuarios

* clear  =  Limpia la pantalla de la consola

* more  file  =  Muestra un archivo por partes

* du -ks <ARCHIVOS_o_DIRECTORIOS>   =  Muestra el espacio que ocupa en disco un archivo o carpeta

* Ubuntu (sudo su -)  ó  Centos (sudo -)  =  Logearse como usuario root

* uname -m   =  Muestra la arquitectura de la máquina
 
* scp file  user@host:/path/   =  Copia un arhivo local a otra máquina(host) con el usuario correspondiente

* uname -r = Muestra la versión del kernel usado

* dmidecode -q   =  Muestra los componentes (hardware) del sistema.

* init 0  =  Apaga la pc

* init 6   =  Reinicia la pc

* init (1,2,3,4,5,6)  = Niveles de ejecución del sistema

* reboot  =  reinicia el sistema

* shutdown -h now  =  Apaga el sistema

* cd ..  =  Retrocede un nivel del directorio actual

* cd –   = Regresar al directorio anterior.

* tree  Dir = Muestra los ficheros y carpetas en forma de árbol comenzando por la raíz

* groupadd nombre_del_grupo  =  Crea un nuevo grupo

* groupdel nombre_del_grupo   =  Borra un grupo

* useradd user  =  Crea un nuevo usuario. 

* userdel -r user  =  Borra un usuario (‘-r’ elimina el directorio Home)

* chmod  permisos  file   =  Cambia los permisos de un archivo 

* chmod  -R  permisos  dir  =  Cambia los permisos de un  directorio

* ifconfig  =  Muestra  las interfaces de red del sistema

* less =  Muestra el contenido de un archivo, permite búsquedas y movimento hacía atrás y adelante

* whereis objeto_a _buscar  =  Localiza el binario, fuentes y/o librerias, y documentación de un objeto

* which objeto_a_buscar =  Muestra la ruta completa de un objeto

* wget  url/file   =  Descarga un archivo por medio de la url

* ssh remote_username@remote_host  =  Conectarse de forma remota a un servidor u otro host por medio del usuario e ip

* iptables -parametros  =  Maneja, configura  y controla el firewall del sistema  

* tar -zxf  = Descomprime archivos .tar.gz  y tgz

```


#### Para más información:
<!-- Please add any articles you think might be helpful to read before writing the article -->
- Más de 400 comando para linux:   <a href='https://blog.desdelinux.net/mas-de-400-comandos-para-gnulinux-que-deberias-conocer/' target='_blank' rel='nofollow'>https://blog.desdelinux.net/mas-de-400-comandos-para-gnulinux-que-deberias-conocer/</a>
- PDF sobre comandos de linux:  <a href='http://fcaglp.unlp.edu.ar/~observacional/manuales/tutorial_linux.pdf' target='_blank' rel='nofollow'>http://fcaglp.unlp.edu.ar/~observacional/manuales/tutorial_linux.pdf</a>
