---
title: 21- Protocolo DNS
---
## Protocolo DNS

DNS (Sistema de nombres de dominio) se encarga de la resolución de la gestión de nombres de los sistemas y decidir a que dirección IP le corresponde. Es una manera muy sencilla para recordar nombres de páginas de internet, ya que son nombres o palabras que llegamos a utilizar en la vida cotidiana a comparación de que intentáramos recordar çonjuntos de números de las IP's. 

## Usos del DNS 

1.-Resolución de nombres: Dado el nombre completo de un host, obtener su dirección IP.
2.-Resolución inversa de direcciones: dada una dirección IP, obtener el nombre completo de un host
3.-Resolución de servidores de correo: Dado un nombre de dominio (por ejemplo gmail.com) obtener el servidor a través del cual debe realizarse la entrega del correo electrónico (en este caso, gmail-smtp-in.l.google.com).


## Terminología 

1.-Host Name: El nombre de un host es una sola cadena de letras por ejemplo: perritos-mexico
2.-Fully Qualified Domain Name (FQDN): Es el “nombre completo” de un host. Está formado por el hostname, seguido de un punto y su correspondiente nombre de dominio. Por ejemplo, “perritos-mexico.com.mx“
3.-Domain Name: El nombre de dominio es una sucesión de nombres concatenados por puntos. Algunos ejemplos son “perritos-mexico.com.mx“, “com.mx” y “mx“.
4.-Top Level Domains (TLD): Los dominios de nivel superior son aquellos que no pertenecen a otro dominio. Ejemplos de este tipo son “com“, “org“, “mx” y “es“.

## Tipos de registro en un servidor de nombres

Un servidor de nombres puede almacenar distinta información. Para ello, en cada zona de autoridad dispondrá de entradas de distinto tipo.

1.-A (Address): Este registro se utiliza para traducir nombres de hosts del dominio en cuestión a direcciones IP.
2.-CNAME (Canonical Name): El nombre canónico es un alias para un host determinado.
3.-NS (Name Server): Especifica el servidor (o servidores) de nombres para un dominio.
4.-MX (Mail Exchange): Define el servidor encargado de recibir el correo electrónico para el dominio.
5.-PTR (Pointer): Especifica un “registro inverso“, a la inversa del registro A, permitiendo la traducción de direcciones IP a nombres.
6.-TXT (Text): Permite asociar información adicional a un dominio.

## Dominios de nivel superior 

Los dominios genéricos, llamados tambien gTLD (TLD genérico) son nombres de dominio de nivel superior que ofrecen una clasificación de acuerdo con el sector de la actividad. 

Historial de gTLD:

.arpa: relacionado con equipos pertenecientes a la red original.
.com: inicialmente relacionado comunmente con empresas con fines comerciales. 
.edu: relacionado con las organizaciones educativas.
.gov: relacionado con las organizaciones gubernamentales.
.int: relacionado con las organizaciones internacionales.
.edu: relacionado con las organizaciones militares.
.net: inicialmente relacionado comunmente con las organizaciones que administran redes. 
.org: está normalmente relacionado con organizaciones sin fines de lucro. 


Para más información: <a href='https://blog.smaldone.com.ar/2006/12/05/como-funciona-el-dns/' target='_blank' rel='nofollow'>https://blog.smaldone.com.ar/2006/12/05/como-funciona-el-dns/</a>

