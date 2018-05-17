---
title: 9-Gestión de volúmenes lógicos
---
## Logical Volume Manager(LVM)

La gestión de volúmenes lógicos(LVM), es un método que nos permite localizar el espacio que hay en un disco duro en volúmenes lógicos que pueden ser redimensionados, soportado por Linux. 

Si se tiene un disco el cual ha sido particionado en 4, los cuales cada una de estas particiones ha llegado a su totalidad de su capacidad, podríamos aumentar su volúmen lógico  con el espacio libre de diferentes discos físicos, sin afectar los archivos que cada sección contiene. 

Los volúmenes físicos que se manejan, también son combinados en grupos de volúmenes lógicos a exepción de la partición boot, ya que es el gestor de arranque principal. 

![LVM](https://s3.amazonaws.com/bigdatamx/images-guides-vol_logico-01-particiones.png)


## Gestión de volúmenes con LVM en Ubuntu
Instalamos LVM2 siendo usuarios root: 
```
# apt-get install lvm2

# apt-get install system-config-lvm
```

Para extender un volumen lógico damos el siguiente lógicos: 
```
$ sudo lvextend -L[tamanio] /dev/VG/LV
```

Así como tambien es necesario notificar al FileSystem(es el encargado de administrar el uso de memorias):
``` 
$ sudo resize2fs /dev/VG/LV
```

Para mayor información acerca de LVM: <a href='http://web.mit.edu/rhel-doc/3/rhel-sag-es-3/ch-lvm-intro.html' target='_blank' rel='nofollow'>http://web.mit.edu/rhel-doc/3/rhel-sag-es-3/ch-lvm-intro.html</a>

Para instalar LVM: <a href='http://www.ubuntu-es.org/node/40557#.Wnt9xea71uQ' target='_blank' rel='nofollow'> http://www.ubuntu-es.org/node/40557#.Wnt9xea71uQ</a>

