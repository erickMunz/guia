---
title: 4-Sample data sql
---
# <a name="heading"></a>Muestreo de datos en SQL Server en Azure
En este artículo se trata cómo realizar una muestra de datos almacenados en SQL Server en Azure con SQL o con el lenguaje de programación Python. También se muestra cómo mover los datos de muestra a Azure Machine Learning guardándolos en un archivo, cargándolos en un blob de Azure y leyéndolos en Azure Machine Learning Studio.

El muestreo de Python usa la biblioteca ODBC [pyodbc](https://code.google.com/p/pyodbc/) para conectarse a SQL Server en Azure y la biblioteca [Pandas](http://pandas.pydata.org/) para realizar el muestreo.

> [!NOTE]
> En el código SQL de ejemplo en este documento se supone que los datos están en un servidor SQL Server en Azure. Si no es así, consulte el artículo [Mover datos a un servidor SQL Server en una máquina virtual de Azure](move-sql-server-virtual-machine.md) para obtener instrucciones sobre cómo mover los datos a SQL Server en Azure.
> 
> 

El siguiente **menú** está vinculado a artículos que describen cómo realizar un muestreo de datos desde varios entornos de almacenamiento. 

[!INCLUDE [cap-sample-data-selector](../../../includes/cap-sample-data-selector.md)]

**¿Por qué realizar un muestreo de los datos?**
Si el conjunto de datos que pretende analizar es grande, es recomendable reducirlo a un tamaño más pequeño, pero representativo, que sea más manejable. Esto facilita la comprensión y exploración de los datos, y el diseño de características. Su rol en el [proceso de ciencia de datos en equipos (TDSP)](https://azure.microsoft.com/documentation/learning-paths/cortana-analytics-process/) es permitir la rápida creación de prototipos de las funciones de procesamiento de datos y de los modelos de aprendizaje automático.

Esta tarea de muestreo es un paso en el [proceso de ciencia de datos en equipos (TDSP)](https://azure.microsoft.com/documentation/learning-paths/cortana-analytics-process/).

## <a name="SQL"></a>Uso de SQL
En esta sección se describen varios métodos con SQL para realizar un muestreo aleatorio simple con los datos de la base de datos. Elija un método basado en el tamaño de los datos y su distribución.

Los dos elementos siguientes muestran cómo utilizar `newid` en SQL Server para realizar el muestreo. El método que elija depende de lo aleatoria que desee que sea la muestra (se supone que pk_id en el código de ejemplo siguiente es una clave principal generada automáticamente).

1. Muestra aleatoria menos estricta
   
        select  * from <table_name> where <primary_key> in 
        (select top 10 percent <primary_key> from <table_name> order by newid())
2. Muestra más aleatoria 
   
        SELECT * FROM <table_name>
        WHERE 0.1 >= CAST(CHECKSUM(NEWID(), <primary_key>) & 0x7fffffff AS float)/ CAST (0x7fffffff AS int)

Tablesample se puede usar igualmente para el muestreo de datos. Podría ser un enfoque preferible si el tamaño de los datos es grande (suponiendo que los datos de las distintas páginas no están correlacionados) y para que la consulta se complete en un tiempo razonable.

    SELECT *
    FROM <table_name> 
    TABLESAMPLE (10 PERCENT)

> [!NOTE]
> Puede explorar y generar características de los datos muestreados almacenándolos en una nueva tabla
> 
> 

### <a name="sql-aml"></a>Conexión con Azure Machine Learning
Puede utilizar directamente las consultas de ejemplo anteriores en el módulo [Importar datos][import-data] de Azure Machine Learning para reducir los datos sobre la marcha y usarlos en un experimento de Azure Machine Learning. Aquí se muestra una captura de pantalla con el uso del módulo del lector para leer los datos de muestreo:

![lector sql][1]

## <a name="python"></a>Uso del lenguaje de programación Python
En esta sección se muestra cómo usar la [biblioteca pyodbc](https://code.google.com/p/pyodbc/) para establecer una conexión de ODBC a una base de datos de SQL Server en Python. La cadena de conexión de la base de datos se muestra a continuación: (reemplace servername, dbname, username y password por su configuración):

    #Set up the SQL Azure connection
    import pyodbc    
    conn = pyodbc.connect('DRIVER={SQL Server};SERVER=<servername>;DATABASE=<dbname>;UID=<username>;PWD=<password>')

La biblioteca [Pandas](http://pandas.pydata.org/) en Python ofrece un amplio conjunto de herramientas de análisis de datos y estructuras de datos para la manipulación de datos para la programación en Python. El código siguiente lee una muestra de 0,1 % de los datos de una tabla de Azure SQL Database en datos de Pandas:

    import pandas as pd

    # Query database and load the returned results in pandas data frame
    data_frame = pd.read_sql('''select column1, cloumn2... from <table_name> tablesample (0.1 percent)''', conn)

Ahora puede trabajar con los datos de muestreo en la trama de datos de Pandas. 

### <a name="python-aml"></a>Conexión con Azure Machine Learning
Puede usar el siguiente código de ejemplo para guardar los datos muestreados reducidos en un archivo y cargarlos en un blob de Azure. Los datos en el blob pueden leerse directamente en un experimento de Azure Machine Learning mediante el módulo [Importar datos][import-data]. Los pasos son los siguientes: 

1. Escribir la trama de datos de Pandas en un archivo local
   
        dataframe.to_csv(os.path.join(os.getcwd(),LOCALFILENAME), sep='\t', encoding='utf-8', index=False)
2. Cargar el archivo local en un blob de Azure
   
        from azure.storage import BlobService
        import tables
   
        STORAGEACCOUNTNAME= <storage_account_name>
        LOCALFILENAME= <local_file_name>
        STORAGEACCOUNTKEY= <storage_account_key>
        CONTAINERNAME= <container_name>
        BLOBNAME= <blob_name>
   
        output_blob_service=BlobService(account_name=STORAGEACCOUNTNAME,account_key=STORAGEACCOUNTKEY)    
        localfileprocessed = os.path.join(os.getcwd(),LOCALFILENAME) #assuming file is in current working directory
   
        try:
   
        #perform upload
        output_blob_service.put_block_blob_from_path(CONTAINERNAME,BLOBNAME,localfileprocessed)
   
        except:            
            print ("Something went wrong with uploading blob:"+BLOBNAME)
3. Leer datos de un blob de Azure mediante el módulo [Importar datos][import-data] de Azure Machine Learning, como se muestra en la captura de pantalla siguiente:

![lector de blobs][2]

## <a name="the-team-data-science-process-in-action-example"></a>Proceso de ciencia de datos en equipos en acción: ejemplo
Para ver un ejemplo del proceso de ciencia de datos en equipos mediante un conjunto de datos público, consulte [Proceso de ciencia de datos en equipos en acción: uso de SQL Server](sql-walkthrough.md).

[1]: ./media/sample-sql-server-virtual-machine/reader_database.png
[2]: ./media/sample-sql-server-virtual-machine/reader_blob.png

[import-data]: https://msdn.microsoft.com/library/azure/4e1b0fe6-aded-4b3f-a36f-39b8862b9004/
