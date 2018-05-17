---
title: 4- Creando tu propio procesador
---
## Creando tu propio procesador

Este apartado muestra la forma de crear *Custom processors* que podrán ser utilizados en Apache NiFi. Antes de comenzar con el desarrollo del procesador, es necesario tener los siguientes componentes instalados:

Requisitos:

1. Java (jdk 7 o superior).
2. Maven.
3. Eclipse.

---

Procedimiento

---

1. Crear directorio donde se resguardara el código del procesador.

2. Una vez creado el directorio, ingresar miendiante el uso de la terminal e ingresar el siguiente comando:

```
mvn archetype:generate

```

3. Al ejecutar el comando en la terminar solicitará los datos del groupId y artifactId, el cual puede ser filtrado, ingresar la palabra NiFi.

4. Una vez indicado NiFi seleccionar la opción para generar el procesador *org.apache.nifi:nifi-processor-bundle-archetype*.

5. A continuación mostrarán diferentes versión de la libreria seleccionada, seleccionar la versión 0.2.1 o superior.

6. En los siguientes pasos se definirira el groupId y el artifactId (para mas información sobre groupId y artifectId [click](https://maven.apache.org/guides/mini/guide-naming-conventions.html)).

7. Se solicitara la versión inicial y el artifactBaseName, este ultimo indicara la descripción del paquete proyecto.

8. Una vez que maven termine de crear todos los componentes asociados al archetype, validaremos su construcción al ingresar al directorio donde se creo este. Se debe compilar para comprobar que el directorio fue creado de manera correcta, a continuación se muestran los pasos para realizar la compilación:
	 * Ingresar a la carpeta principal del proyecto del procesador que se desea crear.
	 * Abrir el archivo pom.xml y eliminar la palabra -SNAPSHOT de la etiqueta versión
	 ```
	 < parent >
        < groupId >org.apache.nifi< / groupId >
        < artifactId >nifi-nar-bundles< / artifactId >
        < version >0.1.0-incubating-SNAPSHOT< /version >
     < /parent >
	 ```
     * Ingresar mediante una terminar a la ruta del directorio donde se encuentra el proyecto del procesador creado.
     * Ejecutar el siguiente comando para compilar el proyecto.
     ```
     mvn install
     ```    

     * Validar que se haya compilado de manera correcta al visualizar en pantalla la palabra *BUILD SUCCESS* y localizar dentro del directorio "*nombreProyecto-nar*" en la carpeta target el archivo "*nombrePryecto-1.0.nar*".

9. Después de realizar y validar la compilación del proyect, este contiene las interfaces para generar el procesador (archivo.nar), se continuará en su implementación y configuración.

10. A continuación adaptaremos el proyecto para lograr abrirlo con el IDE de eclipse, para lo anterior es necesario ejecutar el siguiente comando dentro de la carpeta raíz del mismo.

```
mvn eclipse:eclipse -DdownloadSources=true

```

11. Al terminar la descarga de los recursos estos crearan los componente .classpath y .project para poder importar a eclipse el proyecto.

12. Importar el proyecto al IDE de eclipse para realizar la creación y configuración del nuevo procesador.

13. Dentro del proyecto encontreremos diferentes paquetes:
     * **src/test/java:** Se encuentran clases que implementan el TestRunner de NiFi para cada procesador se crea uno.
     * **src/main/java:** Se encuentra el código que define el procesador que se esta creando.
     * **src/main/resources:** Contiene el archivo *org.apache.nifi.processor.Processor*, el cual se encarga de habilitar y mostrar los procesadores creados en NiFi.

14. Abrir el paquete de src/main/java y agregar una nueva clase, la cual determinara el nuevo procesador.

15. Copiaremos el contenido de la clase principal del proyecto previamente creado y solo se sustitir en nombre de la nueva clase que se creo, esto nos permitira tener todo el esqueleto para crear el el procesador.

```
import org.apache.nifi.components.PropertyDescriptor;
import org.apache.nifi.components.PropertyValue;
import org.apache.nifi.flowfile.FlowFile;
import org.apache.nifi.processor.*;
import org.apache.nifi.annotation.behavior.ReadsAttribute;
import org.apache.nifi.annotation.behavior.ReadsAttributes;
import org.apache.nifi.annotation.behavior.WritesAttribute;
import org.apache.nifi.annotation.behavior.WritesAttributes;
import org.apache.nifi.annotation.lifecycle.OnScheduled;
import org.apache.nifi.annotation.documentation.CapabilityDescription;
import org.apache.nifi.annotation.documentation.SeeAlso;
import org.apache.nifi.annotation.documentation.Tags;
import org.apache.nifi.processor.exception.ProcessException;
import org.apache.nifi.processor.util.StandardValidators;

import java.util.*;

@Tags({"example"})
@CapabilityDescription("Provide a description")
@SeeAlso({})
@ReadsAttributes({@ReadsAttribute(attribute="", description="")})
@WritesAttributes({@WritesAttribute(attribute="", description="")})
public class MyProcessor extends AbstractProcessor {

    public static final PropertyDescriptor MY_PROPERTY = new PropertyDescriptor
            .Builder().name("My Property")
            .description("Example Property")
            .required(true)
            .addValidator(StandardValidators.NON_EMPTY_VALIDATOR)
            .build();

    public static final Relationship MY_RELATIONSHIP = new Relationship.Builder()
            .name("my_relationship")
            .description("Example relationship")
            .build();

    private List<PropertyDescriptor> descriptors;

    private Set<Relationship> relationships;

    @Override
    protected void init(final ProcessorInitializationContext context) {
        final List<PropertyDescriptor> descriptors = new ArrayList<PropertyDescriptor>();
        descriptors.add(MY_PROPERTY);
        this.descriptors = Collections.unmodifiableList(descriptors);

        final Set<Relationship> relationships = new HashSet<Relationship>();
        relationships.add(MY_RELATIONSHIP);
        this.relationships = Collections.unmodifiableSet(relationships);
    }

    @Override
    public Set<Relationship> getRelationships() {
        return this.relationships;
    }

    @Override
    public final List<PropertyDescriptor> getSupportedPropertyDescriptors() {
        return descriptors;
    }

    @OnScheduled
    public void onScheduled(final ProcessContext context) {

    }

    @Override
    public void onTrigger(final ProcessContext context, final ProcessSession session) throws ProcessException {
		FlowFile flowFile = session.get();
		if ( flowFile == null ) {
			return;
		}

        // TODO implement

    }

}

```

16. Una vez que se tiene el esqueleto, crearemos el TestRunner para el nuevo procesador a crear, crearemos una clase dentro de *src/test/java* y copiaremos el contenido del Test generado por mvn. 
Recordar cambiar el nombre de la clase por la nueva que se creo.

```

import org.apache.nifi.util.TestRunner;
import org.apache.nifi.util.TestRunners;
import org.junit.Before;
import org.junit.Test;


public class MyProcessorTest {

    private TestRunner testRunner;

    @Before
    public void init() {
        testRunner = TestRunners.newTestRunner(MyProcessor.class);
    }

    @Test
    public void testProcessor() {

    }

}

```

17. Como siguiente paso es agregar el nuevo procesador en el archivo *org.apache.nifi.processor.Processor* contenido en el paquete src/main/resources.

```
# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
scc.processors.demo.MyProcessor
scc.processors.demo.NuevoProcesador

```
18. Una vez terminado de configurar, regresaremos a la clase principal para agregar la lógica del procesador, en este caso nos basaremos en un ejemplo creado por [Silver Cloud](http://www.silvercloudcomputing.com/videos.html):
     0. Este ejemplo permite mostrar paso a paso como crear un procesador que valide el tamaño de flowFile y realizar una validación para descriminar si es admitido o no según su tamaño.  
     1. Ingresar a la clase principal del procesador, la clase principal es donde se escribira toda la logica del elemento que se desea desarrollar.
     2. Crear dos variables dentro de la clase principal de tipo **Relationship**, las cuales determinan los enlaces con otros procesadores, estos permitiran descriminar cuando el tamaño del flowFile sea mayor o menor al atributo presentado.

     ```
     public class FileSizeFilter extends AbstractProcessor {
     	private static int MAX_FILE_SIZE = 0;

     	public static final Relationship FAIL_RELATIONSHIP = new Relationship.Builder()
	.name("do NOT pass the file")
	.description("this file will NOT be passed on to succes")
	.build();

	public static final Relationship SUCCESS_RELATIONSHIP = new Relationship.Builder()
		.name("pass the file")
		.description("this file will be passed on to succes")
		.build();	
     ```

     3. A continuación se debe agregar una nueva variable de tipo **PropertyDescriptor**, esta variable permitira especificar la propiedad para el uso interno en el procesamiento de los datos (flowFile), con los siguientes valores.

     ```
     private static final PropertyDescriptor MAX_FILE_SIZE_ATTRIBUTE_PROPERTY = new PropertyDescriptor
		.Builder().name("Max size attribute")
		.description("This is the name the attribute that contains the file size")
		.required(true)
		.defaultValue("some.file.size")
		.addValidator(StandardValidators.NON_EMPTY_VALIDATOR)
		.build();

     ```

     4. Una vez creadas las variables eliminaremos dos que fueron creados de forma automatica por maven, en este caso estan determinadas como **PropertyDescriptor MY_PROPERTY** y Relationship MY_RELATIONSHIP. Lo anterior mostrara algunos errores en el código, diriguirse a estos y sistituor los valores por las nuevas variables que se crearon previamente.

     ```
     @Override
    protected void init(final ProcessorInitializationContext context) {
        final List<PropertyDescriptor> descriptors = new ArrayList<PropertyDescriptor>();
        descriptors.add(MAX_FILE_SIZE_ATTRIBUTE_PROPERTY);
        this.descriptors = Collections.unmodifiableList(descriptors);

        final Set<Relationship> relationships = new HashSet<Relationship>();
        relationships.add(FAIL_RELATIONSHIP);
        relationships.add(SUCCESS_RELATIONSHIP);
        this.relationships = Collections.unmodifiableSet(relationships);
    }

     ```
     5. Después de correguir los errores y agregar todas las variables de relación y propiedades, se agregará la lógica del procesador dentro del metodo **onTrigger**. Agregaremos el siguiente código que nos permitira realizar las validaciones correspondientes y asi determinar si el flowFile entrante es de menor o mayor tamñado al comparar con el atributo de la propiedad asignada por el usuario.

     ```
     @Override
    public void onTrigger(final ProcessContext context, final ProcessSession session) throws ProcessException {
		FlowFile flowFile = session.get();
		if ( flowFile == null ) {
			return;
		}

		String attributeMax = context.getProperty(MAX_FILE_SIZE_ATTRIBUTE_PROPERTY).getValue();
		getLogger().info("Get a flowFile");
		
		if(flowFile.getAttribute(attributeMax)!=null) {
			MAX_FILE_SIZE = Integer.parseInt(flowFile.getAttribute(attributeMax));
			getLogger().info("Reset MAX file size value to "+ MAX_FILE_SIZE+" Ref: "+attributeMax);
			session.remove(flowFile);
			return;
		}
			
		if (flowFile.getSize()< MAX_FILE_SIZE) {
			getLogger().info("File passed, size is less than "+MAX_FILE_SIZE+ " ( "+flowFile.getSize()+" )");
			session.transfer(flowFile,SUCCESS_RELATIONSHIP);			
		}else {
			getLogger().info("File NOT passed, size is more than "+MAX_FILE_SIZE+ " ( "+flowFile.getSize()+" )");
			session.transfer(flowFile,FAIL_RELATIONSHIP);		
		}

    }

     ```

     6. Por último se compilara para generar el archivo .nar, que permite ser utilizado dentro de ApacheNifi, ingresar mediante una terminal a la raíz del proyecto donde se encuentra y ejecutar el siguiente comando.

     ```
     mvn clean install

     ```

Para mayor información consultar: 

[hortonworks](https://community.hortonworks.com/articles/4318/build-custom-nifi-processor.html)

[Silver Cloud](http://www.silvercloudcomputing.com/videos.html)