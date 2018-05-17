---
title: 1-Data definition
---

## Datos y funciones

Este documento proporciona un centro central para las fuentes de datos en bruto, los datos procesados ​​/ transformados y los conjuntos de características. Se proporcionan más detalles de cada conjunto de datos en el informe de datos.

Para cada dato, se proporciona un informe individual que describe el esquema de datos, el significado de cada campo de datos y otra información que sea útil para comprender los datos. Si el conjunto de datos es el resultado de los conjuntos de datos existentes de procesamiento / transformación / ingeniería de características, también se proporcionan los nombres de los conjuntos de datos de entrada y los enlaces a los scripts que se usan para llevar a cabo la operación.

Cuando corresponde, se aplica la utilidad de Exploración de datos, análisis e informes interactivos(IDEAR) desarrollada por Microsoft para explorar y visualizar los datos y generar el informe de datos. Las instrucciones de cómo usar IDEAR se pueden encontrar aquí<a href='https://github.com/ValeriaArroyo14/Azure-TDSP-ProjectTemplate/tree/master/Docs/Data_Report' target='_blank' rel='nofollow'>https://github.com/ValeriaArroyo14/Azure-TDSP-ProjectTemplate/tree/master/Docs/Data_Report</a>

Para cada conjunto de datos, también se proporcionan los enlaces a los conjuntos de datos de muestra en el directorio de datos.

Para facilitar la modificación de este informe, los enlaces de marcador de posición se incluyen en esta página, por ejemplo, un enlace al conjunto de datos 1, pero son solo marcadores de posición que apuntan a una página inexistente. Estos deben ser modificados para que apunten a la ubicación real.



## Raw Data Sources


| Nombre de datos | Ubicación original   | Ubicación del destino  | Herramientas de movimiento de datos / Scripts | Link al reporte |
| ---:| ---: | ---: | ---: | -----: |
| Dataset 1 | Breve descripción de su ubicación original | Breve descripción de su ubicación de destino | [script1.py](link/to/python/script/file/in/Code) | [Dataset 1 Report](link/to/report1)|
| Dataset 2 | Breve descripción de su ubicación original | Breve descripción de su ubicación de destino | [script2.R](link/to/R/script/file/in/Code) | [Dataset 2 Report](link/to/report2)|


- Dataset1 resumen. <Proporcione un breve resumen de los datos, como por ejemplo, cómo acceder a los datos. Información más detallada debe estar en el Informe Dataset1.>

- Resumen de Dataset2. <Proporcione un breve resumen de los datos, como por ejemplo, cómo acceder a los datos. Información más detallada debe estar en el Informe Dataset2.>


## Processed Data
| Nombre de datos procesados | Input Dataset(s)   | Herramientas de procesamiento de datos/Scripts | Link al Reporte |
| ---:| ---: | ---: | ---: | 
| Processed Dataset 1 | [Dataset1](link/to/dataset1/report), [Dataset2](link/to/dataset2/report) | [Python_Script1.py](link/to/python/script/file/in/Code) | [Processed Dataset 1 Report](link/to/report1)|
| Processed Dataset 2 | [Dataset2](link/to/dataset2/report) |[script2.R](link/to/R/script/file/in/Code) | [Processed Dataset 2 Report](link/to/report2)|

- Resumen de datos procesados1. <Proporcione un breve resumen de los datos procesados, como por qué desea procesar los datos de esta manera. Información más detallada sobre los datos procesados debe estar en el Processed Dataset 1.>
- Resumen de datos procesados2. <Proporcione un breve resumen de los datos procesados, como por qué desea procesar los datos de esta manera. Información más detallada sobre los datos procesados debe estar en el Processed Dataset 2.>

## Feature Sets

| Nombre del conjunto de funciones  | Input Dataset(s)   | Herramientas de ingeniería de funciones/Scripts | Link al Reporte |
| ---:| ---: | ---: | ---: | 
| Feature Set 1 | [Dataset1](link/to/dataset1/report), [Processed Dataset2](link/to/dataset2/report) | [R_Script2.R](link/to/R/script/file/in/Code) | [Feature Set1 Report](link/to/report1)|
| Feature Set 2 | [Processed Dataset2](link/to/dataset2/report) |[SQL_Script2.sql](link/to/sql/script/file/in/Code) | [Feature Set2 Report](link/to/report2)|

* Característica del resumen de Set1. <Proporcione una descripción detallada del conjunto de características, como el significado de cada característica. Información más detallada sobre el conjunto de características debe estar en el Feature Set 1>.
* Característica del resumen de Set2. <Proporcione una descripción detallada del conjunto de características, como el significado de cada característica. Información más detallada sobre el conjunto de características debe estar en el Feature Set 2>.
