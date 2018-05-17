---
title: 3- Primeros Pasos NiFi
---
## Primeros Pasos NiFi

Este apartado muestra un flujo simple en *Apache NiFi*.

---

**Agregando y configurando procesadores**

---

Antes de iniciar es necesario levantar el servicio de NiFi y posteriormente ingresar a la url donde se desplega la aplicación.

Interfaz web de NiFi

![ NiFi Web Interface](https://2xbbhjxc6wk3v21p62t8n4d4-wpengine.netdna-ssl.com/wp-content/uploads/2018/02/nifi_dataflow_html_interface.png)

Imagen obtenida de  [hortonworks](https://hortonworks.com/tutorial/realtime-event-processing-in-hadoop-with-nifi-kafka-and-storm/section/3/)

*Procedimiento*


1. Diriguirse al menú de componentes de NiFi (parte superior), seleccionar el icono de "Processor" y arrastrar hasta el área de tarea. Este abrira la ventana del procesador done se podrá seleccionar la configuración deseada.
    - Agregar dos procesadores uno de tipo "GenerateFlowFile" y el segundo "PutFile", *GenerateFlowFile* genera de forma aleatorea FlowFiles y *PutFile* escribira en archivos individuales el contenido generado.


2. El siguiente paso es configurar los procesadores agregados, para esto dar clic derecho sobre el procesador. Dentro del menu de configuración se encontrarn 4 apartados (Configuración general, tiempos en la ejecución, propiedades y comentarios):
    - Configuración general (setting): En esta apartado podemos agregar nombre para destiguir al procesador agregado, configurar tiempos de penalización, nivel de log.
    - Tiempos en ejecución (scheduling): Este apartado indica al procesador cuando se va a ejecutar, con que frecuencia, el tiempo entre cada intervalo para su ejecución.
    - Porpiedades (properties): En esta apartado se configura datos especificos que necesita el procesador que utilizara en tipo de ejecución.
    - Comentarios (comments): Configuración opcional.


3. Configuración **GenerateFlowFile**: ingresar a la pestaña de sheduling y en la opción *Run Shedule* colocar 2 Sec, lo cual indicara el tiempo en que tardara en ejectuar el procesador cada tarea.  
Configuración **PutFile**: ingresar a la pestaña de propiedades y configurar la propiedad de *Directory*, este indica donde se guardara los archivos con los datos aletoreos generados por GenerateFlowFile. Ingresar al apartado Settings y seleccionar el checkbox de los siguientes elementos *failure* y *success*.

4. Una vez configurados los dos procesadores se deben realizar la unión, para esta acción daremos click izquierdo en el centro del procesador GenerateFlowFile y arrastraremos la flecha hasta el procesador PutFile.

5. Al tener establecida la unión se procedera a iniciar el flujo de datos, seleccionar ambos procesadores o el area de trabajo, dar clic derecho y presionar sobre start.

6. Los procesadores pasaran a un estatus de running lo cual indica que empieza el flujo.

7. Por ultimo validar que se hayan generando los archivos en la ruta especificada en las propiedades del procesador PutFile.

Para mas información cosultar: 

[Ejemplo por Suci Lin--Medium Corporation](https://medium.com/@suci/hello-world-nifi-dcafcba0fdb0)

[HortonWorks](https://hortonworks.com/tutorial/realtime-event-processing-in-hadoop-with-nifi-kafka-and-storm/section/3/)