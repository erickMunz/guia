---
title: 5-Sistema de nivel de ejecución
---
## RunLevels Linux

En linux se tienen diferentes estados en los que puede ser inicialziado el sistema operativo.  Estos estados se identifica con números del 0 al 6. 

Nivel 0: Halt 

Este nivel se encarga de apagar el sistema por completo. 

Nivel 1: Monousuario 

Sólo se permite ingresar al sistema operativo con el usuario root. comunmente se ingresa a este nivel para verificar el estado del sistema, o brindar mantenimiento. No existe interfaz gráfica ni configuraciones de red. 

Nivel 2: Multiusuario

Sólo se permite ingresar al sistema operativo con el usuario root, para acceder a todos los sistemas de archivos disponibles. No hay configuraciones de red. 

Nivel 3: Multiusuario completo 

Todos los usuarios pueden ingresar a este nivel, y a todas las configuraciones, pero no cuenta con un entorno gráfico. 

Nivel 4: - 

Este nivel no se utiliza, pero puede ser personalizado, segun las necesidades del usuario. 

Nivel 5: Multiusuario con entorno gráfico

Todos los usuarios pueden ingresar a este nivel, y a todas las configuraciones. 
Comunmente los sistemas operativos inicializan en este nivel. 

Nivel 6: Reboot

Este nivel permite reiniciar el sistema de manera inmediata. 

---
Comandos para modificar el nivel de arranque del sistema.
---

Para conocer en que nivel se encuentra nuestra ejecución actual, escribimos en una terminal: 
```
$ who -r
```

Ejemplo: al ejecutar el comando anterior tenemos la leyenda run-level, seguido de un número 5, este es el que indica el nivel en que se encuentra el arranque actual del sistema.
```
run-level' 5 2012-06-16 11:08
```

El usuario administrador puede cambiar en cualquier momento de nivel utilizando el siguiente comando: 
```
# init 5
```
Nota: cambiar el número, según desee acceder al nivel. 

Aparte de editar el archivo /etc/inittab, el administrador puede cambiar en cualquier momento el valor del nivel de ejecución con el comando init.

Para más información: <a href='https://docs.oracle.com/cd/E24842_01/html/E23289/hbrunlevels-13026.html' target='_blank' rel='nofollow'>https://docs.oracle.com/cd/E24842_01/html/E23289/hbrunlevels-13026.html</a>

Para más información: <a href='http://www.josoroma.com/run-levels-and-services' target='_blank' rel='nofollow'>http://www.josoroma.com/run-levels-and-services</a>

Para más información: <a href='http://aprendiendo-software.blogspot.mx/2012/01/runlevels-niveles-de-ejecucion.html' target='_blank' rel='nofollow'>http://aprendiendo-software.blogspot.mx/2012/01/runlevels-niveles-de-ejecucion.html</a>

