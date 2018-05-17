---
title: 6-Clúster de Hadoop de Azure HDInsight datos de 1 TB
---
# <a name="the-team-data-science-process-in-action---using-an-azure-hdinsight-hadoop-cluster-on-a-1-tb-dataset"></a>Proceso de ciencia de datos en equipos en acción: Uso de un clúster de Hadoop de Azure HDInsight en un conjunto de datos de 1 TB

En este tutorial, se describe cómo usar el proceso de ciencia de datos en equipos en un escenario completo con un [clúster de Hadoop de Azure HDInsight](https://azure.microsoft.com/services/hdinsight/) para almacenar, explorar y estudiar sus características desde el punto de vista de los ingenieros y reducir los datos de ejemplo de uno de los conjuntos de datos de [Criteo](http://labs.criteo.com/downloads/download-terabyte-click-logs/) que están disponibles públicamente. Este usa Azure Machine Learning para crear un modelo de clasificación binaria con estos datos. Asimismo, se muestra cómo publicar uno de estos modelos como un servicio web.

También es posible usar un cuaderno de iPython para realizar las tareas que se presentan en este tutorial. Los usuarios que deseen probar este método deben consultar el tema [Criteo walkthrough using a Hive ODBC connection](https://github.com/Azure/Azure-MachineLearning-DataScience/blob/master/Misc/DataScienceProcess/iPythonNotebooks/machine-Learning-data-science-process-hive-walkthrough-criteo.ipynb) (tutorial de Criteo con una conexión de ODBC de Hive).

## <a name="dataset"></a>Descripción del conjunto de datos de Criteo
Los datos de Criteo son un conjunto de datos de predicción de clics que ocupan aproximadamente 370 GB de archivos TSV comprimidos en gzip (1,3 TB aproximadamente sin comprimir). Constan de más de 4300 millones de registros. Estos datos proceden de 24 días de datos de clics que ofrece [Criteo](http://labs.criteo.com/downloads/download-terabyte-click-logs/). Para facilitar el trabajo de los científicos de datos, se han descomprimido los datos disponibles para nosotros a fin de experimentar con ellos.

Cada registro de este conjunto de datos contiene 40 columnas:

* La primera columna es una columna de etiqueta que indica si un usuario hace clic en un **anuncio** (valor 1) o si no hace clic (valor 0)
* Las 13 columnas siguientes son numéricas.
* Las últimas 26 son columnas de categorías.

Las columnas son anónimas y utilizan una serie de nombres enumerados: desde "Col1" (para la columna de etiqueta) hasta 'Col40 "(para la última columna de categoría).            

Este es un extracto de las 20 primeras columnas de dos observaciones (filas) de este conjunto de datos:

    Col1    Col2    Col3    Col4    Col5    Col6    Col7    Col8    Col9    Col10    Col11    Col12    Col13    Col14    Col15            Col16            Col17            Col18            Col19        Col20

    0       40      42      2       54      3       0       0       2       16      0       1       4448    4       1acfe1ee        1b2ff61f        2e8b2631        6faef306        c6fc10d3    6fcd6dcb           
    0               24              27      5               0       2       1               3       10064           9a8cb066        7a06385f        417e6103        2170fc56        acf676aa    6fcd6dcb                      

Hay valores que faltan en las columnas numéricas y de categorías de este conjunto de datos. A continuación, se describe un método sencillo para controlar los valores que faltan. Más adelante, se describirán detalles adicionales de los datos cuando estos se almacenen en tablas de Hive.

**Definición:***Porcentaje de clics (CTR, del inglés Click-through rate):* es el porcentaje de clics que se hacen en los datos. En este conjunto de datos de Criteo, el valor de CTR es aproximadamente del 3,3 % (o 0,033).

## <a name="mltasks"></a>Ejemplos de tareas de predicción
En este tutorial, se describen dos problemas de predicción de ejemplo:

1. **Clasificación binaria**: predice si un usuario ha hecho clic o no en un anuncio:
   
   * Clase 0: no hace clic.
   * Clase 1: sí hace clic.
2. **Regresión**: predice la probabilidad de que se haga clic en un anuncio en función de las características del usuario.

## <a name="setup"></a>Configuración de un clúster de Hadoop de HDInsight para la ciencia de los datos
**Nota:** Esta tarea la suelen hacer los **administradores**.

Configure su entorno de ciencia de datos de Azure para crear soluciones de análisis predictivos con los clústeres de HDInsight en tres pasos:

1. [Cree una cuenta de almacenamiento](../../storage/common/storage-create-storage-account.md): esta cuenta de almacenamiento se utiliza para almacenar datos en Azure Blob Storage. Los datos utilizados en los clústeres de HDInsight se almacenan aquí.
2. [Personalice los clústeres de Hadoop de HDInsight de Azure para la ciencia de los datos](customize-hadoop-cluster.md): en este paso, se crea un clúster de Hadoop de HDInsight de Azure con Anaconda Python 2.7 de 64 bits instalado en todos los nodos. Hay que llevar a cabo dos pasos importantes (descritos en este tema) para personalizar el clúster de HDInsight.
   
   * Hay que vincular la cuenta de almacenamiento que creó en el paso 1 con el clúster de HDInsight en el momento de su creación. Esta cuenta de almacenamiento se utiliza para tener acceso a datos que se pueden procesar en el clúster.
   * Debe habilitar el acceso remoto en el nodo principal del clúster después de crearlo. Recuerde las credenciales de acceso remoto que especifique aquí (distintas de las especificadas para el clúster durante su creación), ya que las necesitará para realizar los procedimientos a continuación.
3. [Cree un área de trabajo de Machine Learning (ML) de Azure](../studio/create-workspace.md): esta área de trabajo de Azure Machine Learning se usa para generar modelos de Machine Learning después de una exploración de datos inicial y una reducción de su tamaño en el clúster de HDInsight.

## <a name="getdata"></a>Obtención y consumo de datos desde un origen público
Para acceder al conjunto de datos de [Criteo](http://labs.criteo.com/downloads/download-terabyte-click-logs/) , haga clic en el vínculo, acepte las condiciones de uso y especifique un nombre. Aquí se muestra una instantánea de esta pantalla:

![Aceptar los términos de Criteo](./media/hive-criteo-walkthrough/hLxfI2E.png)

Haga clic en **Continue to download** (Continuar la descarga) para más información sobre el conjunto de datos y su disponibilidad.

Los datos residen en una ubicación pública de [Azure Blob Storage](../../storage/blobs/storage-dotnet-how-to-use-blobs.md): wasb://criteo@azuremlsampleexperiments.blob.core.windows.net/raw/. "wasb" hace referencia a la ubicación de Azure Storage Blob. 

1. Los datos de este almacenamiento de blobs público constan de tres subcarpetas de datos sin comprimir.
   
   1. La subcarpeta *raw/count/* contiene los primeros 21 días de datos, desde day\_00 hasta day\_20
   2. La subcarpeta *raw/train/* consta de un único día de datos, day\_21
   3. La subcarpeta *raw/test/* consta de dos días de datos, day\_22 y day\_23
2. Para aquellos que quieran empezar con los datos gzip sin formato, podrán encontrar estos datos también en la carpeta principal *raw/*, como day_NN.gz, donde NN es un valor entre 00 y 23.

Más adelante en este tutorial, al hablar de la creación de tablas de Hive, se expone un enfoque alternativo para acceder a estos datos, explorarlos y modelarlos que no requiere ninguna descarga local.

## <a name="login"></a>Inicio de sesión en el nodo principal del clúster
Para iniciar sesión en el nodo principal del clúster, utilice [Azure Portal](https://ms.portal.azure.com) para buscar el clúster. Haga clic en el icono del elefante de HDInsight a la izquierda y, a continuación, haga doble clic en el nombre del clúster. Navegue hasta la pestaña **Configuration** (Configuración), haga doble clic en el icono Connect (Conectar), situado en la parte inferior de la página, y escriba las credenciales de acceso remoto cuando se le soliciten. Así accederá al nodo principal del clúster.

Esto es lo que se ve normalmente al iniciar sesión por primera vez en el nodo principal del clúster:

![Iniciar sesión en el clúster](./media/hive-criteo-walkthrough/Yys9Vvm.png)

A la izquierda, aparece el icono de "Hadoop Command Line" (Línea de comandos de Hadoop), que será la herramienta de trabajo para explorar los datos. Observe dos direcciones URL útiles: "Hadoop Yarn Status" (Estado de Hadoop Yarn) y "Hadoop Name Node" (Nombre del nodo de Hadoop). La dirección URL del estado de Yarn muestra el progreso del trabajo, mientras que la URL del nombre del nodo proporciona detalles sobre la configuración del clúster.

Ya cuenta con la configuración adecuada y está listo para comenzar la primera parte del tutorial, que es la exploración de datos mediante Hive y la preparación de estos para Azure Machine Learning.

## <a name="hive-db-tables"></a> Creación de tablas y base de datos de Hive
Para crear tablas de Hive para nuestro conjunto de datos de Criteo, abra la ***Línea de comandos de Hadoop*** en el escritorio del nodo principal y especifique el directorio de Hive con este comando:

    cd %hive_home%\bin

> [!NOTE]
> Ejecute todos los comandos de Hive que aparecen en este tutorial desde el símbolo del sistema del directorio bin/ de Hive. De esta manera, cualquier problema con la ruta de acceso se soluciona automáticamente. Puede usar indistintamente los términos "símbolo del sistema del directorio de Hive", "símbolo del sistema del directorio bin/ de Hive" y "línea de comandos de Hadoop".
> 
> [!NOTE]
> Para ejecutar cualquier consulta de Hive, siempre se pueden utilizar los siguientes comandos:
> 
> 

        cd %hive_home%\bin
        hive

Después de que aparezca Hive REPL con un signo "hive >", solo tendrá que cortar y pegar la consulta para ejecutarla.

El código siguiente crea una base de datos "criteo" y, a continuación, genera 4 tablas:

* una *tabla para generar recuentos*, correspondientes a los días desde day\_00 a day\_20,
* una *tabla que se usa como el conjunto de datos "train"*, correspondiente a day\_21, y
* dos *tablas que se usan como los conjuntos de datos de prueba* correspondientes a day\_22 y day\_23, respectivamente.

Divida el conjunto de datos de prueba en dos tablas diferentes porque uno de los días es festivo. El objetivo consiste en determinar si el modelo puede detectar diferencias entre un día festivo y uno laborable a partir de la proporción de clics.

Para mayor comodidad, el script [sample&#95;hive&#95;create&#95;criteo&#95;database&#95;and&#95;tables.hql](https://github.com/Azure/Azure-MachineLearning-DataScience/blob/master/Misc/DataScienceProcess/DataScienceScripts/sample_hive_create_criteo_database_and_tables.hql) se muestra aquí:

    CREATE DATABASE IF NOT EXISTS criteo;
    DROP TABLE IF EXISTS criteo.criteo_count;
    CREATE TABLE criteo.criteo_count (
    col1 string,col2 double,col3 double,col4 double,col5 double,col6 double,col7 double,col8 double,col9 double,col10 double,col11 double,col12 double,col13 double,col14 double,col15 string,col16 string,col17 string,col18 string,col19 string,col20 string,col21 string,col22 string,col23 string,col24 string,col25 string,col26 string,col27 string,col28 string,col29 string,col30 string,col31 string,col32 string,col33 string,col34 string,col35 string,col36 string,col37 string,col38 string,col39 string,col40 string)
    ROW FORMAT DELIMITED FIELDS TERMINATED BY '\t'
    LINES TERMINATED BY '\n'
    STORED AS TEXTFILE LOCATION 'wasb://criteo@azuremlsampleexperiments.blob.core.windows.net/raw/count';

    DROP TABLE IF EXISTS criteo.criteo_train;
    CREATE TABLE criteo.criteo_train (
    col1 string,col2 double,col3 double,col4 double,col5 double,col6 double,col7 double,col8 double,col9 double,col10 double,col11 double,col12 double,col13 double,col14 double,col15 string,col16 string,col17 string,col18 string,col19 string,col20 string,col21 string,col22 string,col23 string,col24 string,col25 string,col26 string,col27 string,col28 string,col29 string,col30 string,col31 string,col32 string,col33 string,col34 string,col35 string,col36 string,col37 string,col38 string,col39 string,col40 string)
    ROW FORMAT DELIMITED FIELDS TERMINATED BY '\t'
    LINES TERMINATED BY '\n'
    STORED AS TEXTFILE LOCATION 'wasb://criteo@azuremlsampleexperiments.blob.core.windows.net/raw/train';

    DROP TABLE IF EXISTS criteo.criteo_test_day_22;
    CREATE TABLE criteo.criteo_test_day_22 (
    col1 string,col2 double,col3 double,col4 double,col5 double,col6 double,col7 double,col8 double,col9 double,col10 double,col11 double,col12 double,col13 double,col14 double,col15 string,col16 string,col17 string,col18 string,col19 string,col20 string,col21 string,col22 string,col23 string,col24 string,col25 string,col26 string,col27 string,col28 string,col29 string,col30 string,col31 string,col32 string,col33 string,col34 string,col35 string,col36 string,col37 string,col38 string,col39 string,col40 string)
    ROW FORMAT DELIMITED FIELDS TERMINATED BY '\t'
    LINES TERMINATED BY '\n'
    STORED AS TEXTFILE LOCATION 'wasb://criteo@azuremlsampleexperiments.blob.core.windows.net/raw/test/day_22';

    DROP TABLE IF EXISTS criteo.criteo_test_day_23;
    CREATE TABLE criteo.criteo_test_day_23 (
    col1 string,col2 double,col3 double,col4 double,col5 double,col6 double,col7 double,col8 double,col9 double,col10 double,col11 double,col12 double,col13 double,col14 double,col15 string,col16 string,col17 string,col18 string,col19 string,col20 string,col21 string,col22 string,col23 string,col24 string,col25 string,col26 string,col27 string,col28 string,col29 string,col30 string,col31 string,col32 string,col33 string,col34 string,col35 string,col36 string,col37 string,col38 string,col39 string,col40 string)
    ROW FORMAT DELIMITED FIELDS TERMINATED BY '\t'
    LINES TERMINATED BY '\n'
    STORED AS TEXTFILE LOCATION 'wasb://criteo@azuremlsampleexperiments.blob.core.windows.net/raw/test/day_23';

Todas estas tablas son externas ya que simplemente señalan a ubicaciones de Azure Storage Blob (WASB).

**Hay dos maneras de ejecutar TODAS las consultas de Hive:**

1. **Usar la línea de comandos de REPL de Hive**: el primer método consiste en emitir un comando "hive" y, a continuación, copiar la consulta y pegarla en la línea de comandos de REPL de Hive. Para ello, ejecute lo siguiente:
   
        cd %hive_home%\bin
        hive
   
     Ahora, en la línea de comandos de REPL, la consulta se ejecuta al cortarla y pegarla.
2. **Guardar las consultas en un archivo y ejecutar el comando**: el segundo método consiste en guardar las consultas en un archivo .hql ([sample&amp;#95;hive&amp;#95;create&amp;#95;criteo&amp;#95;database&amp;#95;and&amp;#95;tables.hql](https://github.com/Azure/Azure-MachineLearning-DataScience/blob/master/Misc/DataScienceProcess/DataScienceScripts/sample_hive_create_criteo_database_and_tables.hql)) y, después, emitir el comando siguiente para ejecutar la consulta:
   
        hive -f C:\temp\sample_hive_create_criteo_database_and_tables.hql

### <a name="confirm-database-and-table-creation"></a>Confirmación de la creación de la tabla y la base de datos
A continuación, confirme la creación de la base de datos con el comando siguiente desde el símbolo del sistema del directorio bin/ de Hive:

        hive -e "show databases;"

Este es el resultado:

        criteo
        default
        Time taken: 1.25 seconds, Fetched: 2 row(s)

Esto confirma la creación de la nueva base de datos, "criteo".

Para ver qué tablas se han creado, simplemente emita este comando desde el símbolo del sistema del directorio bin/ de Hive:

        hive -e "show tables in criteo;"

A continuación, debería ver la siguiente salida:

        criteo_count
        criteo_test_day_22
        criteo_test_day_23
        criteo_train
        Time taken: 1.437 seconds, Fetched: 4 row(s)

## <a name="exploration"></a> Exploración de datos en Hive
Ahora ya está preparado para hacer algunas exploraciones de datos básicas en Hive. Puede empezar por contar el número de ejemplos de las tablas de datos "train" y "test".

### <a name="number-of-train-examples"></a>Número de ejemplos de "train"
El contenido de [sample&#95;hive&#95;count&#95;train&#95;table&#95;examples.hql](https://github.com/Azure/Azure-MachineLearning-DataScience/blob/master/Misc/DataScienceProcess/DataScienceScripts/sample_hive_count_train_table_examples.hql) se muestra aquí:

        SELECT COUNT(*) FROM criteo.criteo_train;

El resultado es:

        192215183
        Time taken: 264.154 seconds, Fetched: 1 row(s)

Como alternativa, también se puede emitir el comando siguiente desde el símbolo del sistema del directorio bin/ de Hive:

        hive -f C:\temp\sample_hive_count_criteo_train_table_examples.hql

### <a name="number-of-test-examples-in-the-two-test-datasets"></a>Número de ejemplos de "test" en los dos conjuntos de datos
Ahora cuente el número de ejemplos que hay en los dos conjuntos de datos "test". El contenido de [sample&#95;hive&#95;count&#95;criteo&#95;test&#95;day&#95;22&#95;table&#95;examples.hql](https://github.com/Azure/Azure-MachineLearning-DataScience/blob/master/Misc/DataScienceProcess/DataScienceScripts/sample_hive_count_criteo_test_day_22_table_examples.hql) es el siguiente:

        SELECT COUNT(*) FROM criteo.criteo_test_day_22;

El resultado es:

        189747893
        Time taken: 267.968 seconds, Fetched: 1 row(s)

Como es habitual, también puede llamar al script desde el símbolo del sistema del directorio bin/ de Hive emitiendo el comando:

        hive -f C:\temp\sample_hive_count_criteo_test_day_22_table_examples.hql

Por último, examine el número de ejemplos de prueba que hay en el conjunto de datos "test" basado en day\_23.

El comando para hacer esto es similar al anterior (vea [sample&#95;hive&#95;count&#95;criteo&#95;test&#95;day&#95;23&#95;examples.hql](https://github.com/Azure/Azure-MachineLearning-DataScience/blob/master/Misc/DataScienceProcess/DataScienceScripts/sample_hive_count_criteo_test_day_23_examples.hql)):

        SELECT COUNT(*) FROM criteo.criteo_test_day_23;

Este es el resultado:

        178274637
        Time taken: 253.089 seconds, Fetched: 1 row(s)

### <a name="label-distribution-in-the-train-dataset"></a>Distribución de etiquetas en el conjunto de datos "train"
La distribución de etiquetas del conjunto de datos "train" es interesante. Para verlo, muestre el contenido de [sample&#95;hive&#95;criteo&#95;label&#95;distribution&#95;train&#95;table.hql](https://github.com/Azure/Azure-MachineLearning-DataScience/blob/master/Misc/DataScienceProcess/DataScienceScripts/sample_hive_criteo_label_distribution_train_table.hql):

        SELECT Col1, COUNT(*) AS CT FROM criteo.criteo_train GROUP BY Col1;

De esta forma, obtenemos la distribución de etiquetas:

        1       6292903
        0       185922280
        Time taken: 459.435 seconds, Fetched: 2 row(s)

Tenga en cuenta que el porcentaje de las etiquetas positivas es del 3,3 % (coherente con el conjunto de datos original).

### <a name="histogram-distributions-of-some-numeric-variables-in-the-train-dataset"></a>Distribuciones del histograma de algunas variables numéricas en el conjunto de datos "train"
Puede usar la función nativa de Hive "histogram\_numeric" para conocer el aspecto de la distribución de las variables numéricas. El contenido de [sample&#95;hive&#95;criteo&#95;histogram&#95;numeric.hql](https://github.com/Azure/Azure-MachineLearning-DataScience/blob/master/Misc/DataScienceProcess/DataScienceScripts/sample_hive_criteo_histogram_numeric.hql) es el siguiente:

        SELECT CAST(hist.x as int) as bin_center, CAST(hist.y as bigint) as bin_height FROM
            (SELECT
            histogram_numeric(col2, 20) as col2_hist
            FROM
            criteo.criteo_train
            ) a
            LATERAL VIEW explode(col2_hist) exploded_table as hist;

El resultado es este:

        26      155878415
        2606    92753
        6755    22086
        11202   6922
        14432   4163
        17815   2488
        21072   1901
        24113   1283
        27429   1225
        30818   906
        34512   723
        38026   387
        41007   290
        43417   312
        45797   571
        49819   428
        53505   328
        56853   527
        61004   160
        65510   3446
        Time taken: 317.851 seconds, Fetched: 20 row(s)

La combinación "LATERAL VIEW - explode" en Hive sirve para producir un resultado similar a SQL en lugar de la lista habitual. Tenga en cuenta que, en esta tabla, la primera columna corresponde al centro de bin y la segunda, a la frecuencia de bin.

### <a name="approximate-percentiles-of-some-numeric-variables-in-the-train-dataset"></a>Percentiles aproximados de algunas de las variables numéricas del conjunto de datos "train"
Con respecto a las variables numéricas, también es interesante el cálculo de los percentiles aproximados. La función nativa de Hive "percentile\_approx" permite realizar esta acción. El contenido de [sample&#95;hive&#95;criteo&#95;approximate&#95;percentiles.hql](https://github.com/Azure/Azure-MachineLearning-DataScience/blob/master/Misc/DataScienceProcess/DataScienceScripts/sample_hive_criteo_approximate_percentiles.hql) es el siguiente:

        SELECT MIN(Col2) AS Col2_min, PERCENTILE_APPROX(Col2, 0.1) AS Col2_01, PERCENTILE_APPROX(Col2, 0.3) AS Col2_03, PERCENTILE_APPROX(Col2, 0.5) AS Col2_median, PERCENTILE_APPROX(Col2, 0.8) AS Col2_08, MAX(Col2) AS Col2_max FROM criteo.criteo_train;

El resultado es:

        1.0     2.1418600917169246      2.1418600917169246    6.21887086390288 27.53454893115633       65535.0
        Time taken: 564.953 seconds, Fetched: 1 row(s)

La distribución de los percentiles suele estar estrechamente relacionada con la distribución de histograma de cualquier variable numérica.         

### <a name="find-number-of-unique-values-for-some-categorical-columns-in-the-train-dataset"></a>Búsqueda del número de valores únicos para algunas columnas de categorías en el conjunto de datos "train"
Continúe con la exploración de datos y busque el número de valores únicos que adoptan algunas columnas de categorías. Para ello, muestre el contenido de [sample&#95;hive&#95;criteo&#95;unique&#95;values&#95;categoricals.hql](https://github.com/Azure/Azure-MachineLearning-DataScience/blob/master/Misc/DataScienceProcess/DataScienceScripts/sample_hive_criteo_unique_values_categoricals.hql):

        SELECT COUNT(DISTINCT(Col15)) AS num_uniques FROM criteo.criteo_train;

El resultado es:

        19011825
        Time taken: 448.116 seconds, Fetched: 1 row(s)

Tenga en cuenta que Col15 tiene 19 millones de valores únicos. Usar técnicas simples como la codificación "one-hot" para codificar estas variables de categorías tan altamente dimensionales no es viable. En particular, se explica y muestra una técnica sólida y eficaz llamada [Aprendizaje con recuentos](http://blogs.technet.com/b/machinelearning/archive/2015/02/17/big-learning-made-easy-with-counts.aspx) para hacer frente a este problema de forma eficaz.

Finalmente, examine también el número de valores únicos de algunas otras columnas de categorías. El contenido de [sample&#95;hive&#95;criteo&#95;unique&#95;values&#95;multiple&#95;categoricals.hql](https://github.com/Azure/Azure-MachineLearning-DataScience/blob/master/Misc/DataScienceProcess/DataScienceScripts/sample_hive_criteo_unique_values_multiple_categoricals.hql) es el siguiente:

        SELECT COUNT(DISTINCT(Col16)), COUNT(DISTINCT(Col17)),
        COUNT(DISTINCT(Col18), COUNT(DISTINCT(Col19), COUNT(DISTINCT(Col20))
        FROM criteo.criteo_train;

El resultado es:

        30935   15200   7349    20067   3
        Time taken: 1933.883 seconds, Fetched: 1 row(s)

De nuevo observe que, excepto Col20, todas las demás columnas tienen muchos valores únicos.

### <a name="co-occurrence-counts-of-pairs-of-categorical-variables-in-the-train-dataset"></a>Recuentos de aparición conjunta de pares de variables de categorías en el conjunto de datos "train"

Los recuentos de aparición conjunta de pares de variables de categorías también son interesantes. Esto se puede determinar con el código de [sample&#95;hive&#95;criteo&#95;paired&#95;categorical&#95;counts.hql](https://github.com/Azure/Azure-MachineLearning-DataScience/blob/master/Misc/DataScienceProcess/DataScienceScripts/sample_hive_criteo_paired_categorical_counts.hql):

        SELECT Col15, Col16, COUNT(*) AS paired_count FROM criteo.criteo_train GROUP BY Col15, Col16 ORDER BY paired_count DESC LIMIT 15;

Invierta el orden de los recuentos en función de su aparición y muestre los 15 primeros en este caso. El resultado obtenido es el siguiente:

        ad98e872        cea68cd3        8964458
        ad98e872        3dbb483e        8444762
        ad98e872        43ced263        3082503
        ad98e872        420acc05        2694489
        ad98e872        ac4c5591        2559535
        ad98e872        fb1e95da        2227216
        ad98e872        8af1edc8        1794955
        ad98e872        e56937ee        1643550
        ad98e872        d1fade1c        1348719
        ad98e872        977b4431        1115528
        e5f3fd8d        a15d1051        959252
        ad98e872        dd86c04a        872975
        349b3fec        a52ef97d        821062
        e5f3fd8d        a0aaffa6        792250
        265366bf        6f5c7c41        782142
        Time taken: 560.22 seconds, Fetched: 15 row(s)

## <a name="downsample"></a> Reducción del tamaño de los conjuntos de datos para Azure Machine Learning
Una vez que se han explorado los conjuntos de datos y se ha mostrado cómo se hace este tipo de exploración sobre cualquier variable (incluidas las combinaciones), reduzca el tamaño de los conjuntos de datos de ejemplo para que se puedan crear modelos en Azure Machine Learning. Recuerde que el problema en el que nos centramos es el siguiente: considerando un conjunto de atributos de ejemplo (valores de las características desde Col2 hasta Col40), puede predecir si Col1 tendrá un valor 0 (no se hace clic) o un valor 1 (sí se hace clic).

Para reducir el tamaño de los conjuntos de datos "train" y "test" al 1 % del tamaño original, utilizamos la función RAND() nativa de Hive. El siguiente script, [sample&#95;hive&#95;criteo&#95;downsample&#95;train&#95;dataset.hql](https://github.com/Azure/Azure-MachineLearning-DataScience/blob/master/Misc/DataScienceProcess/DataScienceScripts/sample_hive_criteo_downsample_train_dataset.hql), nos permite hacerlo con el conjunto de datos "train":

        CREATE TABLE criteo.criteo_train_downsample_1perc (
        col1 string,col2 double,col3 double,col4 double,col5 double,col6 double,col7 double,col8 double,col9 double,col10 double,col11 double,col12 double,col13 double,col14 double,col15 string,col16 string,col17 string,col18 string,col19 string,col20 string,col21 string,col22 string,col23 string,col24 string,col25 string,col26 string,col27 string,col28 string,col29 string,col30 string,col31 string,col32 string,col33 string,col34 string,col35 string,col36 string,col37 string,col38 string,col39 string,col40 string)
        ROW FORMAT DELIMITED FIELDS TERMINATED BY '\t'
        LINES TERMINATED BY '\n'
        STORED AS TEXTFILE;

        ---Now downsample and store in this table

        INSERT OVERWRITE TABLE criteo.criteo_train_downsample_1perc SELECT * FROM criteo.criteo_train WHERE RAND() <= 0.01;

El resultado es:

        Time taken: 12.22 seconds
        Time taken: 298.98 seconds

El script [sample&#95;hive&#95;criteo&#95;downsample&#95;test&#95;day&#95;22&#95;dataset.hql](https://github.com/Azure/Azure-MachineLearning-DataScience/blob/master/Misc/DataScienceProcess/DataScienceScripts/sample_hive_criteo_downsample_test_day_22_dataset.hql) permite hacerlo con los datos de "test", en concreto, en day\_22:

        --- Now for test data (day_22)

        CREATE TABLE criteo.criteo_test_day_22_downsample_1perc (
        col1 string,col2 double,col3 double,col4 double,col5 double,col6 double,col7 double,col8 double,col9 double,col10 double,col11 double,col12 double,col13 double,col14 double,col15 string,col16 string,col17 string,col18 string,col19 string,col20 string,col21 string,col22 string,col23 string,col24 string,col25 string,col26 string,col27 string,col28 string,col29 string,col30 string,col31 string,col32 string,col33 string,col34 string,col35 string,col36 string,col37 string,col38 string,col39 string,col40 string)
        ROW FORMAT DELIMITED FIELDS TERMINATED BY '\t'
        LINES TERMINATED BY '\n'
        STORED AS TEXTFILE;

        INSERT OVERWRITE TABLE criteo.criteo_test_day_22_downsample_1perc SELECT * FROM criteo.criteo_test_day_22 WHERE RAND() <= 0.01;

El resultado es:

        Time taken: 1.22 seconds
        Time taken: 317.66 seconds


Por último, el script [sample&#95;hive&#95;criteo&#95;downsample&#95;test&#95;day&#95;23&#95;dataset.hql](https://github.com/Azure/Azure-MachineLearning-DataScience/blob/master/Misc/DataScienceProcess/DataScienceScripts/sample_hive_criteo_downsample_test_day_23_dataset.hql) permite hacerlo con los datos de "test", en concreto, en day\_23:

        --- Finally test data day_23
        CREATE TABLE criteo.criteo_test_day_23_downsample_1perc (
        col1 string,col2 double,col3 double,col4 double,col5 double,col6 double,col7 double,col8 double,col9 double,col10 double,col11 double,col12 double,col13 double,col14 double,col15 string,col16 string,col17 string,col18 string,col19 string,col20 string,col21 string,col22 string,col23 string,col24 string,col25 string,col26 string,col27 string,col28 string,col29 string,col30 string,col31 string,col32 string,col33 string,col34 string,col35 string,col36 string,col37 string,col38 string,col39 string,col40 srical feature; tring)
        ROW FORMAT DELIMITED FIELDS TERMINATED BY '\t'
        LINES TERMINATED BY '\n'
        STORED AS TEXTFILE;

        INSERT OVERWRITE TABLE criteo.criteo_test_day_23_downsample_1perc SELECT * FROM criteo.criteo_test_day_23 WHERE RAND() <= 0.01;

El resultado es:

        Time taken: 1.86 seconds
        Time taken: 300.02 seconds

De esta forma, ya está listo para usar nuestros conjuntos de datos "train" y "test" con el tamaño reducido para crear modelos en Azure Machine Learning.

Hay un componente importante final antes de pasar a Azure Machine Learning, que concierne a la tabla de recuento. En la subsección siguiente, la tabla de recuento se explica con más detalle.

## <a name="count"></a> Breve explicación sobre la tabla de recuento
Como se ha visto, algunas variables de categorías tienen una dimensionalidad muy alta. En el tutorial, se presenta una técnica llamada [Aprendizaje con recuentos](http://blogs.technet.com/b/machinelearning/archive/2015/02/17/big-learning-made-easy-with-counts.aspx) para codificar estas variables de una manera sólida y eficaz. Para obtener más información sobre esta técnica, acceda al vínculo proporcionado.

[!NOTE]
>Este tutorial se centra en el uso de las tablas de recuento para producir representaciones compactas de características de categorías con una alta dimensionalidad. Esta no es la única manera de codificar características de las categorías. Para más información sobre otras técnicas, los usuarios interesados pueden ver la información sobre la [codificación "one-hot"](http://en.wikipedia.org/wiki/One-hot) y la [aplicación de hash a las características](http://en.wikipedia.org/wiki/Feature_hashing).
>

Para crear tablas de recuento en los datos de recuento, se utilizan los datos de la carpeta raw/count. En la sección de modelado, se muestra a los usuarios cómo crear estas tablas de recuento para características de categorías desde cero, así como a utilizar una tabla de recuento pregenerada para sus exploraciones. En lo sucesivo, cuando nos referimos a las "tablas de recuento pregeneradas", nos referimos a usar las tablas de recuento proporcionadas. En la siguiente sección encontrará instrucciones detalladas sobre cómo obtener acceso a estas tablas.

## <a name="aml"></a> Creación de modelos con Azure Machine Learning
Nuestro proceso de creación de modelos con Azure Machine Learning consta de estos pasos:

1. [Obtención de los datos a partir de las tablas de Hive para Azure Machine Learning](#step1)
2. [Creación del experimento: limpieza de los datos y caracterización con tablas de recuento](#step2)
3. [Crear, entrenar y puntuar el modelo](#step3)
4. [Evaluación del modelo](#step4)
5. [Publicación del modelo como un servicio web](#step5)

Ahora ya está preparado para generar modelos en Azure Machine Learning Studio. Nuestros datos con tamaño reducido están guardados como tablas de Hive en el clúster. Use el módulo **Importar datos** de Azure Machine Learning para leer estos datos. Las credenciales para acceder a la cuenta de almacenamiento de este clúster se proporcionan a continuación.

### <a name="step1"></a> Paso 1: Obtención de los datos a partir de las tablas de Hive para Azure Machine Learning usando el módulo Importar datos y seleccionándolo para un experimento de aprendizaje automático
Para empezar, seleccione **+NUEVO** -> **EXPERIMENTO** -> **Experimento en blanco**. A continuación, en el cuadro **Búsqueda**, en la parte superior izquierda, busque "Importar datos". Arrastre y coloque el módulo **Importar datos** en el lienzo del experimento (la parte central de la pantalla) para usar el módulo para acceder a los datos.

Este es el aspecto del módulo **Importar datos** mientas está obteniendo los datos de la tabla de Hive:

![Importar datos obtiene los datos](./media/hive-criteo-walkthrough/i3zRaoj.png)

Para el módulo **Importar datos** , los valores de los parámetros que se proporcionan en el gráfico son solo algunos ejemplos del tipo de valores que tiene que proporcionar. A continuación se ofrecen algunas instrucciones generales acerca de cómo rellenar el conjunto de parámetros para el módulo **Importar datos** .

1. Elija "Consulta de Hive" como **Origen de datos**
2. En el cuadro **Consulta de base de datos de Hive**, basta con seleccionar SELECT * FROM <nombre\_base\_datos.nombre\_tabla\_>.
3. **URI del servidor de Hcatalog**: si el clúster es "abc", este valor simplemente será: https://abc.azurehdinsight.net
4. **Nombre de la cuenta de usuario de Hadoop**: el nombre de usuario elegido en el momento de dar de alta el clúster. (No es el nombre de usuario de acceso remoto).
5. **Contraseña de la cuenta de usuario de Hadoop**: la contraseña de usuario elegida en el momento de dar de alta el clúster. (NO es la contraseña de acceso remoto).
6. **Ubicación de los datos de salida**: elija "Azure".
7. **Nombre de la cuenta de almacenamiento de Azure**: la cuenta de almacenamiento asociada al clúster.
8. **Clave de la cuenta de almacenamiento de Azure**: la clave de almacenamiento asociada al clúster.
9. **Nombre del contenedor de Azure**: si el nombre de clúster es "abc", este campo suele ser simplemente "abc".

Una vez que el módulo **Importar datos** finaliza la obtención de datos (aparece una marca de verificación verde en el módulo), guarde estos datos como un conjunto de datos (con el nombre que desee). Este es el aspecto:

![Importar datos guarda los datos](./media/hive-criteo-walkthrough/oxM73Np.png)

Haga clic con el botón derecho en el puerto de salida del módulo **Importar datos** . Se muestran las opciones **Guardar como conjunto de datos** y **Visualizar**. Si se hace clic en la opción **Visualize** (Visualizar), se muestran 100 filas de los datos, junto con un panel derecho que es útil para algunas estadísticas de resumen. Para guardar los datos, simplemente seleccione **Save as dataset** (Guardar como conjunto de datos) y siga las instrucciones.

Para seleccionar el conjunto de datos guardado para usarlo en un experimento de aprendizaje automático, busque los conjuntos de datos usando el cuadro **Búsqueda** que se muestra en la siguiente ilustración. A continuación, escriba parcialmente el nombre que asignó al conjunto de datos para acceder a él y arrastre el conjunto de datos hasta el panel principal. Al depositarlo en el panel principal, se selecciona para su uso en el modelado de Aprendizaje automático.

![Movimiento de arrastre del conjunto de datos hasta el panel principal](./media/hive-criteo-walkthrough/cl5tpGw.png)

> [!NOTE]
> Realice esta acción para los conjuntos de datos "test" y "train". Además, recuerde usar el nombre de la base de datos y los nombres de tabla que ha asignado para este propósito. Los valores usados en la ilustración tienen únicamente fines ilustrativos.**
> 
> 

### <a name="step2"></a> Paso 2: creación de un experimento sencillo en Azure Machine Learning Studio para predecir los clics y los "no clics"
Nuestro experimento de Azure Machine Learning tiene el siguiente aspecto:

![Experimento de Machine Learning](./media/hive-criteo-walkthrough/xRpVfrY.png)

Ahora examine los componentes clave de este experimento. Arrastre los conjuntos de datos train y test a nuestro lienzo de experimento antes.

#### <a name="clean-missing-data"></a>Limpiar datos que faltan
El módulo **Limpiar datos que faltan** hace lo que sugiere su nombre: limpia los datos que faltan siguiendo el método que especifique el usuario. En este módulo, se ven estos datos:

![Limpiar datos que faltan](./media/hive-criteo-walkthrough/0ycXod6.png)

Aquí, opte por reemplazar todos los valores que faltan por un 0. Hay otras opciones, que se pueden ver al mirar las listas desplegables del módulo.

#### <a name="feature-engineering-on-the-data"></a>Diseño de características para los datos
Puede haber millones de valores únicos para algunas características de categoría de grandes conjuntos de datos. El uso de métodos simples como la codificación "one-hot" para representar estas características de categorías no es viable. En este tutorial, se muestra cómo usar las características de recuento mediante módulos de Azure Machine Learning integrados para generar representaciones compactas de estas variables de categorías con una alta dimensionalidad. El resultado final es un tamaño de modelo más pequeño, tiempos de formación más rápidos y métricas de rendimiento bastante similares a usar otras técnicas.

##### <a name="building-counting-transforms"></a>Creación de transformaciones de recuento
Para crear características de recuento, use el módulo **Crear transformación de recuento**, que está disponible en Azure Machine Learning. El módulo tiene este aspecto:

![Módulo Crear transformación de recuento](./media/hive-criteo-walkthrough/e0eqKtZ.png)
![Módulo Crear transformación de recuento](./media/hive-criteo-walkthrough/OdDN0vw.png)

> [!IMPORTANT] 
> En el cuadro **Recuento de columnas**, especifique las columnas en las que desea realizar recuentos. Normalmente, son columnas de categorías con una alta dimensionalidad (tal y como se mencionó). Recuerde que el conjunto de datos de Criteo tiene 26 columnas de categorías: de Col15 a Col40. En este caso, se cuenta en todas ellas y se les dan sus índices (de 15 a 40 separados por comas, como se muestra).
> 

Para usar el módulo en el modo MapReduce (adecuado para grandes conjuntos de datos), se necesita acceso a un clúster de Hadoop de HDInsight (el que se usa para la exploración de categorías se puede reutilizar para este propósito) y sus credenciales. En las ilustraciones anteriores se muestra el aspecto de los valores rellenados (reemplace los valores de ejemplo por los que son relevantes para su propio caso de uso).

![Parámetros del módulo](./media/hive-criteo-walkthrough/05IqySf.png)

En la ilustración anterior, se muestra cómo especificar la ubicación del blob de entrada. Esta ubicación tiene los datos reservados para la creación de tablas de recuento.

Cuando finalice este módulo, guarde la transformación para más adelante haciendo clic con el botón derecho en el módulo y seleccionando la opción **Save as Transform** (Guardar como transformación):

![Opción "Guardar como transformación"](./media/hive-criteo-walkthrough/IcVgvHR.png)

En nuestra arquitectura de experimento antes mostrada, el conjunto de datos "ytransform2" corresponde exactamente a una transformación de recuento guardada. Para el resto de este experimento, se considera que el lector usó un módulo **Crear transformación de recuento** con algunos datos para generar recuentos y, a continuación, puede usar estos recuentos para generar características de recuento en los conjuntos de datos train y test.

##### <a name="choosing-what-count-features-to-include-as-part-of-the-train-and-test-datasets"></a>Elección de las características de recuento que se incluirán como parte de los conjuntos de datos train y test
Una vez que hay una transformación de recuento lista, el usuario puede elegir las características que desea incluir en los conjuntos de datos train y test mediante el módulo **Modificar parámetros de la tabla de recuentos**. Por tener una visión completa, este módulo se muestra aquí. Pero para simplificar no se usará en el experimento.

![Parámetros de la tabla de modificación de recuentos](./media/hive-criteo-walkthrough/PfCHkVg.png)

En este caso, como se puede ver, se van a usar las probabilidades y se va a ignorar la columna de retroceso. También puede establecer parámetros como el umbral de ubicación de elementos no utilizados, cuántos ejemplos anteriores agregar para el suavizado y si se usa cualquier ruido Laplacian o no. Todas estas son características avanzadas y es conveniente tener en cuenta que los valores predeterminados son un buen punto de partida para los usuarios que no están familiarizados con este tipo de generación de características.

##### <a name="data-transformation-before-generating-the-count-features"></a>Transformación de datos antes de generar las características de recuento
Ahora nos centraremos en un punto importante acerca de cómo transformar los datos de train y test antes de generar realmente las características de recuento. Tenga en cuenta que hay dos módulos **Ejecutar script R** usados antes de aplicar la transformación de recuentos a nuestros datos.

![Ejecución de módulos de script R](./media/hive-criteo-walkthrough/aF59wbc.png)

Este es el primer script R:

![Primer script de R](./media/hive-criteo-walkthrough/3hkIoMx.png)

En este script R, cambien el nombre de las columnas para que vaya de "Col1" a "Col40". Esto es así porque la transformación de recuentos espera nombres con este formato.

El segundo script R equilibra la distribución entre clases positivas y negativas (clases 1 y 0 respectivamente) reduciendo la resolución de la clase negativa. El siguiente script R muestra cómo hacerlo:

![Segundo script de R](./media/hive-criteo-walkthrough/91wvcwN.png)

En este script R simple, se usa "pos\_neg\_ratio" para establecer la cantidad de equilibrio entre las clases positiva y negativa. Es importante hacerlo, ya que mejorar el desequilibrio entre clases normalmente tiene ventajas de rendimiento para los problemas de clasificación en los que la distribución de las clases se había sesgado (recuerde que en este caso, tiene una clase positiva del 3,3% y una clase negativa del 96,7%).

##### <a name="applying-the-count-transformation-on-our-data"></a>Aplicación de la transformación de recuentos a nuestros datos
Por último, puede usar el módulo **Aplicar transformación** para aplicar las transformaciones de recuentos a nuestros conjuntos de datos train y test. Este módulo toma la transformación de recuentos guardada como una entrada y los conjuntos de datos train o test como la otra entrada, y devuelve datos con características de recuento. Se muestra aquí:

![Módulo Aplicar transformación](./media/hive-criteo-walkthrough/xnQvsYf.png)

##### <a name="an-excerpt-of-what-the-count-features-look-like"></a>Un extracto del aspecto de las características de recuento
Es instructivo para ver el aspecto de las características de recuento en nuestro caso. Aquí se muestra un extracto de esto:

![Características de recuento](./media/hive-criteo-walkthrough/FO1nNfw.png)

En este extracto, se muestra que para las columnas en las que se ha hecho el recuento, se obtienen los recuentos y probabilidades, además de cualquier retroceso pertinente.

Ahora ya está listo para crear un modelo de Azure Machine Learning con estos conjuntos de datos transformados. En la siguiente sección se explica cómo se puede hacer esto.

### <a name="step3"></a>Paso 3: Creación, entrenamiento y puntuación del modelo

#### <a name="choice-of-learner"></a>Elección del aprendiz
En primer lugar, tiene que elegir un aprendiz. Use como aprendiz un árbol de decisiones incrementado de dos clases. Aquí están las opciones predeterminadas para este aprendiz:

![Parámetros de árbol de decisiones incrementados de dos clases](./media/hive-criteo-walkthrough/bH3ST2z.png)

Para el experimento, elija los valores predeterminados. Tenga en cuenta que los valores predeterminados son normalmente significativos y una buena forma de obtener las líneas base rápidas del rendimiento. Puede mejorar el rendimiento mediante el barrido de parámetros si elige hacerlo una vez que tenga una línea base.

#### <a name="train-the-model"></a>Entrenamiento del modelo
Para el entrenamiento, simplemente invoque un módulo **Entrenar modelo**. Las dos entradas son el aprendiz de árbol de decisión incrementado de dos clases y nuestro conjunto de datos train. Esto se muestra a continuación:

![Módulo Entrenar modelo](./media/hive-criteo-walkthrough/2bZDZTy.png)

#### <a name="score-the-model"></a>Puntuación del modelo
Una vez que tenga un modelo entrenado, estará preparado para puntuar el conjunto de datos test y evaluar su rendimiento. Hágalo mediante el módulo **Puntuar modelo** mostrado en la siguiente ilustración, con un módulo **Evaluar modelo**:

![Score Model module](./media/hive-criteo-walkthrough/fydcv6u.png)

### <a name="step4"></a> Paso 4: Evaluación del modelo
Por último, debe analizar el rendimiento del modelo. Normalmente, para los problemas de clasificación (binarios) de dos clases, una buena medida es AUC. Para visualizar esto, conectamos el módulo **Puntuar modelo** con un módulo **Evaluar modelo**. Al hacer clic en **Visualizar** en el módulo **Evaluate Model (Evaluar modelo)**, se genera un gráfico como el siguiente:

![Módulo Evaluación del modelo de BDT](./media/hive-criteo-walkthrough/0Tl0cdg.png)

En los problemas de clasificación binarios (o de dos clases), una buena medida de la exactitud de la predicción es Área bajo curva (AUC). En la sección siguiente se muestran nuestros resultados al usar este modelo en nuestro conjunto de datos "test". Para ver los resultados, haga clic con el botón derecho en el puerto de salida del módulo **Evaluate Model (Evaluar modelo)** y seleccione **Visualizar**.

![Visualización del módulo Evaluar modelo](./media/hive-criteo-walkthrough/IRfc7fH.png)

### <a name="step5"></a> Paso 5: Publicación del modelo como un servicio web
La capacidad de publicar un modelo de Azure Machine Learning como servicios web con una complicación mínima es una característica valiosa para que esté ampliamente disponible. Una vez hecho esto, cualquier persona puede realizar llamadas al servicio web con los datos de entrada para los que necesitan predicciones, y el servicio web usa el modelo para devolver dichas predicciones.

Para ello, primero guarde el modelo con el que hemos entrenado como un objeto del Modelo entrenado. Haga clic con el botón derecho en el módulo **Entrenar modelo** y use la opción **Save as Trained Model (Guardar como modelo entrenado)**.

A continuación, cree puertos de entrada y salida para nuestro servicio web:

* Un puerto de entrada toma los datos de la misma forma que los datos para los que necesita predicciones
* Un puerto de salida devuelve las etiquetas puntuadas y las probabilidades asociadas.

#### <a name="select-a-few-rows-of-data-for-the-input-port"></a>Selección de algunas filas de datos para el puerto de entrada
Es cómodo usar una **Transformación de aplicación de SQL** para seleccionar solo 10 filas que sirvan como los datos del puerto de entrada. Seleccione estas filas de datos para el puerto de entrada mediante la consulta SQL que se muestra aquí:

![Datos del puerto de entrada](./media/hive-criteo-walkthrough/XqVtSxu.png)

#### <a name="web-service"></a>Servicio web
Ahora ya está preparado para realizar un pequeño experimento que puede utilizarse para publicar el servicio web.

#### <a name="generate-input-data-for-webservice"></a>Generación de datos de entrada para el servicio web
Como paso inicial, ya que la tabla de recuento es grande, tome unas pocas líneas de datos de prueba y genere datos de salida a partir de ellos con características de recuento. Esto puede servir como formato de datos de entrada para nuestro servicio web. Esto se muestra a continuación:

![Creación de datos de entrada de BDT](./media/hive-criteo-walkthrough/OEJMmst.png)

> [!NOTE]
> Para el formato de datos de entrada, utilice ahora la salida del módulo **Caracterizador de recuento**. Una vez que este experimento termina de ejecutarse, guarde la salida del módulo **Caracterizador de recuento** como un conjunto de datos. Este conjunto de datos se usa para los datos de entrada en el servicio web.
> 
> 

#### <a name="scoring-experiment-for-publishing-webservice"></a>Puntuación del experimento para la publicación del servicio web
En primer lugar, veamos el aspecto que tiene. La estructura fundamental es un módulo **Puntuar modelo** que acepta el objeto del modelo entrenado y unas pocas líneas de datos de entrada que hemos generado en los pasos anteriores con el módulo **Caracterizador de recuento**. Use "Seleccionar columnas de conjunto de datos" para proyectar las etiquetas puntuadas y las probabilidades de puntuación.

![Seleccionar columnas de conjunto de datos](./media/hive-criteo-walkthrough/kRHrIbe.png)

Observe cómo el módulo **Seleccionar columnas de conjunto de datos** puede usarse para 'filtrar' datos de un conjunto de datos. El contenido se muestra aquí:

![Filtrado con el módulo Seleccionar columnas de conjunto de datos](./media/hive-criteo-walkthrough/oVUJC9K.png)

Para obtener los puertos de salida y entrada azules, basta con hacer clic en **Preparar servicio web** en la esquina inferior derecha. Al realizar este experimento también podemos publicar el servicio web haciendo clic en el icono **Publicar servicio web** situado en la esquina inferior derecha, como se muestra aquí:

![Publicar servicio web](./media/hive-criteo-walkthrough/WO0nens.png)

Una vez publicado el servicio web, acceda a una página como esta:

![Panel del servicio web](./media/hive-criteo-walkthrough/YKzxAA5.png)

Observe los dos vínculos a los servicios web en el lado izquierdo:

* El servicio **Solicitud-respuesta** (o RRS) está destinado a predicciones únicas y es lo que se usa en este taller.
* El servicio de **EJECUCIÓN POR LOTES** (BES) se usa para las predicciones por lotes y requiere que los datos de entrada usados para realizar predicciones residan en Azure Blob Storage.

Al hacer clic en el vínculo **PETICIÓN-RESPUESTA**, accedemos a una página que nos proporciona un código predefinido en C#, Python y R. Este código puede usarse fácilmente para realizar llamadas al servicio web. Tenga en cuenta que hay que utilizar la clave de API en esta página para la autenticación.

Se aconseja copiar este código python en una celda nueva en el cuaderno de IPython.

Aquí se muestra un fragmento de código python con la clave de API correcta.

![Código de Python](./media/hive-criteo-walkthrough/f8N4L4g.png)

Tenga en cuenta que se ha reemplazado la clave de API predeterminada por la clave de API de nuestros servicios web. Al hacer clic en **Ejecutar** en esta celda de un cuaderno de IPython, se obtiene la siguiente respuesta:

![Respuesta de IPython](./media/hive-criteo-walkthrough/KSxmia2.png)

Para los dos ejemplos de prueba por los que hemos preguntado (en el marco JSON del script de python), puede obtener respuestas con el formato "Scored Labels, Scored Probabilities" (Etiquetas puntuadas, Probabilidades puntuadas). En este caso, se han elegido los valores predeterminados que proporciona el código predefinido (0 para todas las columnas numéricas y la cadena "value" para todas las columnas de categorías).

Con esto concluye nuestro tutorial que muestra cómo controlar un conjunto de datos grande mediante Azure Machine Learning. Ha empezado con un terabyte de datos, ha creado un modelo de predicción y lo ha implementado como un servicio web en la nube.

