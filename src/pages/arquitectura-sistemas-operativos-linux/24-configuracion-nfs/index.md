---
title: 24. Configuración NFS
---
## 24. Configuración NFS

### NFS :

Es un protocolo utilizado para compartir sistemas de archivos de manera transparente entre anfitriones dentro de una red de área local. Es utilizado para sistemas de archivos distribuido.

Existen tres versiones de NFS :

* NFSv2: Es la versión más antigua y mejor soportada.
* NFSv3: Tiene más características que NFSv2, como el manejo de archivos de tamaño variable y mejores informes de errores. Sólo es parcialmente compatible con los clientes para NFSv2.
* NFSv4: Es la versión más moderna, y, entre otras cosas, incluye soporte para seguridad a través de Kerberos, soporte para ACL y utiliza operaciones con descripción del estado.

### Llamada de Procedimiento Remoto :

La llamada de procedimiento remoto (RPC) es la capa de sesión de protocolo. 

La ejecución de un RPC consiste en los sig. pasos:
1. Activación por el programa cliente. Los parámetros de solicitud son empaquetados dentro de un
paquete de datos.
2. Mandando solicitudes y desempaquetamiento de los parámetros en el programa del servidor.
3. Ejecución de la solicitud (el procedimiento) en el servidor.
4. Empaquetar y retornar de los resultados del cliente.
5. Desempaquetar los resultados por el cliente y continuación de los programas normales de ejecución.

### Port Mapper :
Es un servicio el cual se encarga de controlar una tabla de mapeo en relación  de  TCP ó UDP de números de puertos.
EL portmapper ocupa el puerto 111 en ambos TCP y UDP. 

#### Protocolo PortMapper

Cliente y servidor ambos comunican con el portmapper vía RPC. Los procedimientos RPC define en el protocolo portmapper. No es apropiado obtener la descripción exacta de los procedimientos y el resultado de este punto. 

### Instalación de NFS :


* Centos, Fedora, Red Hat, Oracle Linux : ```yum -y install nfs-utils```

* Ubuntu, Debian : ```apt-get install nfs-common nfs-kernel-server```

### Configuración del servidor NFS :

#### Definir los puertos utilizados por NFS :

1. Primero se debe de editar un archivo :
Edite el archivo /etc/sysconfig/nfs: ```vi /etc/sysconfig/nfs```

2. Se deben de modificar o agregar los siguientes valores :

```
RQUOTAD_PORT=875
LOCKD_TCPPORT=32803
LOCKD_UDPPORT=32769
MOUNTD_PORT=892
STATD_PORT=662
```

#### Creación de directorios del Cliente NFS :

Cree los directorios que desee montar en los directorios del cliente NFS 
Ejemplo :
```
# mkdir /home/machine1
# mkdir /home/machine2
# mkdir /home/machine3
# mkdir /home/machine4
```
Los directorios que se van a crear deben de tener autorización de escritura.


#### Configurar exports:

Configure el archivo /etc/exports, agregando los directorios creados :

```
# nano /etc/exports

Y se agrega :

/home/machine1 *(rw, sync)
/home/machine2 *(rw, sync, no_wdelay, nohide)
/home/machine3 *(rw, sync, no_root_squash)
/home/machine4 *(rw, sync, no_root_squash)
```

Ĺos parámetros que se utilizan son :

* rw : Permitir solicitudes de lectura y escritura.

* no__wdelay : Esta opción no tiene efecto si async también está configurado. El servidor NFS  retrasará la confirmación de una solicitud de escritura al disco si sospecha que otra solicitud de escritura relacionada puede estar en progreso.

* sync : Responde a las solicitudes solo después de que los cambios se hayan comprometido a un almacenamiento estable. 

* async : Esta opción permite que el servidor NFS viole el protocolo NFS y responda a las solicitudes antes de que los cambios realizados por esa solicitud se hayan comprometido a un almacenamiento estable.

* root__squash : Impide que los usuarios root conectados de forma remota tengan privilegios de administrador.

* no__root__squash : Lo contarioa a root_squash.

Debe tener el parámetro no_root_squash; de lo contrario, recibirá un error.


#### Iniciar el servicio Portmap :
Checar el estado del servicio, es necesario que este en ejecución de otro modo iniciarlo :

```# service portmap status```

Si acaso esta desactivado, lo iniciamos :```# service portmap start```


#### Iniciar el servicio NFS :

Para iniciar o reiniciar el servicio NFS :

```
# service nfs start 
# service nfs restart

Recargar el servicio sin interrumpir las conexiones existentes :
#service nfs reload

Para pararlo :

# service nfs stop
```

#### Congigurar para que el servicio inicie con el Sistema :

Para que el servicio NFS se inicie automáticamente con el sistema :

Comando :
```
# chkconfig --level 35 nfs on
```


#### Comprobar los directorios de exportación :

Por último; para comprobar los directorios de exportación de NFS, utilice el siguiente comando :

```
# showmount -e <ip_servidor>

```


#### Para más información:
<!-- Please add any articles you think might be helpful to read before writing the article -->
-Configuración del servidor NFS :   <a href='https://www.ibm.com/support/knowledgecenter/es/SSFTN5_8.5.6/com.ibm.wbpm.admin.doc/topics/tadm_recovery_config_nfs.html' target='_blank' rel='nofollow'>https://www.ibm.com/support/knowledgecenter/es/SSFTN5_8.5.6/com.ibm.wbpm.admin.doc/topics/tadm_recovery_config_nfs.html</a>

- Configuración de servidor NFS. :
<a href='http://www.alcancelibre.org/staticpages/index.php/12-como-nfs' target='_blank' rel='nofollow'>http://www.alcancelibre.org/staticpages/index.php/12-como-nfs</a> 

- Exports :
<a href='https://linux.die.net/man/5/exports' target='_blank' rel='nofollow'>https://linux.die.net/man/5/exports</a> 

- Red Hat Enterprise Linux 4: Manual de referencia Sistema de archivos de red (NFS) :
<a href='http://web.mit.edu/rhel-doc/4/RH-DOCS/rhel-rg-es-4/s1-nfs-server-export.html' target='_blank' rel='nofollow'>http://web.mit.edu/rhel-doc/4/RH-DOCS/rhel-rg-es-4/s1-nfs-server-export.html</a>

- Configurar NFS :
<a href='https://linuxconfig.org/how-to-configure-nfs-on-linux 
' target='_blank' rel='nofollow'>https://linuxconfig.org/how-to-configure-nfs-on-linux 
s</a> 










