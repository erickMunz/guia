---
title: 3- Ajustes de horario 
---
## Ajustes de horario en servidor Linux

En la administracion de servidores Linux, una de las cuestiones más importantes es tener la fecha y hora del servidor exacta. 
Permite que los registros o logs del sistema tengan la fecha y hora adecuada. 

Para ello se utiliza el protocolo NTP (Network Time Protocol), el cual nos permite sincronizar los relojes de las computadoras con servidores de tiempo.

Para activar este protocolo es necesario seguir los siguientes pasos en una terminal como usuario root.
verificar la hora del servidor: 
```
# date
``` 

Seleccionar la zona horaria: 
```
# tzselect
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


Para más información: <a href='https://www.ochobitshacenunbyte.com/2016/11/06/sincronizar-hora-y-fecha-con-ntp-en-gnu-linux/' target='_blank' rel='nofollow'>https://www.ochobitshacenunbyte.com/2016/11/06/sincronizar-hora-y-fecha-con-ntp-en-gnu-linux/</a>


