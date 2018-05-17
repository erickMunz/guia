---
title: 19. Configuración VLans
---
## 19. Configuración VLans

Una VLAN (Red de área local virtual o LAN virtual) es una red de área local que agrupa un conjunto de equipos de manera lógica, cada una de estas redes agrupa los equipos de un determinado segmento de red. 
	
Esta implementación es el protocolo IEEE 802.1Q se usa para definir el encapsulamiento usado para implementar este mecanismo de VLAN en redes Ethernet, permitite que en los adaptadores Ethernet se ejecuten varios ID de VLAN, con una interfaz de Ethernet independiente y crea instancias lógicas del adaptador Ethernet para cada VLAN. 

Para crear una VLAN en Ubuntu se requiere accceder a la configuración del sistema, edición de conexiones.
Elegir tipo de conexión damos click en VLAN, damos en crear. 
Elegimos el nombre de la VLAN en este ejemplo será: VLAN1
En la interfaz padre seleccionamos la primera opción: enp1s0 (F4:30:B9:D3:37:22)
En el ID ponemos el identificador que nuestra red en este ejmplo es: 1
Nombre de la interfaz de VLAN podemos poner el mismo nombre que pusimos al principio: VLAN1
Vamos a la pestaña de Ajustes de IPv4 y en método seleccionamos la opción de automático y hacemos click en guardar. 
Para asegurarnos que nuestra VLAN se ha creado abrimos una terminal y colocamos el siguiente comando: 
```
# ifconfig  
```
Y debemos poder observar en el despliegue de la información la VLAN que hemos creado. 


Para más informes: <a href='http://www.alcancelibre.org/staticpages/index.php/como-vlans-linux' target='_blank' rel='nofollow'>http://www.alcancelibre.org/staticpages/index.php/como-vlans-linux</a>


Otro link por checar: <a href='https://www.ostechnix.com/install-dhcp-server-in-ubuntu-16-04/' target='_blank' rel='nofollow'>https://www.ostechnix.com/install-dhcp-server-in-ubuntu-16-04/</a>

Video para realizar la configuración por medio de comandos: <a href='https://www.youtube.com/watch?v=vca1_5Dcugs' target='_blank' rel='nofollow'>https://www.youtube.com/watch?v=vca1_5Dcugs</a>

