---
title: 7-Predicción del estado de vehículo y hábitos de conducción
---
# <a name="vehicle-telemetry-analytics-solution-playbook"></a>Cuaderno de estrategias de la solución Vehicle Telemetry Analytics
Este menú está relacionado con los capítulos de este playbook: 

[!INCLUDE [cap-vehicle-telemetry-playbook-selector](../../../includes/cap-vehicle-telemetry-playbook-selector.md)]

## <a name="overview"></a>Información general
Se han incorporado superequipos a vehículos vanguardistas, con una infinidad de sensores, lo que ofrece la posibilidad de realizar el seguimiento de millones de eventos por segundo y de supervisarlos. En 2020, la mayoría de estos vehículos estarán conectados a Internet. Explotar esta riqueza de datos puede ofrecer mejor seguridad, confiabilidad y experiencia de conducción. Microsoft convierte ese sueño en realidad gracias a Cortana Intelligence.

Cortana Intelligence es un conjunto de análisis avanzados y macrodatos totalmente administrado que puede usar para transformar los datos en acciones inteligentes. La plantilla de la solución Cortana Intelligence Vehicle Telemetry Analytics ilustra cómo los fabricantes y los concesionarios de automóviles, así como las compañías de seguros, pueden obtener información predictiva y en tiempo real sobre el estado de los vehículos y los hábitos de conducción. 

La solución se implementa como [patrón de arquitectura lambda](https://en.wikipedia.org/wiki/Lambda_architecture) en el que se muestran todas las posibilidades de la plataforma Cortana Intelligence para procesar datos por lotes y en tiempo real.

## <a name="architecture"></a>Arquitectura
La arquitectura de la solución Vehicle Telemetry Analytics se muestra en este diagrama:

![Diagrama de la arquitectura de la solución](./media/cortana-analytics-playbook-vehicle-telemetry/fig1-vehicle-telemetry-annalytics-solution-architecture.png)


Esta solución incorpora los siguientes componentes de Cortana Intelligence y presenta su integración completa:

* **Azure Event Hubs** introduce millones de eventos de telemetría del vehículo en Azure.
* **Azure Stream Analytics** proporciona información en tiempo real sobre el estado del vehículo y conserva esos datos en almacenamiento a largo plazo para un análisis por lotes más completo.
* **Azure Machine Learning** detecta anomalías en tiempo real y usa el procesamiento por lotes para proporcionar información detallada de predicción.
* **Azure HDInsight** transforma los datos a escala.
* **Azure Data Factory** controla la orquestación, la programación, la administración de recursos y la supervisión de la canalización del procesamiento por lotes.
* **Power BI** ofrece a esta solución un panel completo para datos en tiempo real y visualizaciones de análisis predictivo.

Esta solución tiene acceso a dos orígenes de datos diferentes: 

* **Diagnósticos y señales de vehículos simuladas**: un simulador telemático de vehículo emite información de diagnóstico y señales que se corresponden con el estado del vehículo y el patrón de conducción en un momento determinado. 
* **Catálogo del vehículo**: este conjunto de datos de referencia asigna los números de chasis a los modelos correspondientes.

