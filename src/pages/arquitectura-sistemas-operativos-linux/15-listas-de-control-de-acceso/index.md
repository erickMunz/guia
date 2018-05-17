---
title: 15- Listas de control de acceso 
---
## Listas de control de acceso

Las listas de control de acceso (ACL, access control lists) se utilizan para controlar los permisos de acceso de los archivos y directorios. 

##Comandos para realizar la gestión de listas de control 


Instalar acl con el siguiente comando: 
```
yum -y install acl
```

El comando ls nos permitirá saber si un archivo o directorio tiene ACLs definidos. 
```
ls  -l 
```

Editamos el archivo que contiene la dirección en dónde se va a guardar la lista de control de acceso: 
```
gedit /etc/fstab
```

Al tener el archivo abierto agregamos hasta la parte inferior la dirección dónde se guardará la lista,ejemplo: 
```
/dev/sda3	media/datos auto rw, user, auto, exec, acl 	0	0
```


Utilizaremos el comando setfacl para establecer las ACLs a un archivo o directorio. Sintaxis: 

setfacl user:[nombre_usuario_o_grupo]:[permiso]

Con el parámetro -m añadimos o modificamos los permisos actuales, ejemplo:
``` 
 setfacl -m u:alumno:rwx /mnt/disco_2/
 setfacl -m user:nombre:rw- archivo.txt

```

Con el parámetro -x eliminamos a un usuario o grupo:
```
setfacl -x u:alumno /mnt/disco_2/
```

Con el parámetro -R lo realizamos de manera recursiva en todos los subdirectorios y archivos existentes:
```
setfacl -R -m u:alumno:rwx /mnt/disco_2/
```

Con el parámetro -b eliminamos todas las ACLs existentes:
```
setfacl -b -R /mnt/disco_2/
```

Para comprobar los permisos que tiene algun archivo o directorio lo hacemos con el comando getfacl: 
```
getfacl archivo.txt

	o

getfacl /mnt/disco2/
```



Para mayor información: <a href='http://www.ticarte.com/contenido/acls-listas-de-control-de-acceso' target='_blank' rel='nofollow'>http://www.ticarte.com/contenido/acls-listas-de-control-de-acceso</a>


