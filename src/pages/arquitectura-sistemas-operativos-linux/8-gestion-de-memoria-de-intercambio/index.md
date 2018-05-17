---
title: 8. Gestión de Memoria de Intercambio
---
## 8. Gestión de Memoria de Intercambio

### Que es la memoria Swap :
Es una memoria virtual, el cual no se encuentra en la memoria ram , si utiliza un espacio en el disco duro, el cual se asigna durante el proceso de instalación del sistema operativo linux.
La memoria Swap se utiliza cuando la memoria Ram se encuentra llena, y es ahi cuando toma parte la memoria swap.

### Por qué se necesita la memoria Swap :
Porqué es una forma de ampliar la memoria Ram de nuestro sistema operativo en caso de que esta se encuentre llena.
En el momento en el que la memoria ram se llene completamente e intentemos ejecutar más aplicaciones, es en ese momento cuando la memoria Swap entra en ejecución, para estabilizar la carga de memoria del sistema operativo.


### Cuanta SWAP es recomendada asignar :
Depende de la memoria ram que tenga el equipo, por ejemplo si el equipo cuenta con una memoria ram de un 1 gb o menor, entonces se recomienda asignar el doble de la memoria ram al swap, pero de lo contrario si acaso el euipo es superior de 2gb, se recomienda manejar el mismo tamaño a la memoria swap; una excepción es si acaso el equipo es de un servidor, o si se se va ocupar para un alto rendimiento, en ese caso si se recomienda poner el doble de la ram al  swap.

### Que es Swappiness :
Swappiness es una propiedad del Núcleo Linux que permite ajustar el equilibrio entre el uso del espacio de intercambio (Swap).

El swappiness puede tener un valor entre 0 y 100, normalmente en todas las distribuciones viene con un valor por defecto de 60. 

Para comprobar el valor que tiene se ejecuta el siguiente comando :
```
cat /proc/sys/vm/swappiness
```


### Comandos para administrar el Area Swap :

* Saber el valor del swappines asignado.

```
cat /proc/sys/vm/swappiness 
```

* Si se quiere reducir el varlo del area swap solo se coloca en la terminal el siguiente comando, en el cual el 10 es el nuevo valor: 

```
sudo sysctl -w vm.swappiness=10
```

* Para guardar permanentemente los cambios se configura el archivo sysctl.conf

```
sudo gedit /etc/sysctl.conf
```

Y se coloca al final del archivo la siguiente linea :

```
vm.swappiness=10
``` 

* Para liberar la memoria Swap una vez que esta en uso, se utiliza el siguiente comando :

```
free
```

* Para traspasar el contenido de la memoria Swap a la ram, se utiliza el siguiente comando para realizar la trasnferencia :

```
sudo swapoff -a ; sudo swapon -a
```

### Utilizar un fichero como memoria de intercambio :
En lugar de crear una partición en el disco, tambíen se puede crear un fichero para el área de intercambio, y la ventaja de ese fihero es que se pude redimensionar, en lugar de merterse directamente con el disco.

Considerando que el fichero de memoria de intercambio puede ser colocado en cualquier directorio del disco duro, se utiliza el comando dd, especificando que se escribirán ceros (if=/dev/zero) para crear el fichero /swap, en bloques de 1024 bytes hasta completar una cantidad en bytes determinada (count=[cantidad en bytes]). 


* Primero se crea un fichero :

```
dd if=/dev/zero of=/swap bs=1024 count=262144
```

* Una vez creado el fichero se le da el formato, agregando el espacio que se le va a asignar en mb:

```
/sbin/mkswap /swap 262144
```

* Para activar e iniciar el fichero ya como Swap se utiliza el siguiente comando :

```
/sbin/swapon /swap
```



#### Para más información:
<!-- Please add any articles you think might be helpful to read before writing the article -->
- Configurando el swappiness:   <a href='http://elblogdeliher.com/como-optimizar-la-ram-y-la-swap-configurando-el-swappiness-en-ubuntu/' target='_blank' rel='nofollow'>http://elblogdeliher.com/como-optimizar-la-ram-y-la-swap-configurando-el-swappiness-en-ubuntu/</a>

- Gestionar espacio de memoria:   <a href='http://wikis.uca.es/wikiunix/index.php/Gestionar_espacio_de_memoria_de_intercambio' target='_blank' rel='nofollow'>http://wikis.uca.es/wikiunix/index.php/Gestionar_espacio_de_memoria_de_intercambio</a>
