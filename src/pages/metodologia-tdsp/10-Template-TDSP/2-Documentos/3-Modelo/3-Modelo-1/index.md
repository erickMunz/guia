---
title: 3-Modelo 1
---

## Model Report

Un informe para proporcionar detalles sobre un experimento específico (modelo) - posiblemente uno de muchos

Si corresponde, la herramienta de generación de informes y modelado automatizado desarrollada por el equipo de TDSP de Microsoft se puede utilizar para generar informes, que pueden proporcionar contenidos para la mayoría de las secciones de este modelo de informe.
Enfoque analítico
 ```
    ¿Cuál es la definición del objetivo?
    ¿Cuáles son las entradas (descripción)?
    ¿Qué tipo de modelo fue construido?
 ```
Descripcion del modelo
 ```
    Modelos y parámetros
        Descripción o imágenes del gráfico de flujo de datos
            si AzureML, enlace a:
                Experimento de entrenamiento
                Flujo de trabajo de puntuación
        ¿Qué aprendiz (es) se usaron?
        Hiperparámetros del alumno
 ```
Resultados (rendimiento del modelo)
 ```
ROC / cartas de elevación, AUC, R^2, MAPE según corresponda
    Gráficos de rendimiento para parámetros barre si corresponde
 ```
Modelo de entendimiento
 ```
    - Importancia variable (significado)

    - Conocimiento derivado del modelo
 ```
Conclusión y Discusiones para los próximos pasos
 ```
    - Conclusión

    - Discusión sobre sobreajuste (si corresponde)

    - Qué otras características se pueden generar a partir de los datos actuales

    - Qué otras fuentes de datos relevantes están disponibles para ayudar al modelado
```