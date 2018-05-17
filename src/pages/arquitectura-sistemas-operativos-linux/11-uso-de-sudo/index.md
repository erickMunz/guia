---
title: 11-Uso de sudo
---
## Uso de sudo 


En linux se tiene un administrador(root), el cual es capaz de manipular todo el sistema, sin importar los daños que este pueda crear, por este "problema", se requirió implementar otra manera de que el usuario tuviera acceso a toda la administración del sistema, pero teniendo en cuenta que algunas operaciones no podría acceder a ella por seguridad del sistema completo. 

Por lo que el administrador que se crea en primera instancia cuando se instala por primera vez el sistema operativo, es capaz de tener la herramienta sudo, que le permite administrar todo el sistema  para poder ejecutar casi todos los comandos de administracion del sistema,así guardando su integridad en lo mayor posible. 

De acuerdo a la configuración del archivo /etc/sudoers, es dónde  se determina quien está autorizado para utilizar sudo. 

Para seguridad, este modo requiere que el usuario ingrese su contraseña como sudo(la cual es diferente a la de root). 

## Instalación de sudo 

Ingresamos a una terminal e ingresamos como root con el siguiente comando:
```
su
```

Instalar el paquete de sudo: 
```
apt-get install sudo
```


##Agregar nuevo usuario administrador

Para agregar un nuevo usuario es necesario ejecutar el siguiente comando en terminal: 
```
sudo adduser nuevo_usuario 
Nota: cambiar "nuevo_usuario", por el nombre del usuario que quiere ser nuevo administrador.
```

Brindar los permisos al nuevo usuario: 
```
 sudo adduser nuevo_usuario sudo
 Nota: cambiar "nuevo_usuario", por el nombre del usuario que quiere ser nuevo administrador.
 ```


Para mayor información sobre edición de usuarios administradores: <a href='https://geekland.eu/configurar-sudo-en-linux/' target='_blank' rel='nofollow'>https://geekland.eu/configurar-sudo-en-linux/</a>

 
