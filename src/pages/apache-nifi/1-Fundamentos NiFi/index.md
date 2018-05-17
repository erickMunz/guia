---
title: 1-Fundamentos de NiFi
---
# Fundamentos de NiFi

NiFi es un software desarrollado por Apache Software Foundation, es una herramienta para la automatización de flujo de datos, permitiendo a los usuarios enviar, recibir, manipular, transformar y ordenar información.

**Características**

1. Compatibilidad con diferentes herramientas para la distribución de datos.
2. Facil de usar, debido a su interfaz grafica de solo arrestrar y colocar.
3. Facil portabilidad, permite ejecutarse en una computadora portatil o en servidores agrupados.
4. Nifi permite ingerir diferentes tipos de datos, mediante el uso de protocolos de transferencia (FTP, SFTP, HTTP, JMS, UDP, etc.).

---
Arquitectura NiFi
---

![Apache NiFi Architecture](https://nifi.apache.org/docs/nifi-docs/html/images/zero-master-node.png)

NiFi se ejecuta sobre la JVM dentro de un sistema operativo, los elementos principales utlizados por NiFi en la JVM son los siguientes:

- **Web Server**

El propósito del *Web Server* es alojar la API de control y comando basada en HTTP de NiFi.

- **Flow Controller**

EL *flow controller* es el cerebro de la operación. Este funciona como un orquestador que provee de subprocesos para las extenciones, coordina cuando las extenciones reciben recursos para ejectuar.

- **Extensions**

Existen diferentes tipos de NiFi *Extensions*, su objetivo es pérar y executar procesos dentro de la JVM.

- **FlowFile Repository**

El *FlowFile Repository * es donde Nifi almacena el estado que se conoce del archivo de flujo que se encuentra activo en el paso de un sistema a otro.


- **Content Repository**

El *Content Repository* es donde se resguardan los bytes del archivo de flujo (FlowFile). 

- **Provenance Repository**

El *Provenance Repository* es donde se almacenan todos los datos de eventos de procedencia. Dentro de cada ubicación, los datos de los eventos se indexan y se pueden buscar.


---
Autentificación de usuarios
---

Apache Nifi permite la autentificación vía 3 opciones:

* username/password.
* Apache Knox.
* OpenId Connect.

Para realizar la autentificación NiFi utiliza un 'Login Identity Provider', este se debe configurar en el archivo *nifi.properties*. Actualmente, NiFi ofrece un nombre de usuario / contraseña con las opciones de Identity Providers de inicio de sesión para LDAP y Kerberos.

---
Clustering 
---

NiFi implementa un nuevo paradigma para realizar clustering llamado "Zero Master Clustering", el cual india que no existira un nodo Maestro. Cada nodo ejecutara las mismas tareas en los datos, pero operaran en conjuntos diferentes de datos. Se elige de forma automática un nodo como "Cluster Coordinator" (vía Apache Zookeerper).

![Clustering](https://nifi.apache.org/docs/nifi-docs/html/images/zero-master-cluster-http-access.png)

---
Multi-tenancy
---

Apache NiFi permite manejar, controlar y observar el estado de diferentes partes del flujo de datos, por grupos de entidades (sistemas o personas) con diferentes niveles de autorización.

Actualmente el modelo de autorización de NiFi en un flujo de datos dado se aplica a todo el flujo de datos gráfico, lo cual no permite respaldar las necesidades de múltiples usuarios que están presentes cuando varias organizaciones aprovechan los mismos recursos para administrar los flujos de datos.

---
Repository
---

Apache NiFi cuenta con diferentes repositorios en este apartado se explica acerca de los 3 en particular:

* Content repository.
* Flowfile repository.
* Rovenance repository.

**Content repository** es el repostorio encargado de mantener el contenido de todos los FlowFiles en el sistema. Este puede estar ubicado en una ruta por default como los otros repositorios, se recomienda que se encuentre en una ruta diferente al repositorio de flowFile.

**Flowfile repository** se encarga de dar seguimiento del estado actual de los FlowFile, se recomienda ser instalado en un disco diferente.


**Rovenance repository** contiene la información relacionada con la procedencia de los datos.	

---

Para mayor información sobre Apache NiFi [Apache Nifi - Docs](https://nifi.apache.org/docs.html)

Para mas información sobre Clustering [Clustering Configuration](https://nifi.apache.org/docs/nifi-docs/html/administration-guide.html#clustering)

Para mas información sobre User Authentication [Authentication](https://nifi.apache.org/docs/nifi-docs/html/administration-guide.html#user_authentication)

Para mas información sobre multi-tenancy [Multi-tentant](https://cwiki.apache.org/confluence/display/NIFI/Multi-Tentant+Dataflow) y [Multi-tenancy](https://bryanbende.com/development/2016/08/17/apache-nifi-1-0-0-authorization-and-multi-tenancy)

Para mas información sobre los repositorios de apache NiFi [Repository](https://nifi.apache.org/docs/nifi-docs/html/administration-guide.html#content-repository)

---