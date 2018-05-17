---
title: 3-Clúster de Hadoop mediante consultas de Hive
---
# <a name="create-features-for-data-in-a-hadoop-cluster-using-hive-queries"></a>Creación de características para los datos en un clúster de Hadoop mediante consultas de Hive
Este documento muestra cómo crear características para los datos almacenados en un clúster de Hadoop para HDInsight de Azure mediante consultas de Hive. Estas consultas de Hive usan funciones definidas por el usuario (UDF) insertadas, cuyos scripts se proporcionan.

Las operaciones necesarias para crear características pueden consumir mucha memoria. El rendimiento de las consultas de Hive resulta más importante en estos casos y se puede mejorar ajustando ciertos parámetros. El ajuste de estos parámetros se describe en la sección final.

También se ofrecen ejemplos de las consultas que son específicos de escenarios de [NYC Taxi Trip Data](http://chriswhong.com/open-data/foil_nyc_taxi/) en el [repositorio de GitHub](https://github.com/Azure/Azure-MachineLearning-DataScience/tree/master/Misc/DataScienceProcess/DataScienceScripts). Estas consultas ya tienen el esquema de datos especificado y están listas para enviarse para su ejecución. En la última sección, también se describen los parámetros que los usuarios pueden ajustar para que se pueda mejorar el rendimiento de las consultas de Hive.

[!INCLUDE [cap-create-features-data-selector](../../../includes/cap-create-features-selector.md)]

Este **menú** vincula a temas en los que se describe cómo crear características para datos en diversos entornos. Esta tarea constituye un paso del [proceso de ciencia de datos en equipos (TDSP)](https://azure.microsoft.com/documentation/learning-paths/cortana-analytics-process/).

## <a name="prerequisites"></a>Requisitos previos
En este artículo se supone que ha:

* Creado una cuenta de almacenamiento de Azure. Si necesita instrucciones, consulte [Creación de una cuenta de Azure Storage](../../storage/common/storage-create-storage-account.md#create-a-storage-account)
* Aprovisionado un clúster de Hadoop personalizado con el servicio HDInsight.  Si necesita instrucciones, consulte [Personalización de clústeres de Hadoop de HDInsight de Azure para análisis avanzado](customize-hadoop-cluster.md).
* Se han cargado los datos en tablas de subárbol en clústeres de Hadoop de HDInsight de Azure. De no ser así, siga [Crear y cargar datos en tablas de Hive](move-hive-tables.md) para empezar cargando los datos en tablas de Hive.
* Habilitado el acceso remoto al clúster. Si necesita instrucciones, consulte [Acceso al nodo principal del clúster Hadoop](customize-hadoop-cluster.md).

## <a name="hive-featureengineering"></a>Generación de características
En esta sección se describen varios ejemplos de las maneras en que se pueden generar características mediante consultas de Hive. Una vez que haya generado características adicionales, puede agregarlas como columnas a la tabla existente o crear una nueva tabla con las características adicionales y la clave principal, que se pueden combinar a continuación con la tabla original. Estos son los ejemplos presentados:

1. [Generación de características basada en frecuencia](#hive-frequencyfeature)
2. [Riesgos de las variables de categorías en la clasificación binaria](#hive-riskfeature)
3. [Extraer características de campos de fecha y hora](#hive-datefeatures)
4. [Extraer características del campo de texto](#hive-textfeatures)
5. [Calcular distancia entre las coordenadas GPS](#hive-gpsdistance)

### <a name="hive-frequencyfeature"></a>Generación de características basada en la frecuencia
A menudo resulta útil calcular las frecuencias de los niveles de una variable de categoría o las frecuencias de determinadas combinaciones de niveles desde varias variables de categorías. Los usuarios pueden usar el siguiente script para calcular estas frecuencias:

        select
            a.<column_name1>, a.<column_name2>, a.sub_count/sum(a.sub_count) over () as frequency
        from
        (
            select
                <column_name1>,<column_name2>, count(*) as sub_count
            from <databasename>.<tablename> group by <column_name1>, <column_name2>
        )a
        order by frequency desc;


### <a name="hive-riskfeature"></a>Riesgos de las variables de categorías en la clasificación binaria
En la clasificación binaria, las variables de categorías no numéricas se deben convertir en características numéricas cuando los modelos que se utilizan solo toman características numéricas. Esta conversión se realiza mediante el reemplazo de cada nivel no numérico por un riesgo numérico. En esta sección se muestran algunas consultas de Hive genéricas que calculan los valores de riesgo (probabilidades de registro) de una variable de categoría.

        set smooth_param1=1;
        set smooth_param2=20;
        select
            <column_name1>,<column_name2>,
            ln((sum_target+${hiveconf:smooth_param1})/(record_count-sum_target+${hiveconf:smooth_param2}-${hiveconf:smooth_param1})) as risk
        from
            (
            select
                <column_nam1>, <column_name2>, sum(binary_target) as sum_target, sum(1) as record_count
            from
                (
                select
                    <column_name1>, <column_name2>, if(target_column>0,1,0) as binary_target
                from <databasename>.<tablename>
                )a
            group by <column_name1>, <column_name2>
            )b

En este ejemplo, las variables `smooth_param1` y `smooth_param2` se establecen para suavizar los valores de riesgo calculados a partir de los datos. Los riesgos tienen un intervalo comprendido entre -Inf y Inf. Un riesgo > 0 indica que la probabilidad de que el destino sea igual a 1 es mayor que 0,5.

Después de calcularse la tabla de riesgos, los usuarios pueden asignar valores de riesgo a una tabla uniéndola a la tabla de riesgo. La consulta de combinación de subárbol se ha proporcionado en la sección anterior.

### <a name="hive-datefeatures"></a>Extraer características de campos de fecha y hora
El subárbol se incluye con un conjunto de UDF para el procesamiento de campos de fecha y hora. En el subárbol, el formato de fecha y hora predeterminado es 'aaaa-MM-dd 00:00:00 ' ('1970-01-01 12:21:32' por ejemplo). En esta sección se muestran ejemplos que extraen el día de un mes, el mes de un campo de fecha y hora, y otros ejemplos que convierten una cadena de fecha y hora en un formato distinto del predeterminado en una cadena de fecha y hora en el formato predeterminado.

        select day(<datetime field>), month(<datetime field>)
        from <databasename>.<tablename>;

Esta consulta de Hive asume que *&#60;datetime field>* está en el formato de fecha y hora predeterminado.

Si un campo de fecha y hora no se encuentra en el formato predeterminado, deberá convertir el campo de fecha y hora en la marca de tiempo de Unix primero y, a continuación, convertir la marca de tiempo de Unix a una cadena de fecha y hora que se encuentra en el formato predeterminado. Cuando la fecha y hora se encuentra en el formato predeterminado, los usuarios pueden aplicar los UDF de fecha y hora incrustado para extraer características.

        select from_unixtime(unix_timestamp(<datetime field>,'<pattern of the datetime field>'))
        from <databasename>.<tablename>;

En esta consulta, si *&#60;datetime field>* sigue un patrón de tipo *03/26/2015 12:04:39*, *'&#60;pattern of the datetime field>'* debe ser `'MM/dd/yyyy HH:mm:ss'`. Para probarlo, los usuarios pueden ejecutar

        select from_unixtime(unix_timestamp('05/15/2015 09:32:10','MM/dd/yyyy HH:mm:ss'))
        from hivesampletable limit 1;

La tabla *hivesampletable* de esta consulta viene preinstalada en todos los clústeres de Hadoop de HDInsight de Azure de forma predeterminada cuando se aprovisionan los clústeres.

### <a name="hive-textfeatures"></a>Extraer características de campos de texto
Cuando la tabla de subárbol tiene un campo de texto que contiene una cadena de palabras delimitadas por espacios, la consulta siguiente extrae la longitud de la cadena y el número de palabras de la cadena.

        select length(<text field>) as str_len, size(split(<text field>,' ')) as word_num
        from <databasename>.<tablename>;

### <a name="hive-gpsdistance"></a>Cálculo de la distancia entre conjuntos de coordenadas de GPS
La consulta proporcionada en esta sección puede aplicarse directamente a los datos de carreras de taxi de Nueva York. El propósito de esta consulta es mostrar cómo se aplica una función matemática incrustada en Hive para generar características.

Los campos que se usan en esta consulta son las coordenadas GPS de ubicaciones de recogida y entrega, denominadas *pickup\_longitude*, *pickup\_latitude*, *dropoff\_longitude* y *dropoff\_latitude*. Las consultas que calculan la distancia directa entre las coordenadas de recogida y entrega son:

        set R=3959;
        set pi=radians(180);
        select pickup_longitude, pickup_latitude, dropoff_longitude, dropoff_latitude,
            ${hiveconf:R}*2*2*atan((1-sqrt(1-pow(sin((dropoff_latitude-pickup_latitude)
            *${hiveconf:pi}/180/2),2)-cos(pickup_latitude*${hiveconf:pi}/180)
            *cos(dropoff_latitude*${hiveconf:pi}/180)*pow(sin((dropoff_longitude-pickup_longitude)*${hiveconf:pi}/180/2),2)))
            /sqrt(pow(sin((dropoff_latitude-pickup_latitude)*${hiveconf:pi}/180/2),2)
            +cos(pickup_latitude*${hiveconf:pi}/180)*cos(dropoff_latitude*${hiveconf:pi}/180)*
            pow(sin((dropoff_longitude-pickup_longitude)*${hiveconf:pi}/180/2),2))) as direct_distance
        from nyctaxi.trip
        where pickup_longitude between -90 and 0
        and pickup_latitude between 30 and 90
        and dropoff_longitude between -90 and 0
        and dropoff_latitude between 30 and 90
        limit 10;

Las ecuaciones matemáticas que calculan la distancia entre dos coordenadas GPS pueden encontrarse en el sitio <a href="http://www.movable-type.co.uk/scripts/latlong.html" target="_blank">Movable Type Scripts</a> (Scripts de tipo movibles), creado por Peter Lapisu. En este JavaScript, la función `toRad()` es simplemente *lat_or_lon*pi/180*, que convierte grados a radianes. Aquí, *lat_or_lon* es la latitud o la longitud. Debido a que Hive no proporciona la función `atan2`, pero sí la función `atan`, la función `atan2` se implementa en la función `atan` en la consulta de Hive anterior mediante la definición incluida en <a href="http://en.wikipedia.org/wiki/Atan2" target="_blank">Wikipedia</a>.

![Creación del espacio de trabajo](./media/create-features-hive/atan2new.png)

Se puede encontrar una lista completa de las UDF incrustadas de Hive en la sección **Funciones integradas** de la wiki de <a href="https://cwiki.apache.org/confluence/display/Hive/LanguageManual+UDF#LanguageManualUDF-MathematicalFunctions" target="_blank">Apache Hive</a>.  

## <a name="tuning"></a> Temas avanzados: Ajustar parámetros de Hive para mejorar la velocidad de consulta
La configuración de parámetros predeterminados del clúster de subárbol podría no ser adecuada para las consultas de subárbol y los datos que estas consultas procesan. En esta sección se describen algunos parámetros que los usuarios pueden ajustar para mejorar el rendimiento de las consultas de Hive. Los usuarios necesitan agregar el parámetro que optimiza las consultas antes de las consultas de procesamiento de datos.

1. **Espacio de montón de Java**: para las consultas que implican la combinación de grandes conjuntos de datos o el procesamiento de largos registros, un error habitual es **quedarse sin espacio en el montón**. Este error se puede evitar estableciendo los parámetros *mapreduce.map.java.opts* y *mapreduce.task.io.sort.mb* en los valores deseados. Aquí tiene un ejemplo:
   
        set mapreduce.map.java.opts=-Xmx4096m;
        set mapreduce.task.io.sort.mb=-Xmx1024m;

    Este parámetro asigna 4 GB de memoria al espacio de montón de Java y también hace que la ordenación sea más eficiente al asignar más memoria para él. Es buena idea jugar con estas asignaciones si no hay ningún error de trabajo relacionado con el espacio en el montón.

1. **Tamaño de bloque de DFS**: este parámetro establece la unidad más pequeña de datos que el sistema de archivos almacena. Por ejemplo, si el tamaño de bloque DFS es 128 MB, los datos que tengan un tamaño de 128 MB o inferior se almacenarán en un solo bloque. Asimismo, se asignarán bloques adicionales para los datos que tengan más de 128 MB. 
2. Si elige un tamaño de bloque pequeño, se producirán grandes sobrecargas en Hadoop, puesto que el nodo de nombre tiene que procesar muchas más solicitudes para buscar el bloque pertinente relacionado con el archivo. Una configuración recomendada al tratar con datos de gigabytes (o mayores) es:

        set dfs.block.size=128m;

2. **Optimización de la operación de unión en Hive**: aunque las operaciones de unión en el marco de asignación/reducción suelen tener lugar en la fase de reducción, en ocasiones se pueden obtener ganancias enormes mediante la programación de uniones en la fase de asignación (también denominada "mapjoins"). Para indicar a Hive que haga esto siempre que sea posible, establezca lo siguiente:
   
       set hive.auto.convert.join=true;

3. **Especificación del número de asignadores a Hive**: aunque Hadoop permite al usuario establecer el número de reductores, este no suele hacerlo. Un truco que permite cierto grado de control sobre este número es elegir las variables de Hadoop, *mapred.min.split.size* y *mapred.max.split.size*, puesto que el tamaño de cada tarea de asignación se determina mediante:
   
        num_maps = max(mapred.min.split.size, min(mapred.max.split.size, dfs.block.size))
   
    Normalmente, el valor predeterminado de:
    
    - *mapred.min.split.size* es 0, que de
    - *mapred.max.split.size* es **Long.MAX** y de 
    - *dfs.block.size* es 64 MB.

    Como podemos ver, dado el tamaño de los datos, el ajuste de estos parámetros mediante su "configuración" nos permite optimizar el número de asignadores que se usan.

4. A continuación, se mencionan algunas otras **opciones avanzadas** para optimizar el rendimiento de Hive. Estas permiten establecer la memoria asignada para asignar y reducir tareas, y pueden ser útiles para modificar el rendimiento. Tenga en cuenta que el valor de *mapreduce.reduce.memory.mb* no puede ser mayor que el tamaño de la memoria física de cada nodo de trabajo del clúster de Hadoop.
   
        set mapreduce.map.memory.mb = 2048;
        set mapreduce.reduce.memory.mb=6144;
        set mapreduce.reduce.java.opts=-Xmx8192m;
        set mapred.reduce.tasks=128;
        set mapred.tasktracker.reduce.tasks.maximum=128;

