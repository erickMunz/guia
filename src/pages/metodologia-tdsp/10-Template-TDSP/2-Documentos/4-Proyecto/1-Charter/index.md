---
title: 1-Charter
---

## Carta del proyecto

Conocimiento de los negocios
 ```
    ¿Quién es el cliente? ¿En qué dominio comercial se encuentra el cliente?
    ¿Qué problemas comerciales estamos tratando de resolver?
 ```

Alcance
 ```
    ¿Qué soluciones de ciencia de datos estamos tratando de construir?
    ¿Que haremos?
    ¿Cómo va a ser consumido por el cliente?
 ```

Personal
 ```
    Quiénes están en este proyecto:
        Microsoft:
            Lider del Proyecto
            PM
            Data scientist (s)
            Gerente de cuentas
        Cliente:
            Administrador de datos
            Contacto de negocio
 ```

Métrica
 ```
    ¿Cuáles son los objetivos cualitativos? (por ejemplo, reducir la rotación de usuarios)
    ¿Qué es una métrica cuantificable (por ejemplo, reducir la fracción de usuarios con inactividad de 4 semanas)?
    Cuantifique qué mejoras en los valores de las métricas son útiles para el escenario del cliente (por ejemplo, reduzca la fracción de usuarios con inactividad de 4 semanas en un 20%)
    ¿Cuál es el valor de referencia (actual) de la métrica? (por ejemplo, la fracción actual de usuarios con inactividad de 4 semanas = 60%)
    ¿Cómo mediremos la métrica? (por ejemplo, prueba A / B en un subconjunto específico durante un período específico o comparación del rendimiento después de la implementación con la línea base)
 ```

Plan
 ```
    Fases (hitos), línea de tiempo, breve descripción de lo que haremos en cada fase.
 ```

Arquitectura
 ```
    - Datos
        ¿Qué datos esperamos? Datos brutos en las fuentes de datos del cliente (por ejemplo, archivos en premisa, SQL, Hadoop local, etc.)

    - El movimiento de datos de On-Prem a Azure usando ADF u otras herramientas de movimiento de datos (Azcopy, EventHub, etc.) para moverse
        todos los datos,
        después de una preagregación agregada en el lugar,
        La muestra de datos es suficiente para modelar

    - Qué herramientas y recursos de almacenamiento / análisis de datos se usarán en la solución, p.
        ASA para la agregación de secuencias
        HDI / Hive / R / Python para la construcción de características, la agregación y el muestreo
        AzureML para modelado y operacion de servicios web

    - ¿Cómo se consumirá el puntaje o los servicios web en operación (RRS y / o BES) en el flujo de     trabajo del negocio del cliente? Si corresponde, escriba el pseudo-código para las API de las llamadas al servicio web.
        ¿Cómo usará el cliente los resultados del modelo para tomar decisiones?
        Oleoducto de movimiento de datos en producción
        Haga un diagrama de 1 diapositiva que muestre el flujo de datos de extremo a extremo y la arquitectura de decisión
            Si hay un cambio sustancial en el flujo de trabajo del negocio del cliente, haga un diagrama de antes / después que muestre el flujo de datos.
 ```

Comunicación
 ```
    ¿Cómo nos mantendremos en contacto? Reuniones semanales?
    ¿Quiénes son las personas de contacto en ambos lados? ```