---
title: 25- Configuración de Samba
---
## Configuración de Samba 

 
Samba es un conjunto de aplicaciones que permite conectar carpetas compartidas entre PC con SO Windows con PC SO Linux, pueden cambiar información entre las mismas carpetas compartidas como si todas las PC tuvieran SO Windows.  Utilizan el protocolo SMB (Server Message Block, protocolo de red que permite compartir archivos, impresoras, etcétera, entre nodos de una red de computadoras que usan el sistema operativo Microsoft Windows).
Puede: 

1.-Compartir uno o más sistemas de archivos.
2.-Compartir impresoras, instaladas tanto en el servidor como en los clientes.
3.-Ayudar a los clientes, con visualizador de Clientes de Red.
4.-Autentificar clientes logeándose contra un dominio Windows.
5.-Proporcionar o asistir con un servidor de resolución de nombres WINS.

![Samba](https://s3.amazonaws.com/bigdatamx/images-guides-samba-01-samba.png)


##Instalación de Samba

1.-Instalar samba:
```
$ sudo apt-get install samba samba-common python-glade2 system-config-samba
``` 

Nota: realizar los siguientes pasos en caso de que no se cree el acceso directo a Samba 

Crear la carpeta de libuser.conf con el siguiente comando: 
```
$ sudo touch /etc/libuser.conf 
$ gksu system-config-samba
```

2.-Abrir el programa de Samba 
3-.Ir a la pestaña de preferencias y en configuración del servidor, debe de tener el mismo nombre del grupo de trabajo de la red en la que estamos trabajando en windows. 
4.-En la pestaña de seguridad es necesario colocar que nos autentique como usuario	y damos aceptar. 
5.-Crear una carpeta que será la que queremos compartir. 
Ejemplo: Crearla en el escritorio
a)Ir a las propiedades de la carpeta y en los permisos modificar el área dónde dice otro, en el cual colocaremos el acceso en que puedan crear y eliminar archivos. 
6.-Regresar a samba y dar click en el símbolo de agregar"+" y buscamos la carpeta que se va a compartir, dar un nombre  del recurso compartido y una pequeña descripción.
7.-Seleccionar la casilla de permiso de escritura  y de visible, así como tambien dar click en la pestaña de acceso dar click en : solo permitir acceso a usuarios  específicos, y dar click en los usuarios con los que queremos compartir(si no tienes ningun usuario, realiza los siguientes pasos para crearlo). 
8.-Configuración de usuarios
Dar click en el menu de preferencias, añadir usuario dar click en el nombre del usuario que queremos agregar. 
Para ingresar con un usuario windows tenemos que poner el nombre de "userwindows"
Dar una contraseña y guardamos el usuario. 

9.-Reiniciar el servicio de Samba con el siguiente comando: 
```
$ sudo service smbd restart
```

10.-Para acceder Samba realizamos lo siguiente: 
En algun directorio de las carpetas modificar el path a: smb://ip-maquinalinux/nombre-del-recurso

Para mayor información: <a href='https://www.youtube.com/watch?v=PHVP2D62FjI' target='_blank' rel='nofollow'>https://www.youtube.com/watch?v=PHVP2D62FjI</a>

Información sobre Samba: <a href='https://ubunlog.com/instala-configura-samba-ubuntu/' target='_blank' rel='nofollow'>https://ubunlog.com/instala-configura-samba-ubuntu/</a>

