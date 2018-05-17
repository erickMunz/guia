---
title: 26. Configuración Ldap :
---
## 26. Configuración Ldap :

### LDAP :

El Lightweight Directory Access Protocol o LDAP, es un protocolo que usa TCP / IP para hacer consultas y modificaciones a servicio de directorio distribuidos.

### OpenLDAP :
OpenLDAP es una herramienta de código abierto para crear directorio distribuido de direcciones para autentificar  usuarios tantos equipos. 


### Cómo funciona LDAP :

El  servicio  de  directorio LDAP  se  basa  en  un modelo  cliente-servidor. 
Uno  o más  servidores LDAP contienen los datos que conforman el árbol del directorio LDAP o base de datos troncal. el cliente LDAP se conecta con el servidor LDAP y le hace una consulta. El servidor contesta con la respuesta correspondiente, o bien con una indicación de donde puede el cliente hallar más información.
  


### Arbol de directorio LDAP :

Un árbol de directorio no es nada más que una manera organizada de proveer contenedores para almacenar diferentes tipos de información.



#### Instalación de OpenLDAP :
```
Ubuntu, Debian :
# sudo apt-get install slapd ldap-utils

Centos, Fedora, Red Hat, Oracle Linux :

#yum -y install openldap compat-openldap openldap-clients openldap-servers openldap-servers-sql openldap-devel

```



#### Instalación y Configuración :


Realizamos una instalación en una máquina virtual de Centos 7, y ahi vamos a montar nuestro servidor
ldap y vamos a realizar la configuración e instalación; la instalación se va a realizar desde el tgz de openldap.


Primero nos conectamos por ssh a nuestro servidor ldap:
```root@javier-orta:~# ssh -X root@192.168.86.11```

El cual nos queremos logear como usuario root, y nos va a solicitar la contraseña del usuario.
y escribimos la contraseña, ya una vez logueados nos mostraria la consola de esta manera :

```
root@javier-orta:~# ssh -X root@192.168.86.11
The authenticity of host '192.168.86.11 (192.168.86.11)' can't be established.
ECDSA key fingerprint is SHA256:5YoVt5y1u5w9HYjh/vH3djl4ZpRsH88IMT9nX4mU1Lo.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '192.168.86.11' (ECDSA) to the list of known hosts.
root@192.168.86.11's password: 
X11 forwarding request failed on channel 0
Last login: Wed Feb 14 11:26:45 2018
[root@bigdata ~]# 
```  

Algo muy importante hay que ver que este configurado nuestro hostname :
```
[root@bigdata ~]# hostname
bigdata.javier.ldap
[root@bigdata ~]# 

```
También debemos de configurar el archivo : /etc/hosts, solo le debemos de agregar el hostname, 
debe de quedar de la siguiente manera:
```
  GNU nano 2.3.1                                       Fichero: /etc/hosts                                                                            Modificado  

127.0.0.1   localhost bigdata.javier.ldap                                     
::1         localhost bigdata.javier.ldap                                     
```

```
[root@bigdata ~]# cat /etc/hosts
127.0.0.1   localhost bigdata.javier.ldap
::1         localhost bigdata.javier.ldap
[root@bigdata ~]#
```

#### Instalación de dependencias :
* Instalamos dependencias
```
[root@bigdata openldap-2.4.45]# yum install openssl gnutls cyrus-sasl-ldap krb5-server-ldap gcc make openssl-devel php httpd wget libtool-ltdl-devel
[root@bigdata openldap-2.4.45]# yum install libdb -y
[root@bigdata openldap-2.4.45]# yum install libdb-devel -y
```


#### Descargamos OpenLDAP para Linux Centos 7 :
```wget ftp://ftp.openldap.org/pub/OpenLDAP/openldap-release/openldap-2.4.45.tgz```
```
[root@bigdata ~]# wget ftp://ftp.openldap.org/pub/OpenLDAP/openldap-release/openldap-2.4.45.tgz
--2018-02-14 11:58:22--  ftp://ftp.openldap.org/pub/OpenLDAP/openldap-release/openldap-2.4.45.tgz
           => “openldap-2.4.45.tgz”
Resolviendo ftp.openldap.org (ftp.openldap.org)... 23.92.27.230, 2600:3c01::f03c:91ff:fedb:ad59
Conectando con ftp.openldap.org (ftp.openldap.org)[23.92.27.230]:21... conectado.
Identificándose como anonymous ... ¡Dentro!
==> SYST ... hecho.   ==> PWD ... hecho.
==> TYPE I ... hecho.  ==> CWD (1) /pub/OpenLDAP/openldap-release ... hecho.
==> SIZE openldap-2.4.45.tgz ... 5672845
==> PASV ... hecho.   ==> RETR openldap-2.4.45.tgz ... hecho.
Longitud: 5672845 (5.4M) (probablemente)

100%[========================================================================================================================>] 5 672 845   1.08MB/s   en 4.5s   

2018-02-14 11:58:28 (1.21 MB/s) - “openldap-2.4.45.tgz” guardado [5672845]

[root@bigdata ~]# 
```
  
Y vemos si existe el archivo :

```
[root@bigdata ~]# ls -la | grep open
-rw-r--r--.  1 root root 5672845 feb 14 11:58 openldap-2.4.45.tgz
[root@bigdata ~]#
```

#### Archivo de OpenLdap :
Descomprimimos el tgz y entramos a su directorio:
```
[root@bigdata ~]# tar -zxf openldap-2.4.45.tgz
```
```
[root@bigdata ~]# cd openldap-2.4.45
```


#### Compilamos el código de OpenLDAP :
Comenzamos a compilar OpenLDAP :
```
[root@bigdata openldap-2.4.45]# ./configure
Configuring OpenLDAP 2.4.45-Release ...
checking build system type... x86_64-unknown-linux-gnu
checking host system type... x86_64-unknown-linux-gnu
checking target system type... x86_64-unknown-linux-gnu
checking for a BSD-compatible install... /usr/bin/install -c
checking whether build environment is sane... yes
checking for gawk... gawk
checking whether make sets $(MAKE)... yes
checking configure arguments... done
checking for cc... cc
checking for ar... ar
checking for style of include used by make... GNU
checking whether the C compiler works... yes
checking for C compiler default output file name... a.out
checking for suffix of executables... 
checking whether we are cross compiling... no
checking for suffix of object files... o
checking whether we are using the GNU C compiler... yes
checking whether cc accepts -g... yes
checking for cc option to accept ISO C89... none needed
checking dependency style of cc... none
checking for a sed that does not truncate output... /usr/bin/sed
checking for grep that handles long lines and -e... /usr/bin/grep
checking for egrep... /usr/bin/grep -E
checking for ld used by cc... /usr/bin/ld
checking if the linker (/usr/bin/ld) is GNU ld... yes
checking for /usr/bin/ld option to reload object files... -r
checking for BSD-compatible nm... /usr/bin/nm -B
checking whether ln -s works... yes
checking how to recognise dependent libraries... pass_all
checking how to run the C preprocessor... cc -E
checking for ANSI C header files... yes
checking for sys/types.h... yes
...

Y no nos debe de marcar ningún error.
```
Ejecutamos el siguiente comando :
```
[root@bigdata openldap-2.4.45]# make depend
Making depend in /root/openldap-2.4.45
  Entering subdirectory include
make[1]: se ingresa al directorio `/root/openldap-2.4.45/include'
Making ldap_config.h
make[1]: se sale del directorio `/root/openldap-2.4.45/include'
 
  Entering subdirectory libraries
make[1]: se ingresa al directorio `/root/openldap-2.4.45/libraries'
Making depend in /root/openldap-2.4.45/libraries
  Entering subdirectory liblutil
make[2]: se ingresa al directorio `/root/openldap-2.4.45/libraries/liblutil'
../../build/mkdep  -d "." -c "cc" -m "-M" -I../../include        -I../../include      base64.c entropy.c sasl.c signal.c hash.c passfile.c md5.c passwd.c sha1.c getpass.c lockf.c utils.c uuid.c sockpair.c avl.c tavl.c testavl.c meter.c setproctitle.c getpeereid.c detach.c 
make[2]: se sale del directorio `/root/openldap-2.4.45/libraries/liblutil'
 
  Entering subdirectory liblber
make[2]: se ingresa al directorio `/root/openldap-2.4.45/libraries/liblber'
../../build/mkdep -l -d "." -c "cc" -m "-M" -I../../include -I../../include      assert.c decode.c encode.c io.c bprint.c debug.c memory.c options.c sockbuf.c stdio.c 
make[2]: se sale del directorio `/root/openldap-2.4.45/libraries/liblber'
 
  Entering subdirectory liblunicode
make[2]: se ingresa al directorio `/root/openldap-2.4.45/libraries/liblunicode'
touch .links
../../build/mkdep  -d "." -c "cc" -m "-M" -I../../include        -I../../include      ucstr.c ucdata.c ucgendat.c ure.c urestubs.c
make[2]: se sale del directorio `/root/openldap-2.4.45/libraries/liblunicode'
...
E igual no debe de marcar ningún error.
```

Despues Ejecutamos :
```
[root@bigdata openldap-2.4.45]# make
-c version.c
 cc -g -O2 -I../../../include -I../../../include -I.. -I./.. -I./../../../libraries/liblmdb -c version.c -o version.o
ar ruv libback_mdb.a `echo init.lo tools.lo config.lo add.lo bind.lo compare.lo delete.lo modify.lo modrdn.lo search.lo extended.lo operational.lo attr.lo index.lo key.lo filterindex.lo dn2entry.lo dn2id.lo id2entry.lo idl.lo nextid.lo monitor.lo mdb.lo midl.lo | sed 's/\.lo/.o/g'` version.o
ar: creando libback_mdb.a
a - init.o
a - tools.o
a - config.o
a - add.o
a - bind.o
a - compare.o
a - delete.o
a - modify.o
a - modrdn.o
a - search.o
a - extended.o
a - operational.o
a - attr.o
a - index.o
a - key.o
a - filterindex.o
a - dn2entry.o
a - dn2id.o
a - id2entry.o
a - idl.o
a - nextid.o
a - monitor.o
a - mdb.o
a - midl.o
a - version.o
make[3]: se sale del directorio `/root/openldap-2.4.45/servers/slapd/back-mdb'
cd back-relay; make -w all

E igual no debe marcar error.
```

Probamos este todo bien :

```
[root@bigdata openldap-2.4.45]# make test

Y este proceso tarda mucho
```

Si ya todo esta bien hacemos la instalación :
```
[root@bigdata openldap-2.4.45]#  make install

```

Ahora agregamos enlaces dinamicos :
```nano /etc/ld.so.conf```

```
include ld.so.conf.d/*.conf
/usr/local/lib

```

Despues Ejecutamos el comando, para que guarde y refresque los cambios :
```ldconfig```


Editamos la configuracion de slapd y agregamos los datos de nuestro dominio :
```nano /usr/local/etc/openldap/slapd.conf```

Le agregamos o se cambian con los siguientes parametros :

```
database        mdb
maxsize         1073741824
suffix          "dc=test,dc=com"
rootdn          "cn=Manager,dc=test,dc=com"
```
Debe de quedar :
```
#
# rootdn can always read and write EVERYTHING!

#######################################################################
# MDB database definitions
#######################################################################

database        mdb
maxsize         1073741824
suffix          "dc=test,dc=com"
rootdn          "cn=Manager,dc=test,dc=com"

###maxsize              1073741824
###suffix               "dc=my-domain,dc=com"
###rootdn               "cn=Manager,dc=my-domain,dc=com"
# Cleartext passwords, especially for the rootdn, should
# be avoid.  See slappasswd(8) and slapd.conf(5) for details.
# Use of strong authentication encouraged.
rootpw          secret
# The database directory MUST exist prior to running slapd AND
# should only be accessible by the slapd and slap tools.
# Mode 700 recommended.
directory	/usr/local/var/openldap-data
# Indices to maintain
index   objectClass     eq

```

Ejecutamos el servicio :

```/usr/local/libexec/slapd```

Y con la siguiente linea hacemos que el servicio siempre inicie al momento de encender
la pc :
```
nano /etc/rc.local
```

y agregamos:
```
/usr/local/libexec/slapd
```

Verificamos nuestra configuracion :

```
[root@bigdata openldap-2.4.45]# /usr/local/bin/ldapsearch -x -b '' -s base '(objectclass=*)' namingContexts
# extended LDIF
#
# LDAPv3
# base <> with scope baseObject
# filter: (objectclass=*)
# requesting: namingContexts 
#

#
dn:
namingContexts: dc=test,dc=com

# search result
search: 2
result: 0 Success

# numResponses: 2
# numEntries: 1
[root@bigdata openldap-2.4.45]#
```

Ahora creamos un ldif :
```
[root@bigdata openldap-2.4.45]# nano  drivemeca.ldif
```
Y agregamos lo siguiente :
```
dn: dc=test,dc=com
objectclass: dcObject
objectclass: organization
o: DriveMeca Blog 
dc: test


dn: cn=Manager,dc=test,dc=com 
objectclass: organizationalRole
cn: Manager

```

Ahora generamos una contraseña :
```
[root@bigdata openldap-2.4.45]# slappasswd
New password: 
Re-enter new password: 
{SSHA}LlrMuXw/YghrwzRh8BFRP1uwi2+R0aqN
[root@bigdata openldap-2.4.45]#
```

Agregamos la contraseña a la Configuración :

```
nano /usr/local/etc/openldap/slapd.conf

y agregamos :

rootpw {SSHA}LlrMuXw/YghrwzRh8BFRP1uwi2+R0aqN
```

Sólo se cambia lo que se tiene en rootpw :
```
# Cleartext passwords, especially for the rootdn, should
# be avoid.  See slappasswd(8) and slapd.conf(5) for details.
# Use of strong authentication encouraged.
rootpw          {SSHA}LlrMuXw/YghrwzRh8BFRP1uwi2+R0aqN
# The database directory MUST exist prior to running slapd AND
# should only be accessible by the slapd and slap tools.
# Mode 700 recommended.
directory	/usr/local/var/openldap-data
# Indices to maintain
index   objectClass     eq

```

Despues buscamos y matamos el proceso :
``` ps -ax|grep slapd```
```
[root@bigdata openldap-2.4.45]# ps -ax|grep slapd
109541 ?        Ssl    0:00 /usr/local/libexec/slapd
109558 pts/0    S+     0:00 grep --color=auto slapd
[root@bigdata openldap-2.4.45]# kill 109541
[root@bigdata openldap-2.4.45]#
```

Ahora lo volvemos ejecutar, para que lo inicie con los nuevos cambios :
```/usr/local/libexec/slapd```

##### Verificamos configuracion de OpenLDAP :
Probamos a agregar una entrada usando el archivo ldif que creamos antes y escribimos la contraseña que ya hemos generado :
```/usr/local/bin/ldapadd -x -D "cn=Manager,dc=test,dc=com" -W -f drivemeca.ldif ```

```
[root@bigdata openldap-2.4.45]# /usr/local/bin/ldapadd -x -D "cn=Manager,dc=test,dc=com" -W -f drivemeca.ldif
Enter LDAP Password: 
adding new entry "dc=test,dc=com"

adding new entry "cn=Manager,dc=test,dc=com "
ldap_add: Object class violation (65)
	additional info: invalid structural object class chain (organizationalRole/organization)

[root@bigdata openldap-2.4.45]#
```

Por último :

Abrimos el puerto en el firewall y dejamos el cambio permanente :
```
[root@bigdata openldap-2.4.45]# firewall-cmd --add-service=ldap --permanent
success
[root@bigdata openldap-2.4.45]# firewall-cmd --reload
success
[root@bigdata openldap-2.4.45]#
```
  

#### Para más información:
<!-- Please add any articles you think might be helpful to read before writing the article -->
- Instalar y configurar OpenLDAP en el servidor Ubuntu :   <a href='http://somebooks.es/12-7-instalar-y-configurar-openldap-en-el-servidor-ubuntu/' target='_blank' rel='nofollow'>http://somebooks.es/12-7-instalar-y-configurar-openldap-en-el-servidor-ubuntu/</a>

- Como instalar y configurar OpenLDAP en Linux Centos 7 :
<a href='http://drivemeca.blogspot.mx/2016/06/como-instalar-y-configurar-openldap-en.html' target='_blank' rel='nofollow'>http://drivemeca.blogspot.mx/2016/06/como-instalar-y-configurar-openldap-en.html</a> 


- Descripción general de la configuración de OpenLDAP :
<a href='http://web.mit.edu/rhel-doc/4/RH-DOCS/rhel-rg-es-4/s1-ldap-quickstart.html' target='_blank' rel='nofollow'>http://web.mit.edu/rhel-doc/4/RH-DOCS/rhel-rg-es-4/s1-ldap-quickstart.html</a> 

- Cómo configurar LDAP en Ubuntu Server o Debian :
<a href='https://www.dragonjar.org/como-configurar-ldap-en-ubuntu-server-o-debian.xhtml' target='_blank' rel='nofollow'>https://www.dragonjar.org/como-configurar-ldap-en-ubuntu-server-o-debian.xhtml</a> 





