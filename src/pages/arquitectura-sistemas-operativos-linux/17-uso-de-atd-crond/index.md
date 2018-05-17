---
title: 17- Uso de atd y cron 
---
## Uso de atd y cron 


Cron es el responsable de ejecutar tareas programadas y recurrentes
Crontab es un simple archivo de texto que guarda una lista de comandos a ejecutar en un tiempo especificado por el usuario. Crontab verificará la fecha y hora en que se debe ejecutar el script o el comando. 
Sintaxis: 
```
# m h dom dow usuario comando
``` 
Dónde: 
```
m: corresponde al minuto en que se va a ejecutar el script, el valor va de 0 a 59
h: la hora  los valores van de 0 a 23
dom: hace referencia al día del mes
dow: significa el día de la semana, puede ser numérico (0 a 7)
usuario: define el usuario que va a ejecutar el comando
comando: refiere al comando o a la ruta absoluta del script a ejecutar
```


## ATD

Instalar ATD 
```
$ sudo apt install at
```


Atd está encargado de los programas a ejecutar una sola vez pero en un momento específico. 
El comando at tiene la siguiente sintaxis:
```
# at [hora] [fecha]
```
El comando at acepta horas con formato HH:MM para ejecutar un trabajo a una determinada hora del día. 

Ejemplo: 
```
at 09:00 27.07.15 <<END
> echo "¡No olvides hacer el script" 
> END
```

Para mas información de cron: <a href='https://blog.desdelinux.net/cron-crontab-explicados/' target='_blank' rel='nofollow'>https://blog.desdelinux.net/cron-crontab-explicados/</a>

Para más información de at: <a href='https://debian-handbook.info/browse/es-ES/stable/sect.task-scheduling-cron-atd.html' target='_blank' rel='nofollow'>https://debian-handbook.info/browse/es-ES/stable/sect.task-scheduling-cron-atd.html</a>
