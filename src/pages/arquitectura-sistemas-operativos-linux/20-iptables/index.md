---
title: 20. Iptables
---
## 20. Iptables

El sistema operativo Linux dispone de un firewall llamado IPtables.

Iptables es un firewall incluido en el kernel de Linux desde la versión 2.4 que está incluido en el sistema operativo. Es un firewall basado en reglas, su funcionamiento se basa en aplicar reglas que el mismo firewall ejecute. 

Iptables se saco un mayor provecho o tiene una mejor funciones en distribuciones linux para servidores, como lo son red hat enterprise, fedora, centos, oracle linux, etc.

*  Comando para instalar iptables :

```
En una distribución red hat el comando es :

yum -y install iptables
```


### Manejar el servicio de iptables :

```
Para iniciar: 

sudo service iptables start

Para para: 

sudo service iptables stop

Para reiniciar:

sudo service iptables restart

```

### Cadenas Iptables :
El objetivo de las cadenas es poder controlar el flujo de un paquete a través del sistema y la pila de red .

Las cadenas principales son :

* PREROUTING: tráfico entrante, justo antes de ingresar a la pila de red del kernel. Las reglas en esta cadena son procesadas antes de tomar cualquier decisión de ruteo respecto hacia dónde enviar el paquete.
* INPUT: tráfico entrante, luego de haber sido ruteado y destinado al sistema local.
* FORWARD: tráfico entrante, luego de haber sido ruteado y destinado hacia otro host (reenviado).
* OUTPUT: tráfico saliente originado en el sistema local, inmediatamente luego de haber ingresado a la pila de red del kernel.
* POSTROUTING: tráfico saliente originado en el sistema local o reenviado, luego de haber sido ruteado y justo antes de ser puesto en el cable.



### Comandos principales :
```
-A –append → agrega una regla a una cadena.

-D –delete → borra una regla de una cadena especificada.

-R –replace → reemplaza una regla.

-I –insert → inserta una regla en lugar de una cadena.

-L –list → muestra las reglas que le pasamos como argumento.

-F –flush → borra todas las reglas de una cadena.

-Z –zero → pone a cero todos los contadores de una cadena.

-N –new-chain → permite al usuario crear su propia cadena.

-X –delete-chain → borra la cadena especificada.

-P –policy → explica al kernel qué hacer con los paquetes que no coincidan con ninguna regla.

-E –rename-chain → cambia el orden de una cadena.

```

### Condiciones Principales :

```

-p –protocol → la regla se aplica a un protocolo.

-s –src –source → la regla se aplica a una IP de origen.

-d –dst –destination → la regla se aplica a una Ip de destino.

-i –in-interface → la regla de aplica a una interfaz de origen, como eth0.

-o –out-interface → la regla se aplica a una interfaz de destino.


```

### Condiciones Básicas TCP/UDP :

```

-sport –source-port → selecciona o excluye puertos de un determinado puerto de origen.

-dport –destination-port → selecciona o excluye puertos de un determinado puerto de destino.

```
Existen más condiciones, pero estas son las principales.

### Configurar reglas por defecto :

La configuración de un firewall, es para establecer que el lo que queremos bloquear y que no.

Los comandos para configurar son :

```

iptables -P INPUT DROP

iptables -P FORWARD DROP

iptables -P OUTPUT DROP

```

### Aplicar una regla que filtre un determinado puerto :

```
iptables -A INPUT -p tcp –sport 22 22 → crea una regla para el puerto de origen tcp 2222
```

### Bloquear el tráfico procedente de una determinada IP :

```
Bloquear por Ip:

	iptables -A INPUT -p tcp -m iprange –src-range 192.168.1.13-192.168.2.19 

Bloquear por Mac :

	iptables -A INPUT -m mac –mac-source 00:00:00:00:00:01
```

Para guardar la onfiguraciones se teclea el comando:
```sudo service iptables save```

### Ver el estado del firewall :

```
iptables -L -n -v
```

El parámetro L muestra las líneas abiertas. V permite recibir más información sobre las conexiones y N nos devuelve las direcciones IP y sus correspondientes puertos sin pasar por un servidor DNS.


### Eliminar las reglas existentes :

Para borrar toda la configuración del firewall se utiliza el siguiente comando :

```
iptables -F
```


### Permitir conexiones entrantes :

Se utiliza el siguiente comando on sus parámetros:

```

iptables -A INPUT -i [interface] -p [protocolo] –dport [puerto] -m state –state NEW,ESTABLISHED -j ACCEPT
```

* -i: debemos configurar la interfaz, ejemplo:  eth0. Esto es útil en caso de tener varias tarjetas de red
* -p: protocolo. Debemos especificar si el protocolo será TCP o UDP.
* –dport: el puerto que queremos permitir, ejemplo : 80 .

### Permitir las conexiones salientes :

Se utiliza el siguiente comando con sus parámetros :

```
iptables -A OUTPUT -o [interfaz] -p [protocolo] –sport [puerto] -m state –state ESTABLISHED -j ACCEPT
```

* -o: se debe de configurar la interfaz .
* -p: protocolo. Debemos especificar si el protocolo será TCP o UDP.
* –sport: el puerto que queremos permitir .


### Permitir los paquetes ICMP :

Por defecto, el ping está deshabilitado. Se habilita manualmente añadiendo las correspondientes entradas en iptables.

Comando :

```
Para poder hacer ping a otros servidores:

	iptables -A OUTPUT -p icmp –icmp-type echo-request -j ACCEPT

Para permitir recibir solicitudes de ping de otros equipos:

	iptables -A INPUT -p icmp –icmp-type echo-reply -j ACCEPT

```


### Permitir que el tráfico interno salga a internet :

Se configura el firewall para que reenvíe el tráfico de la red local a través de internet.

Comando :

```
iptables -A FORWARD -i eth0 -o eth1 -j ACCEPT
```


### Consultar los paquetes rechazados por iptables :

Para saber los paquetes que iptables ha rechazado debemos teclear:

Comando :

```
iptables -N LOGGING
```





#### Para más información:
<!-- Please add any articles you think might be helpful to read before writing the article -->
- Iptables, comandos básicos:   <a href='https://www.redeszone.net/gnu-linux/iptables-configuracion-del-firewall-en-linux-con-iptables/' target='_blank' rel='nofollow'>https://www.redeszone.net/gnu-linux/iptables-configuracion-del-firewall-en-linux-con-iptables/</a>

- Introducción a Iptables:   <a href='http://www.alcancelibre.org/staticpages/index.php/introduccion-iptables' target='_blank' rel='nofollow'>http://www.alcancelibre.org/staticpages/index.php/introduccion-iptables</a>

- Comandos Iptables:   <a href='http://www.nexolinux.com/comandos-mas-usados-para-gestionar-iptables/
' target='_blank' rel='nofollow'>http://www.nexolinux.com/comandos-mas-usados-para-gestionar-iptables/
</a>

- Tutorial básico de Iptables:   <a href='https://www.linuxito.com/seguridad/793-tutorial-basico-de-iptables-en-linux
' target='_blank' rel='nofollow'>https://www.linuxito.com/seguridad/793-tutorial-basico-de-iptables-en-linux
</a>

- Red Hat Documentación Iptables :   <a href='http://web.mit.edu/rhel-doc/4/RH-DOCS/rhel-rg-es-4/s1-iptables-options.html' target='_blank' rel='nofollow'>http://web.mit.edu/rhel-doc/4/RH-DOCS/rhel-rg-es-4/s1-iptables-options.html</a>


