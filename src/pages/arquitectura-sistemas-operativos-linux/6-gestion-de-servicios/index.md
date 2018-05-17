---
title: 6. Gestión de Servicios
---
## 6. Gestión de Servicios

### Que son los servicios:

Un servicio son programas o procesos que se ejecutan en segundo plano y ofrecen servicios al sistema.
En linux a los servicios tambien se les conoce como Daemons(Demonios), pueden iniciarse al arrancar la pc de mánera automática o de manera manual.


### Manejadores de Servicios:

#### * Init :

El programa encargado de controlar la sequencia de arranque de los servicios era init  esta funcionalidad se ha implementado de forma distinta en los sistemas  Unix; en el cual la ejecución era gestionada por runlevels utilizando el sistema de arranque System-V.


#### * Upstart :
Es un daemon, es el remplazo del sistema de manejo de servicios init que utilizaba System-v.
En este la gestión de arranque está basada en eventos y no en runlevels.
Los servicios se pueden iniciar, parar y reiniciar en respuesta a ciertos eventos; además de que trabaja de manera asíncrona supervisando las tareas ya sea cuando inicia el sistema o se apaga.

#### * Systemd :
Es el daemon más reciente y que utilizan la mayoría de sistemas Linux.
La principal ventaja con respecto a Upstart es de que ya no requiere de una causa(evento) para manipular los Servicios, también realiza más trabajo paralelamente al inicio del sistema y con esto reduce la sobrecarga al sistema.


### Comandos para manejar los servicios de acuerdo a los tipos de Manejadores :


####* System-V (Init):
Los scripts de los servicios que maneja se encuentran en el directorio: "/etc/init.d/"  y los comandos  para manipularlos son:

* $sudo /etc/init.d/<nombre_servicio> start (inicia el servicio)
* $sudo /etc/init.d/<nombre_ servicio> stop (detiene el servicio)
* $sudo /etc/init.d/<nombre_ servicio> restart (detiene e inicia el servicio)
* $sudo /etc/init.d/<nombre_ servicio> reload (carga la configuración nuevamente sin detener el servicio)
* $sudo /etc/init.d/<nombre_ servicio> status (muestra el estado del servicio)

#### * Comandos service :
Este comando se puede utilizar en manejadores de servicios System-V y de Upstart:

* $sudo service <nombre_ servicio> start (inicia el servicio)
* $sudo service <nombre_ servicio> stop (detiene el servicio)
* $sudo service <nombre_ servicio> restart (detiene e inicia el servicio)
* $sudo service <nombre_ servicio> reload (carga la configuración nuevamente sin detener el servicio)
* $sudo service <nombre_ servicio> status (muestra el estado del servicio)
* $service --status-all (Obtenemos una lista de todos los servicios)



#### * Comandos de upstart :
Los comandos que utiliza son los siguientes :

* $sudo start <nombre_ servicio> (inicia el servicio)
* $sudo stop <nombre_ servicio> (detiene el servicio)
* $sudo restart <nombre_ servicio> (detiene e inicia el servicio)
* $sudo reload <nombre_ servicio> (carga la configuración nueva-mente sin detener el servicio)
* $sudo status <nombre_ servicio> (muestra el estado del servicio)



#### * Comandos de Systemd :

Systemd incorpora nuevos comandos para gestionar los servicios o daemons del sistema :

* $sudo systemctl start <nombre_ servicio>.service (inicia el servicio)
* $sudo systemctl stop <nombre_ servicio>.service (detiene el servicio)
* $sudo systemctl restart <nombre_ servicio>.service (detiene e inicia el servicio)
* $sudo systemctl reload <nombre_ servicio>.service (carga la configuración nueva-mente sin detener el servicio)
* $sudo systemctl status <nombre_ servicio>.service (muestra el estado del servicio)
* $systemctl status  (ve el estado de los servicios)


### Niveles de ejecución :

GNU/Linux tiene 7 niveles de ejecución:

* 0: Apaga el sistema.
* 1 o S: Nivel mono-usuario.
* 2: Multi-usuario, sin unidades de almacenamiento remoto o sin conexión de red.
* 3: Multi-usuario, con unidades de almacenamiento remoto.
* 4: Experimental.
* 5: Multi-usuario con servidor de video.
* 6: Reinicia sistema.

Los servicios del sistema utilizan los niveles de ejecución 2, 3, 4 y 5. Los niveles de ejecución 0, 1 y 6 están reservados.

Estos se pueden configurar en los archivos de configuración de cada servicio.

Para utilizar los niveles desde la consola, se utiliza el siguinte comando :
`init no_nivel` 





#### Para más información:
<!-- Please add any articles you think might be helpful to read before writing the article -->
- Manejadores de servicios :   <a href='https://lignux.com/informacion-sobre-init-systemd-y-upstart-en-teoria/' target='_blank' rel='nofollow'>https://lignux.com/informacion-sobre-init-systemd-y-upstart-en-teoria/</a>


- Gestión de servicios en GNU/Linux :   <a href='http://www.obasoft.es/CF/SIINF/SIINF_05_Contenidos/4_gestin_de_servicios_en_gnulinux.html' target='_blank' rel='nofollow'>http://www.obasoft.es/CF/SIINF/SIINF_05_Contenidos/4_gestin_de_servicios_en_gnulinux.html</a>

- Niveles de ejecución :   <a href='http://www.alcancelibre.org/staticpages/index.php/gestion-servicios' target='_blank' rel='nofollow'>http://www.alcancelibre.org/staticpages/index.php/gestion-servicios</a>

- Gestión de servicios :   <a href='https://www.linuxtotal.com.mx/index.php?cont=info_admon_003' target='_blank' rel='nofollow'>https://www.linuxtotal.com.mx/index.php?cont=info_admon_003</a>