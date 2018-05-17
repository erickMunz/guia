---
title: 1. Instalación :
---
## Instalación de Docker en Centos 7 

Hay varias formas de Instalar docker :
1. Instalación desde el repositorio oficial
2. Instalación manual por medio del paquete rpm


### Instalación dese el Repositorio 
Antes de instalar docker, primero tenemos que actualizar el sistemas e instalar los paquete requeridos :

Abrimos una terminal como usuario root : ``` su  -```

```
Actualizamos :

[root@bigdata ~]# yum update -y
[root@bigdata ~]# yum upgrade -y

Instalamos paquetes necesarios :

[root@bigdata ~]# yum install -y yum-utils   device-mapper-persistent-data   lvm2

```

Ahora agregamos el repositorio oficial :
```
[root@bigdata ~]# yum-config-manager     --add-repo     https://download.docker.com/linux/centos/docker-ce.repo

```

Listar las versiones de Docker Ce, por si se quiere instalar una version en especifico :
```
[root@bigdata ~]# yum list docker-ce --showduplicates | sort -r
 * updates: centos.unixheads.org
Paquetes disponibles
Loading mirror speeds from cached hostfile
 * extras: mirror.lug.udel.edu
docker-ce.x86_64            17.12.0.ce-1.el7.centos             docker-ce-stable
docker-ce.x86_64            17.09.1.ce-1.el7.centos             docker-ce-stable
docker-ce.x86_64            17.09.0.ce-1.el7.centos             docker-ce-stable
docker-ce.x86_64            17.06.2.ce-1.el7.centos             docker-ce-stable
docker-ce.x86_64            17.06.1.ce-1.el7.centos             docker-ce-stable
docker-ce.x86_64            17.06.0.ce-1.el7.centos             docker-ce-stable
docker-ce.x86_64            17.03.2.ce-1.el7.centos             docker-ce-stable
docker-ce.x86_64            17.03.1.ce-1.el7.centos             docker-ce-stable
docker-ce.x86_64            17.03.0.ce-1.el7.centos             docker-ce-stable
Complementos cargados:fastestmirror
 * base: mirror.sigmanet.com
[root@bigdata ~]# 
```


Instalamos docker :
```
[root@bigdata ~]# yum install docker-ce -y
```

Iniciamos el daemon de Docker :
```
[root@bigdata ~]# systemctl start docker
```

Checamos el estado del daemon de Docker :
```
[root@bigdata ~]# systemctl status docker
● docker.service - Docker Application Container Engine
   Loaded: loaded (/usr/lib/systemd/system/docker.service; disabled; vendor preset: disabled)
   Active: active (running) since mar 2018-02-20 11:38:02 CST; 1min 4s ago
     Docs: https://docs.docker.com
 Main PID: 1523 (dockerd)
   Memory: 27.0M
   CGroup: /system.slice/docker.service
           ├─1523 /usr/bin/dockerd
           └─1526 docker-containerd --config /var/run/docker/containerd/containerd.toml

feb 20 11:38:01 bigdata.javier.centos dockerd[1523]: time="2018-02-20T11:38:01-06:00" level=info msg=serving... address="/var/run/docker/containerd/doc...rd/grpc"
feb 20 11:38:01 bigdata.javier.centos dockerd[1523]: time="2018-02-20T11:38:01-06:00" level=info msg="containerd successfully booted in 0.012237s" modu...ntainerd
feb 20 11:38:01 bigdata.javier.centos dockerd[1523]: time="2018-02-20T11:38:01.777694812-06:00" level=info msg="Graph migration to content-addressabili...seconds"
feb 20 11:38:01 bigdata.javier.centos dockerd[1523]: time="2018-02-20T11:38:01.778942777-06:00" level=info msg="Loading containers: start."
feb 20 11:38:02 bigdata.javier.centos dockerd[1523]: time="2018-02-20T11:38:02.123999072-06:00" level=info msg="Default bridge (docker0) is assigned wi...address"
feb 20 11:38:02 bigdata.javier.centos dockerd[1523]: time="2018-02-20T11:38:02.316610779-06:00" level=info msg="Loading containers: done."
feb 20 11:38:02 bigdata.javier.centos dockerd[1523]: time="2018-02-20T11:38:02.331545100-06:00" level=info msg="Docker daemon" commit=c97c6d6 graphdriv....12.0-ce
feb 20 11:38:02 bigdata.javier.centos dockerd[1523]: time="2018-02-20T11:38:02.331668517-06:00" level=info msg="Daemon has completed initialization"
feb 20 11:38:02 bigdata.javier.centos dockerd[1523]: time="2018-02-20T11:38:02.369207256-06:00" level=info msg="API listen on /var/run/docker.sock"
feb 20 11:38:02 bigdata.javier.centos systemd[1]: Started Docker Application Container Engine.
Hint: Some lines were ellipsized, use -l to show in full.
[root@bigdata ~]#
```

Para parar el daemon de docker :
```
[root@bigdata ~]# systemctl stop docker
```

### Instalación de Docker desde el Paquete 
Primero tenemos que actualizar el sistemas e instalar los paquete requeridos :

Abrimos una terminal como usuario root : ``` su  -```

```
Actualizamos :

[root@bigdata ~]# yum update -y
[root@bigdata ~]# yum upgrade -y

Instalamos paquetes necesarios :

[root@bigdata ~]# yum install -y yum-utils   device-mapper-persistent-data   lvm2  wget

```

Descargamos el paquete rpm, de acuerdo a la versión que queramos instalar, vamos a
la siguiente página https://download.docker.com/linux/centos/7/x86_64/stable/Packages/ ,
y descargamos el paquete :
```
[root@bigdata ~]# wget -F https://download.docker.com/linux/centos/7/x86_64/stable/Packages/docker-ce-17.12.0.ce-1.el7.centos.x86_64.rpm

```

Verificamos que se encuentre el paquete :
```
[root@bigdata ~]# ls
anaconda-ks.cfg  docker-ce-17.12.0.ce-1.el7.centos.x86_64.rpm
[root@bigdata ~]#
```

Instalamos docker utilizando el paquete :
```
[root@bigdata ~]# yum install docker-ce-17.12.0.ce-1.el7.centos.x86_64.rpm  -y

```
Iniciamos el daemon de Docker :
```
[root@bigdata ~]# systemctl start docker
```

Checamos el estado del servicio de docker :
```
[root@bigdata ~]# systemctl status docker
● docker.service - Docker Application Container Engine
   Loaded: loaded (/usr/lib/systemd/system/docker.service; disabled; vendor preset: disabled)
   Active: active (running) since mar 2018-02-20 12:04:59 CST; 5s ago
     Docs: https://docs.docker.com
 Main PID: 1847 (dockerd)
   Memory: 23.1M
   CGroup: /system.slice/docker.service
           ├─1847 /usr/bin/dockerd
           └─1850 docker-containerd --config /var/run/docker/containerd/containerd.toml

feb 20 12:04:58 bigdata.javier.centos dockerd[1847]: time="2018-02-20T12:04:58-06:00" level=info msg=serving... address="/var/run/docker/containerd/doc...rd/grpc"
feb 20 12:04:58 bigdata.javier.centos dockerd[1847]: time="2018-02-20T12:04:58-06:00" level=info msg="containerd successfully booted in 0.062945s" modu...ntainerd
feb 20 12:04:58 bigdata.javier.centos dockerd[1847]: time="2018-02-20T12:04:58.706643794-06:00" level=info msg="Graph migration to content-addressabili...seconds"
feb 20 12:04:58 bigdata.javier.centos dockerd[1847]: time="2018-02-20T12:04:58.708364137-06:00" level=info msg="Loading containers: start."
feb 20 12:04:58 bigdata.javier.centos dockerd[1847]: time="2018-02-20T12:04:58.990434380-06:00" level=info msg="Default bridge (docker0) is assigned wi...address"
feb 20 12:04:59 bigdata.javier.centos dockerd[1847]: time="2018-02-20T12:04:59.211186559-06:00" level=info msg="Loading containers: done."
feb 20 12:04:59 bigdata.javier.centos dockerd[1847]: time="2018-02-20T12:04:59.228514930-06:00" level=info msg="Docker daemon" commit=c97c6d6 graphdriv....12.0-ce
feb 20 12:04:59 bigdata.javier.centos dockerd[1847]: time="2018-02-20T12:04:59.228667551-06:00" level=info msg="Daemon has completed initialization"
feb 20 12:04:59 bigdata.javier.centos dockerd[1847]: time="2018-02-20T12:04:59.259404743-06:00" level=info msg="API listen on /var/run/docker.sock"
feb 20 12:04:59 bigdata.javier.centos systemd[1]: Started Docker Application Container Engine.
Hint: Some lines were ellipsized, use -l to show in full.
[root@bigdata ~]# 
```

## Instalación de Docker en Ubuntu 16.04

Para instalar doker en ubuntu hay varias maneras de la cuales la que más se utilizan ess la intalación
por medio de un arhivo .deb o la instalación por medio del repositorio.

### Intalación por medio del Repositorio :

Primero se debe tener el sistema actualizado y se van a necesitar algunas dependencias necesarios :

Abrimos una terminal y nos logueamos como root:
```
javier@javier:~$ sudo su root
```
Actualizamos el sistema :
```
root@javier:/home/javier# apt update -y

root@javier:/home/javier# apt upgrade -y

root@javier:/home/javier# apt dist-upgrade -y

```

Instalamos dependencias :
```
root@javier:/home/javier# apt-get install \
>     apt-transport-https \
>     ca-certificates \
>     curl \
>     software-properties-common

Y 

root@javier:/home/javier# apt install -y libltdl7

```

Agregamos el Docker  GPG key oficial :
```
root@javier:/home/javier# curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
OK
root@javier:/home/javier# 
```

Verificamos la key :
```
root@javier:/home/javier# apt-key fingerprint 0EBFCD88
pub   4096R/0EBFCD88 2017-02-22
      Huella de clave = 9DC8 5822 9FC7 DD38 854A  E2D8 8D81 803C 0EBF CD88
uid                  Docker Release (CE deb) <docker@docker.com>
sub   4096R/F273FCD8 2017-02-22

root@javier:/home/javier#
```

Agregamos el repositorio de la versión estable; también se puede agregar de otras versiones como lo son edge o test, pero la mejor opción es la estable:
```
root@javier:/home/javier# add-apt-repository \
>    "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
>    $(lsb_release -cs) \
>    stable"
root@javier:/home/javier# 
```

Para que el sistema reconozca el repositorio es necesario hacer un update :
```
root@javier:/home/javier# apt update -y
```

Instalamos docker :
```
root@javier:/home/javier# apt install docker-ce -y
```

Por ultimo para verificar la instalación verificamos el servicio de docker, y nos tiene que mostrar algo parecido :
```
root@javier:/home/javier# service docker status
● docker.service - Docker Application Container Engine
   Loaded: loaded (/lib/systemd/system/docker.service; enabled; vendor preset: enabled)
   Active: active (running) since jue 2018-02-22 07:17:24 CST; 23s ago
     Docs: https://docs.docker.com
 Main PID: 53628 (dockerd)
   CGroup: /system.slice/docker.service
           ├─53628 /usr/bin/dockerd -H fd://
           └─53638 docker-containerd --config /var/run/docker/containerd/containerd.toml

feb 22 07:17:24 javier dockerd[53628]: time="2018-02-22T07:17:24.536469306-06:00" level=warning msg="Your kernel does not support swap memory limit"
feb 22 07:17:24 javier dockerd[53628]: time="2018-02-22T07:17:24.536581792-06:00" level=warning msg="Your kernel does not support cgroup rt period"
feb 22 07:17:24 javier dockerd[53628]: time="2018-02-22T07:17:24.536610067-06:00" level=warning msg="Your kernel does not support cgroup rt runtime"
feb 22 07:17:24 javier dockerd[53628]: time="2018-02-22T07:17:24.537600305-06:00" level=info msg="Loading containers: start."
feb 22 07:17:24 javier dockerd[53628]: time="2018-02-22T07:17:24.744035729-06:00" level=info msg="Default bridge (docker0) is assigned with an IP address 172.17.0.0/16. Daemon option --bip can be used to set a preferred IP address
feb 22 07:17:24 javier dockerd[53628]: time="2018-02-22T07:17:24.784191253-06:00" level=info msg="Loading containers: done."
feb 22 07:17:24 javier dockerd[53628]: time="2018-02-22T07:17:24.819159050-06:00" level=info msg="Docker daemon" commit=c97c6d6 graphdriver(s)=overlay2 version=17.12.0-ce
feb 22 07:17:24 javier dockerd[53628]: time="2018-02-22T07:17:24.819542448-06:00" level=info msg="Daemon has completed initialization"
feb 22 07:17:24 javier dockerd[53628]: time="2018-02-22T07:17:24.827812608-06:00" level=info msg="API listen on /var/run/docker.sock"
feb 22 07:17:24 javier systemd[1]: Started Docker Application Container Engine.
lines 1-19/19 (END)

```

Y podemos controlar el servicio, para pararlo :
```
root@javier:/home/javier# service docker stop
root@javier:/home/javier#
```

Para volverlo inciar :
```
root@javier:/home/javier# service docker start
root@javier:/home/javier# 
```

Para reiniciarlo :
```
root@javier:/home/javier# service docker restart
root@javier:/home/javier#
```


### Instalación por medio del paquete .deb :

Primero se debe tener el sistema actualizado y se van a necesitar algunas dependencias necesarios :

Abrimos una terminal y nos logueamos como root:
```
javier@javier:~$ sudo su root
```
Actualizamos el sistema :
```
root@javier:/home/javier# apt update -y

root@javier:/home/javier# apt upgrade -y

root@javier:/home/javier# apt dist-upgrade -y

```

Instalamos dependencias :
```
root@javier:/home/javier# apt-get install \
>     apt-transport-https \
>     ca-certificates \
>     curl \
>     software-properties-common 

Y 

root@javier:/home/javier# apt install -y libltdl7

```

Nos dirigimos a la siguiente página :
- <a href=' https://download.docker.com/linux/ubuntu/dists/' target='_blank' rel='nofollow'> https://download.docker.com/linux/ubuntu/dists/</a>  y seleccionamos  pool/stable/ y podemos elegir de acuerdo al sistema (arquitectura) en el que lo queramos instalar amd64, armhf, ppc64el o s390x. Descargamos el archivo .deb de la versión de Docker que desea instalar.

Link del index para ubuntu xenial x 64 del paquete .deb :

- <a href='https://download.docker.com/linux/ubuntu/dists/xenial/pool/stable/amd64/' target='_blank' rel='nofollow'> https://download.docker.com/linux/ubuntu/dists/xenial/pool/stable/amd64/</a> 

Link del index para ubuntu zesty x 64 del paquete .deb :
- <a href='https://download.docker.com/linux/ubuntu/dists/zesty/pool/stable/amd64/' target='_blank' rel='nofollow'> https://download.docker.com/linux/ubuntu/dists/zesty/pool/stable/amd64/</a> 

Descargamos el .deb :
```
root@javier:/home/javier# wget https://download.docker.com/linux/ubuntu/dists/xenial/pool/stable/amd64/docker-ce_17.12.0~ce-0~ubuntu_amd64.deb
```

Despues verificamos si existe el .deb :
```
root@javier:/home/javier# ls
docker-ce_17.12.0~ce-0~ubuntu_amd64.deb
root@javier:/home/javier# 
```

Instalamos el paquete .deb :
```
root@javier:/home/javier#  dpkg -i docker-ce_17.12.0~ce-0~ubuntu_amd64.deb
```


Por ultimo para verificar la instalación verificamos el servicio de docker, y nos tiene que mostrar algo parecido :
```
root@javier:/home/javier# service docker status
● docker.service - Docker Application Container Engine
   Loaded: loaded (/lib/systemd/system/docker.service; enabled; vendor preset: enabled)
   Active: active (running) since jue 2018-02-22 07:17:24 CST; 23s ago
     Docs: https://docs.docker.com
 Main PID: 53628 (dockerd)
   CGroup: /system.slice/docker.service
           ├─53628 /usr/bin/dockerd -H fd://
           └─53638 docker-containerd --config /var/run/docker/containerd/containerd.toml

feb 22 07:17:24 javier dockerd[53628]: time="2018-02-22T07:17:24.536469306-06:00" level=warning msg="Your kernel does not support swap memory limit"
feb 22 07:17:24 javier dockerd[53628]: time="2018-02-22T07:17:24.536581792-06:00" level=warning msg="Your kernel does not support cgroup rt period"
feb 22 07:17:24 javier dockerd[53628]: time="2018-02-22T07:17:24.536610067-06:00" level=warning msg="Your kernel does not support cgroup rt runtime"
feb 22 07:17:24 javier dockerd[53628]: time="2018-02-22T07:17:24.537600305-06:00" level=info msg="Loading containers: start."
feb 22 07:17:24 javier dockerd[53628]: time="2018-02-22T07:17:24.744035729-06:00" level=info msg="Default bridge (docker0) is assigned with an IP address 172.17.0.0/16. Daemon option --bip can be used to set a preferred IP address
feb 22 07:17:24 javier dockerd[53628]: time="2018-02-22T07:17:24.784191253-06:00" level=info msg="Loading containers: done."
feb 22 07:17:24 javier dockerd[53628]: time="2018-02-22T07:17:24.819159050-06:00" level=info msg="Docker daemon" commit=c97c6d6 graphdriver(s)=overlay2 version=17.12.0-ce
feb 22 07:17:24 javier dockerd[53628]: time="2018-02-22T07:17:24.819542448-06:00" level=info msg="Daemon has completed initialization"
feb 22 07:17:24 javier dockerd[53628]: time="2018-02-22T07:17:24.827812608-06:00" level=info msg="API listen on /var/run/docker.sock"
feb 22 07:17:24 javier systemd[1]: Started Docker Application Container Engine.
lines 1-19/19 (END)

```

Y podemos controlar el servicio, para pararlo :
```
root@javier:/home/javier# service docker stop
root@javier:/home/javier#
```

Para volverlo inciar :
```
root@javier:/home/javier# service docker start
root@javier:/home/javier# 
```

Para reiniciarlo :
```
root@javier:/home/javier# service docker restart
root@javier:/home/javier#
```

- Mas información :
* Instalación de Docker ubuntu <a href='https://docs.docker.com/install/linux/docker-ce/ubuntu/#prerequisites' target='_blank' rel='nofollow'>https://docs.docker.com/install/linux/docker-ce/ubuntu/#prerequisites</a>

* Instalación de Docker centos <a href='https://docs.docker.com/install/linux/docker-ce/centos/' target='_blank' rel='nofollow'>https://docs.docker.com/install/linux/docker-ce/centos/</a>
