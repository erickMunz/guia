---
title: 2-Baseline models
---

##Informe del modelo de referencia

El modelo básico es el modelo que un científico de datos entrenaría y evaluaría rápidamente después de tener el primer conjunto de características (preliminar) listo para el modelado de aprendizaje automático. A través de la construcción del modelo de referencia, el científico de datos puede tener una evaluación rápida de la viabilidad de la tarea de aprendizaje automático.

Cuando corresponda, la herramienta de generación de informes y modelado automatizado desarrollada por el equipo TDSP de Microsoft se emplea para construir rápidamente los modelos de referencia. El informe del modelo de referencia se genera fácilmente a partir de esta utilidad.

```
    Si utiliza la herramienta de creación de informes y modelos automatizados, la mayoría de las siguientes secciones se generarán automáticamente a partir de esta herramienta.
```

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
    - Conclusión sobre la evaluación de viabilidad de la tarea de aprendizaje automático
    - Discusión sobre sobreajuste (si corresponde)
    - Qué otras características se pueden generar a partir de los datos actuales
    - Qué otras fuentes de datos relevantes están disponibles para ayudar al modelado
    ```