---
title: 23-Configuración NTP
---
## Configuración NTP

El protocolo NTP (Network Time Protocol), permite sincronizar los relojes de las computadoras con servidores de tiempo.

Para activar este protocolo es necesario seguir los siguientes pasos en una terminal como usuario root.
verificar la hora del servidor: 
```
#date
``` 

Seleccionar la zona horaria: 
```
#tzselect
```

Instalar el protocolo NTP: 
```
# apt-get install ntp ntpdate
```
En el fichero /etc/ntp.conf, se encuentra la lista de servidores de hora que utiliza el sistema, si queremos la podemos modificar los servidores a los que se apunta para la fecha y hora. 
```
# gedit /etc/ntp.conf
```

Verificamos si el servidor esta funcionando. (Tomar en cuenta que se debe tener salida a Internet en el puerto UDP 123). 
```
# ntpq -p 
```

Una vez hechos los cambios en el fichero /etc/ntp.conf, reiniciaremos el servicio:
```
# /etc/init.d/ntp restart 
```

Sincronizamos el reloj con la zona horaria
Crear un enlace del archivo de la zona horaria al archivo de tiempo de nuestro equipo. (localtime).
```
# ln -sf /usr/share/zoneinfo/America/Mexico_City /etc/localtime
```


Para más información: <a href='https://help.ubuntu.com/lts/serverguide/NTP.html' target='_blank' rel='nofollow'>https://help.ubuntu.com/lts/serverguide/NTP.html</a>

Para más información: <a href='https://www.digitalocean.com/community/tutorials/how-to-set-up-time-synchronization-on-ubuntu-16-04' target='_blank' rel='nofollow'>https://www.digitalocean.com/community/tutorials/how-to-set-up-time-synchronization-on-ubuntu-16-04</a>


