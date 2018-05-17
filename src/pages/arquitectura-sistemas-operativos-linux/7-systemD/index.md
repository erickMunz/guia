---
title: 7- SystemD 
---
## SystemD

Es un gestor del sistema, bibliotecas y herramientas para poder interactuar con el núcleo del sistema Linux. 

1.-Permite el inicio de demonios(es un programa que se ejecuta en segundo plano, estan fuera del control interactivo de los usuarios).
2.-Optimiza el uso de los recursos haciendo uso de los cgroups(es una herramienta que permite controlar la asignación de recursos a los procesos).
3.-Es posible la restauración del sistema a partir de un punto definido. 
4.-Administra el montaje de unidades de almacenamiento. 


Con SystemD es posible inicializar el sistema operativo en diferentes estados(como con Runlevel), pero utilizando un target el cual es el que permite inicializar los procesos asociados con este target. 

##Targets de systemD


Runlevel0.target, poweroff.target
Este nivel se encarga de detener el sistema por completo. 

RunLevel1.target, rescue.target
Un sólo usuario puede acceder a este target. 

Runlevel2.target, runlevel4.target, multi-user.target
Sólo se permite ingresar al sistema operativo con el usuario root, para acceder a todos los sistemas de archivos disponibles. 

Runlevel3.target, multi-user.target
Los usuarios pueden ingresar a traves de diferentes consolas o a través de la red. 

Runlevel5.target, graphical.target
Los usuarios pueden ingresar con modo gráfico, contiene todos los servicios que el rinlevel3. 

Runlevel6.target, reboot.target
Este nivel permite reiniciar el sistema de manera inmediata. 

Emergency.target 
Nos permite ingresar a una consola de emergencia. 


##Comandos para la gestión de System D 

systemctl: Nos permite controlar el demonio systemd y con ello llevar a cabo una eficaz administración de los servicios.


![ComandosSystemD](https://nebul4ck.files.wordpress.com/2015/01/systemctl.png)


Para mayor información acerca de system D: Para más información: <a href='https://www.solvetic.com/tutoriales/article/1773-%C2%BFqu%C3%A9-es-systemd/' target='_blank' rel='nofollow'>https://www.solvetic.com/tutoriales/article/1773-%C2%BFqu%C3%A9-es-systemd/</a>



