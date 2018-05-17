---
title: 2-SQL Server en una VM de Azure
---
# <a name="parallel-bulk-data-import-using-sql-partition-tables"></a>Importación paralela de conjuntos masivos de datos mediante tablas de partición de SQL
En este documento se describe cómo se pueden crear tablas con particiones para la importación paralela masiva de datos en una base de datos de SQL Server. Para cargar o transferir macrodatos a SQL Database, es posible mejorar la importación de datos en SQL Database y las consultas posteriores mediante *tablas y vistas con particiones*. 

## <a name="create-a-new-database-and-a-set-of-filegroups"></a>Crear una nueva base de datos y un conjunto de grupos de archivos
* [Cree una nueva base de datos](https://technet.microsoft.com/library/ms176061.aspx), si todavía no existe.
* Agregue grupos de archivos de base de datos a la base de datos que contiene los archivos físicos con particiones. 
* Esto puede hacerse con [CREATE DATABASE](https://technet.microsoft.com/library/ms176061.aspx) si es nueva o [ALTER DATABASE](https://msdn.microsoft.com/library/bb522682.aspx) si ya existe la base de datos.
* Agregue uno o varios archivos (según sea necesario) a cada grupo de archivos de base de datos.
  
  > [!NOTE]
  > Especifique el grupo de archivos de destino que contiene los datos de esta partición y los nombres de archivo de las bases de datos físicas donde se almacenan los datos del grupo de archivos.
  > 
  > 

En el ejemplo siguiente se crea una nueva base de datos con tres grupos de archivos distintos de los grupos principal y de registro, que contiene un archivo físico en cada uno. Los archivos de base de datos se crean en la carpeta de datos de SQL Server predeterminada, como está configurado en la instancia de SQL Server. Para obtener más información acerca de las ubicaciones de archivo predeterminadas, consulte [Ubicaciones de archivos para las instancias predeterminadas y con nombre de SQL Server](https://msdn.microsoft.com/library/ms143547.aspx).

    DECLARE @data_path nvarchar(256);
    SET @data_path = (SELECT SUBSTRING(physical_name, 1, CHARINDEX(N'master.mdf', LOWER(physical_name)) - 1)
      FROM master.sys.master_files
      WHERE database_id = 1 AND file_id = 1);

    EXECUTE ('
        CREATE DATABASE <database_name>
         ON  PRIMARY 
        ( NAME = ''Primary'', FILENAME = ''' + @data_path + '<primary_file_name>.mdf'', SIZE = 4096KB , FILEGROWTH = 1024KB ), 
         FILEGROUP [filegroup_1] 
        ( NAME = ''FileGroup1'', FILENAME = ''' + @data_path + '<file_name_1>.ndf'' , SIZE = 4096KB , FILEGROWTH = 1024KB ), 
         FILEGROUP [filegroup_2] 
        ( NAME = ''FileGroup1'', FILENAME = ''' + @data_path + '<file_name_2>.ndf'' , SIZE = 4096KB , FILEGROWTH = 1024KB ), 
         FILEGROUP [filegroup_3] 
        ( NAME = ''FileGroup1'', FILENAME = ''' + @data_path + '<file_name>.ndf'' , SIZE = 102400KB , FILEGROWTH = 10240KB ), 
         LOG ON 
        ( NAME = ''LogFileGroup'', FILENAME = ''' + @data_path + '<log_file_name>.ldf'' , SIZE = 1024KB , FILEGROWTH = 10%)
    ')

## <a name="create-a-partitioned-table"></a>Crear una tabla con particiones
Para crear tablas con particiones según el esquema de datos, asignado a los grupos de archivos de base de datos que se crearon en el paso anterior, primero debe crear una función y un esquema de partición. Cuando se importan datos de forma masiva en las tablas con particiones, los registros se distribuyen entre los grupos de archivos según un esquema de partición, tal y como se describe a continuación.

### <a name="1-create-a-partition-function"></a>1. Crear una función de partición
[Cree una función de partición](https://msdn.microsoft.com/library/ms187802.aspx). Esta función define el intervalo de valores o límites que se incluirán en cada tabla de particiones individual; por ejemplo, para limitar las particiones por mes (some\_datetime\_field) en el año 2013:
  
        CREATE PARTITION FUNCTION <DatetimeFieldPFN>(<datetime_field>)  
        AS RANGE RIGHT FOR VALUES (
            '20130201', '20130301', '20130401',
            '20130501', '20130601', '20130701', '20130801',
            '20130901', '20131001', '20131101', '20131201' )

### <a name="2-create-a-partition-scheme"></a>2. Crear un esquema de partición
[Cree un esquema de partición](https://msdn.microsoft.com/library/ms179854.aspx). Este esquema asigna cada intervalo de particiones en la función de partición a un grupo de archivos físico, por ejemplo:
  
        CREATE PARTITION SCHEME <DatetimeFieldPScheme> AS  
        PARTITION <DatetimeFieldPFN> TO (
        <filegroup_1>, <filegroup_2>, <filegroup_3>, <filegroup_4>,
        <filegroup_5>, <filegroup_6>, <filegroup_7>, <filegroup_8>,
        <filegroup_9>, <filegroup_10>, <filegroup_11>, <filegroup_12> )
  
  Para comprobar los intervalos en vigor en cada partición según el esquema de función, ejecute la consulta siguiente:
  
        SELECT psch.name as PartitionScheme,
            prng.value AS ParitionValue,
            prng.boundary_id AS BoundaryID
        FROM sys.partition_functions AS pfun
        INNER JOIN sys.partition_schemes psch ON pfun.function_id = psch.function_id
        INNER JOIN sys.partition_range_values prng ON prng.function_id=pfun.function_id
        WHERE pfun.name = <DatetimeFieldPFN>

### <a name="3-create-a-partition-table"></a>3. Crear una tabla de particiones
[Cree tablas con particiones](https://msdn.microsoft.com/library/ms174979.aspx) según el esquema de datos y especifique el esquema de partición y el campo de restricción que se usó para crear las particiones de la tabla; por ejemplo:
  
        CREATE TABLE <table_name> ( [include schema definition here] )
        ON <TablePScheme>(<partition_field>)

Para obtener más información, consulte [Crear tablas e índices con particiones](https://msdn.microsoft.com/library/ms188730.aspx).

## <a name="bulk-import-the-data-for-each-individual-partition-table"></a>Importación masiva de datos para cada tabla de partición individual

* Puede usar BCP, BULK INSERT u otros métodos como el [Asistente para migración de SQL Server](http://sqlazuremw.codeplex.com/). En el ejemplo que se incluye, se usa el método BCP.
* [Modifique la base de datos](https://msdn.microsoft.com/library/bb522682.aspx) para cambiar el esquema de registro de transacciones a BULK_LOGGED y así minimizar la sobrecarga de registros; por ejemplo:
  
        ALTER DATABASE <database_name> SET RECOVERY BULK_LOGGED
* Para acelerar la carga de datos, inicie las operaciones de importación masiva en paralelo. Para obtener sugerencias sobre la aceleración de la importación masiva de big data en las bases de datos de SQL Server, consulte [Cargar 1 TB en menos de 1 hora](http://blogs.msdn.com/b/sqlcat/archive/2006/05/19/602142.aspx).

El siguiente script de PowerShell es un ejemplo de carga paralela de datos mediante BCP.

    # Set database name, input data directory, and output log directory
    # This example loads comma-separated input data files
    # The example assumes the partitioned data files are named as <base_file_name>_<partition_number>.csv
    # Assumes the input data files include a header line. Loading starts at line number 2.

    $dbname = "<database_name>"
    $indir  = "<path_to_data_files>"
    $logdir = "<path_to_log_directory>"

    # Select authentication mode
    $sqlauth = 0

    # For SQL authentication, set the server and user credentials
    $sqlusr = "<user@server>"
    $server = "<tcp:serverdns>"
    $pass   = "<password>"

    # Set number of partitions per table - Should match the number of input data files per table
    $numofparts = <number_of_partitions>

    # Set table name to be loaded, basename of input data files, input format file, and number of partitions
    $tbname = "<table_name>"
    $basename = "<base_input_data_filename_no_extension>"
    $fmtfile = "<full_path_to_format_file>"

    # Create log directory if it does not exist
    New-Item -ErrorAction Ignore -ItemType directory -Path $logdir

    # BCP example using Windows authentication
    $ScriptBlock1 = {
       param($dbname, $tbname, $basename, $fmtfile, $indir, $logdir, $num)
       bcp ($dbname + ".." + $tbname) in ($indir + "\" + $basename + "_" + $num + ".csv") -o ($logdir + "\" + $tbname + "_" + $num + ".txt") -h "TABLOCK" -F 2 -C "RAW" -f ($fmtfile) -T -b 2500 -t "," -r \n
    }

    # BCP example using SQL authentication
    $ScriptBlock2 = {
       param($dbname, $tbname, $basename, $fmtfile, $indir, $logdir, $num, $sqlusr, $server, $pass)
       bcp ($dbname + ".." + $tbname) in ($indir + "\" + $basename + "_" + $num + ".csv") -o ($logdir + "\" + $tbname + "_" + $num + ".txt") -h "TABLOCK" -F 2 -C "RAW" -f ($fmtfile) -U $sqlusr -S $server -P $pass -b 2500 -t "," -r \n
    }

    # Background processing of all partitions
    for ($i=1; $i -le $numofparts; $i++)
    {
       Write-Output "Submit loading trip and fare partitions # $i"
       if ($sqlauth -eq 0) {
          # Use Windows authentication
          Start-Job -ScriptBlock $ScriptBlock1 -Arg ($dbname, $tbname, $basename, $fmtfile, $indir, $logdir, $i)
       } 
       else {
          # Use SQL authentication
          Start-Job -ScriptBlock $ScriptBlock2 -Arg ($dbname, $tbname, $basename, $fmtfile, $indir, $logdir, $i, $sqlusr, $server, $pass)
       }
    }

    Get-Job

    # Optional - Wait till all jobs complete and report date and time
    date
    While (Get-Job -State "Running") { Start-Sleep 10 }
    date


## <a name="create-indexes-to-optimize-joins-and-query-performance"></a>Crear índices para optimizar el rendimiento de las combinaciones y consultas
* Si extrae datos para el modelado de varias tablas, cree índices en las claves de combinación para mejorar el rendimiento de las combinaciones.
* [Cree índices](https://technet.microsoft.com/library/ms188783.aspx) (agrupados o no agrupados) que tengan como destino el mismo grupo de archivos de cada partición; por ejemplo:
  
        CREATE CLUSTERED INDEX <table_idx> ON <table_name>( [include index columns here] )
        ON <TablePScheme>(<partition)field>)
  o bien,
  
        CREATE INDEX <table_idx> ON <table_name>( [include index columns here] )
        ON <TablePScheme>(<partition)field>)
  
  > [!NOTE]
  > Puede crear los índices antes de importar los datos de forma masiva. La creación de índices antes de la importación masiva ralentiza la carga de datos.
  > 
  > 

## <a name="advanced-analytics-process-and-technology-in-action-example"></a>Ejemplo de Tecnología y procesos de análisis avanzado en acción
Para ver un ejemplo de tutorial completo del proceso de ciencia de datos en equipos con un conjunto de datos público, consulte [Proceso de ciencia de datos en equipos en acción: uso de SQL Server](sql-walkthrough.md).

