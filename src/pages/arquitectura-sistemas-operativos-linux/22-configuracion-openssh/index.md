---
title: 22. Configuración Openssh
---
## 22. Configuración Openssh


### SSH :


SSH (Secure Shell) es un conjunto de estándares y protocolo de red que permite establecer una comunicación a través de un canal seguro entre un cliente local y un servidor remoto. 
Para esto utiliza una llave para autenticar el servidor remoto, además utiliza criptografía para la integridad en la transferencia de los datos.

El puerto por defecto para conectarse es el 22.

```
Comando para conectarse a un servidor por medio del SSH :

# ssh usuario@nombre.o.ip.servidor

Si se utiliza un puerto diferente del 22, solo se pone el parámetro -p , que hace referencia al puerto.

# ssh -p 52341 juan@192.168.70.99
```

### SFTP :

SFTP (SSH File Transfer Protocol) es un protocolo que provee funcionalidad de transferencia y manipulación de archivos a través de un flujo confiable de datos. 

Para acceder a través de SFTP hacia el servidor, ejecute sftp desde el sistema cliente definiendo el usuario a utilizar, una arroba y el nombre o dirección IP del servidor remoto:

```
Comando :

# sftp usuario@servidor



Si se utiliza otro puerto distinto al 22, solo se agregan unos parámetros en el comando :

# sftp -o Port=52341 juan@192.168.70.99
 
```

En algunas distribuciones ubuntu que utilicen el Sistema de administración de Ficheros Nautilus, este puede acceder al servidor vía URL :

![Nautilus ](https://s3.amazonaws.com/bigdatamx/images-guides-openssh-01-nautilus.png)


### SCP :

SCP (Secure Copy o Copia Segura) es una protocolo seguro para transferir archivos entre un anfitrión local y otro remoto, a través de SSH.

Es decir es una herramienta para copiar archivos de un servidor local a uno remoto, solo utiliza cómo parámetros las direcciones ip, y el usuario, además los datos son cifrados durante la transferencia .

Parámetros que se pueden incluir :

* -p (minúscula)
Preserva el tiempo de modificación, tiempos de acceso y los modos del archivo original.
* -P (mayúscula)
Especifica el puerto para realizar la conexión.
* -r
Copia en modo descendente de los directorios especificados.


```
Comando scp :

scp file  user@host:/path/   =  Copia un arhivo local a otra máquina(host) con el usuario correspondiente

Ejemplos :

scp -p algo.txt fulano@192.168.70.99:~/

scp -rp Mail fulano@192.168.70.99:/home


```


### OpenSSH :

OpenSSH (Open Secure Shell) es una alternativa de código fuente abierto, para utilizar ssh.

OpenSSH incluye servicio y clientes para los protocolos SSH, SFTP y SCP.

#### Instalar OpenSSh :

* Centos, Red Hat, Fedora :

```yum -y install openssh openssh-server openssh-clients```

* Ubuntu, Debian :

```sudo apt-get install openssh-server```

#### Utilizar OpenSSH como servicio :

* Comandos :

```

Ver el estado del servicio SSH :

sudo service ssh status



Iniciar el Servicio SSH :

sudo service ssh start



Parar el Servicio SSH :

sudo service ssh stop



Reiniciar el Servicio SSH :

sudo service ssh restart


```

Para manejar los servicios se puede utilizar el :  service o si no también se puede utilizar :  systemctl.

### Configuración del Firewall para SSH :

Si se está utilizando el firewall es necesario abrir los puertos que utiliza SSh :

* Ejecute lo siguiente:
```
iptables -A INPUT -m state --state NEW -m tcp -p tcp --dport 22 -j ACCEPT
```

* Guarde los cambios ejecutando lo siguiente:
```
service iptables save
```

* De otra manera se pude configurar el siguiente archivo /etc/sysconfig/iptables, solo se debe de agregar:
```
-A INPUT -m state --state NEW -m tcp -p tcp --dport 22 -j ACCEPT
```

* Y reinicie el servicio iptables:
```
service iptables restart
```

### Archivos de configuración :

* /etc/ssh/sshd_config :
Archivo principal de configuración del servidor SSH.

* /etc/ssh/ssh_config :
Archivo principal de configuración de los clientes SSH utilizados desde el anfitrión local.

* ~/.ssh/config :
Archivo personal para cada usuario, que almacena la configuración utilizada por los clientes SSH utilizados desde el anfitrión local. Permite al usuario local utilizar una configuración distinta a la definida en el archivo /etc/ssh/ssh_config.

* ~/.ssh/known_hosts :
Archivo personal para cada usuario, el cual almacena las firmas digitales de los servidores SSH a los que se conectan los clientes. 

* ~/.ssh/authorized_keys :
Archivo personal para cada usuario, el cual almacena los certificados de los clientes SSH, para permitir autenticación hacia servidores SSH sin requerir contraseña.


### Configuración de Seguridad para SSH :

Estas configuraciones son el el archivo sshd_config . 

* Cambiar el puerto por defecto que es el 22 : ```Port 22445```

* Bloquear el acceso root en las conexiones remotas : ```PermitRootLogin no```

* LoginGraceTime: Estableceremos el tiempo necesario para introducir la contraseña : ```LoginGraceTime 30```

* MaxAuthTries: Número de intentos permitidos al introducir la contraseña antes de desconectarnos : ```MaxAuthTries 3```


* MaxStartups: Número de logins simultáneos desde una IP : ```MaxStartups 3```

* AllowUsers: Es crear una lista blanca de usuario. Este parámetro nos permite configurar los usuarios que podrán conectarse : ```AllowUsers user1 user2```

* DenyUsers: Se crea una lista negra. Los usuarios que tengamos aquí no podrán conectarse : 	```DenyUsers  user1 user2```

* AllowGroups/DenyUsers: Se crean listas pero en lugar de usuarios son de grupos.

#### Para más información:
<!-- Please add any articles you think might be helpful to read before writing the article -->
- Configuración de OpenSSH :   <a href='http://www.alcancelibre.org/staticpages/index.php/10-como-openssh' target='_blank' rel='nofollow'>http://www.alcancelibre.org/staticpages/index.php/10-como-openssh</a>

- Instalar OpenSSH :
<a href='http://ubuntuhandbook.org/index.php/2016/04/enable-ssh-ubuntu-16-04-lts/' target='_blank' rel='nofollow'>http://ubuntuhandbook.org/index.php/2016/04/enable-ssh-ubuntu-16-04-lts/</a> 

- Archivos de Configuración :
<a href='http://web.mit.edu/rhel-doc/4/RH-DOCS/rhel-rg-es-4/s1-ssh-configfiles.html' target='_blank' rel='nofollow'>http://web.mit.edu/rhel-doc/4/RH-DOCS/rhel-rg-es-4/s1-ssh-configfiles.html</a> 

- Configuración de Seguridad SSH :
<a href='https://www.redeszone.net/seguridad-informatica/servidor-ssh-en-linux-manual-de-configuracion-para-maxima-seguridad/' target='_blank' rel='nofollow'>https://www.redeszone.net/seguridad-informatica/servidor-ssh-en-linux-manual-de-configuracion-para-maxima-seguridad/</a> 




