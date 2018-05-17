---
title: 5-Ejecución de proyectos de ciencia de datos 
---
# <a name="track-progress-of-data-science-projects"></a>Seguimiento del progreso de proyectos de ciencia de datos

Los administradores de grupo de ciencia de datos, los responsables de equipo y de proyecto tienen que realizar el seguimiento del progreso de sus proyectos de equipo, qué trabajo se ha realizado en ellos y por quién, y lo que queda en la lista de tareas pendientes. 

## <a name="vsts-dashboards"></a>Paneles de VSTS
Si usa Visual Studio Team Services (VSTS), es posible crear paneles para hacer el seguimiento de las actividades y de los elementos de trabajo asociados a un proyecto ágil determinado. 

Para más información sobre cómo crear y personalizar los paneles y widgets en Visual Studio Team Services, consulte los conjuntos de instrucciones siguientes:

- [Agregar y administrar paneles](https://docs.microsoft.com/vsts/report/dashboards/dashboards).
- [Agregar widgets a un panel](https://docs.microsoft.com/vsts/report/dashboards/add-widget-to-dashboard).

## <a name="example-dashboard"></a>Panel de ejemplo

Este es un panel de ejemplo sencillo que se creó para hacer seguimiento de las actividades de sprint de un proyecto de ciencia de datos ágil, así como también la cantidad de confirmaciones en los repositorios asociados. En el panel en la **parte superior izquierda** se muestra:

- la cuenta regresiva del sprint actual, 
- la cantidad de confirmaciones de cada repositorio durante los últimos siete días,
- el elemento de trabajo para usuarios específicos. 

En el resto de los paneles se muestra el diagrama de flujo acumulado (CFD), la evolución y la evolución ascendente de un proyecto:

- **Parte inferior izquierda**: CFD de la cantidad de trabajo con un estado determinado, donde el estado aprobado aparece en gris, el estado confirmado aparece en azul y el estado listo, en verde.
- **Parte superior derecha**: gráfico de evolución del trabajo que falta por completar en contraposición con el tiempo restante.
- **Parte inferior derecha**: gráfico de evolución ascendente del trabajo que se completó en contraposición con la cantidad de trabajo total.

![dashboard](./media/track-progress/dashboard.png)

Para una descripción de cómo crear estos gráficos, consulte las guías de inicio rápido y los tutoriales que aparecen en [Paneles](https://docs.microsoft.com/vsts/report/dashboards/).
 
## <a name="next-steps"></a>Pasos siguientes

También se proporcionan tutoriales que muestran todos los pasos del proceso en **escenarios concretos**. Se enumeran y vinculan con descripciones en miniatura en el artículo sobre los [tutoriales de ejemplo](walkthroughs.md). En ellos se ilustra cómo combinar herramientas y servicios locales y en la nube en un flujo de trabajo o canalización para crear una aplicación inteligente. 