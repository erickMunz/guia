---
title: 13- Gestión de procesos y trabajos
---
## Gestión de procesos y trabajos


Un proceso es un programa que se encuentra en ejecución, estos pueden estar en primer o segudno plano, pero el proceso con el que estemos trabajando en ese momento es el que estará en primer plano. 
Una tarea es aquel proceso con el que trabajamos en ese momento y se encuentra en primer plano. 

Un proceso en segundo plano, no interactua directamente con el usuario, ya que son procesos que no requieren que el usuario lo controle para que se ejecute. 

## Comandos para realizar la gestión de procesos y trabajos

El  comando  ps  proporciona  información  sobre  los  procesos  que  se  están  ejecutando  en  el 
sistema.  
```
$ ps 
```

1.-La  primera  columna que se muestra es  el  PID  o  identificador  de  proceso.  

2.-La  segunda  columna  nos  informa  del  terminal  en  el  que  se  está  ejecutando  el 
proceso.  

3.-La tercera columna indica el tiempo total que ha estado ejecutándose el proceso.

4.-La cuarta columna es el nombre del proceso.

El comando ps admite algunos parámetros:
Devuelve un listado de todos los procesos que se están ejecutando:
```
$ ps -e
```
Devuelve un listado extendido de todos los procesos que se están ejecutando:
```
$ ps -f
```
Devuelve  un  listado  extendido  de  todos  los  procesos  que  se  están  ejecutando  en  el 
sistema.
```
$ ps -ef
```
Informa  de  los  procesos  lanzado  por  un  determinado  usuario
```
ps -u nombre_usuario
```

El comando pstree visualiza, en forma de árbol, todos los procesos del sistema. Así podemos 
ver las relaciones que existen entre los procesos
```
pstree
```

El  comando  top  devuelve un  listado  de  los  procesos con información actualizada periódicamente. 
```
top
```

Para finalizar procesos se utiliza el comando de kill su sintaxis es la siguiente: 
```
kill -[parámetro] PID
```
Dónde parámetro es remplazado por el siguiente número:
```
kill -1 (Sighup). Reinicia el proceso.

kill -9 (SigKill). Mata el proceso.

kill -15 (SigTerm). Termina el proceso.

```

Para conocer más comandos de gestión de procesos:  <a href='http://losteatinos.com/files/ISO/Introduccion_a_la_gestion_de_procesos_en_Linux.pdf' target='_blank' rel='nofollow'>http://losteatinos.com/files/ISO/Introduccion_a_la_gestion_de_procesos_en_Linux.pdf</a>


