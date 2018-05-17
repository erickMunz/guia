# Contribución

Con tu ayuda, podemos crear una herramienta de referencia de facil entendimiento que ayude a miles de personas que deseen aprender código en los siguientes años.  💛

> La siguiente tabla de contenido fue generada automaticamente usando [Markdown TOC](https://marketplace.visualstudio.com/items?itemName=AlanWalk.markdown-toc) con la extención en  [VS Code](https://code.visualstudio.com/).

<!-- TOC -->

- [Contribución](#contributing)
  - [Pasos](#Pasos)
  - [Creando un PR](#creating-a-pr)
    - [Usando GitHub.com](#using-githubcom)
    - [Clonación local](#cloning-locally)
    - [Ejecutando localmente](#running-locally)
  - [Obtener PR Accepted](#getting-pr-accepted)
    - [Etiquetas](#labels)
    - [Confligtos/Contenido Duplicado](#conflictingduplicate-content)
    - [Solicitud de cambios](#requesting-changes)
    - [Compilación Travis CI](#travis-ci-build)
    - [Cierre](#closing)
    - [Ayuda](#getting-help)
  - [Articulo guias de estilo](#article-style-guide)
    - [Titulo](#title)
    - [Modularidad](#modularity)
    - [Bloques de Código](#code-blocks)
    - [Enlaces](#links)
    - [Imagenes](#images)
    - [Atribuciones](#attributions)
    - [Recursos](#resources)
    - [Formatos](#formatting)
  - [Tecnicas de escritura](#technical-writing)
    - [Resumen](#outline)
    - [Introducción](#intro)
    - [Contenido](#content)
    - [Claridad](#clarity)
    - [Voz](#voice)
      - [Pasivo](#passive)
      - [Activo](#active)
    - [Puntos de Vista](#point-of-view)
    - [Abreviaciones](#abbreviations)
    - [Nombres propios](#proper-nouns)
    - [Herramientas de terceros](#third-party-tools)
- [Revisando PRs](#reviewing-prs)
  - [Funcionar y mezclar](#squash-and-merge)
  - [Filtado de PRs](#filtering-prs)
  - [Plantillas](#templates)
    - [Error de compilación](#build-error)
    - [Sincronización de bifurcaciones](#syncing-fork)
    - [Mezclando conflictos](#merge-conflicts)
    - [Duplicidad](#duplicate)
    - [Cierre](#closing-1)

<!-- /TOC -->

## Pasos

1. 🍴 [Darle Fork este repositorio](https://github.com/freeCodeCamp/guides#fork-destination-box)
2. 👀️ Siga las guias de contribución resumidas a continuación.
3. 🔧 ¡Has cambios increibles!
4. 👉 [Crea una petición "pull"](https://github.com/freeCodeCamp/guides/compare)
5. 🎉 ¡Haz que tu petición sea aprovada - Exito!

O simplemente [reporta un problema ](https://github.com/freeCodeCamp/guides/issues) - toda la ayuda cuenta!

## Creando un PR

### Usando GitHub.com

Ve el video demostrativo o siguie los siguientes pasos:

![GIF mostrando los pasos de GitHub](https://i.imgur.com/0cmxJwN.gif)

1. Ve al folder de **"pages"**  (localizado en `guides/src`) y encuentra el articulo plantilla que quisieras escribir o editar.

    > Todas las plantillas estaran en un documento index.md 

2. Presiona el icono de lapiz con <kbd>Edit this article</kbd>  y hazle cambios al archivo en formato Markdown de GitHub.

3. Ve hasta el fondo de la pantalla y agrega un mensaje de commit explicando tus cambios.

4. Despues selecciona la opcion radio button que dice  **"Create a new branch for this commit and start a pull request"** y presiona <kbd>Propose file changes</kbd>.

5. En la siguiete pantalla, podras agregar cualquier detalle acerca de tu PR y despues dar clic en <kbd>Create pull request</kbd>.

### Clonar localmente

1. Hazle Fork a este repositorio

2. Copialo a tu maquina local con el siguiente comando:

    ```bash
    git clone https://github.com/bigdatamx/guides-capacitacion-praxis.git
    ```

3. Agrega un upstream remoto de forma que git sepa en donde se encuentra la guia oficial de BigdataMx con el siguiente comando:

    ```bash
    git remote add upstream https://github.com/bigdatamx/guides-capacitacion-praxis.git
    ```

4. Crea un nuevo branch para tu trabajo con el siguiente comando `git checkout -b NOMBRE-BRANCH`.

    > Intenta ponerle un nombre que describa el topico de tu articulo como `fix/articulo-html`

5. Escribe tu articulo, hazle commit a tus cambios locales y sañe úsh a tu nuevo branch en GitHub con el comando `git push origin NOMBRE-BRANCH`

6. Ve a tu respositorio en GitHub y abre un PR 

Asegurate de mantener un fork local en crecimiento de forma que se mantenga actualizado con el repositorio  de BigdataMx.

La proxima vez que quieras contribuir, hazle checkout a tu branch local `master` y corre el comando `git pull --rebase upstream master` antes de crear un nuevo branch.

Esto tomará todos los cambios en el `master` original sin hacer un commit adicional en tu repositorio local.

### Correrlo local

```bash
# Asegurate de tener yarn instalado
npm install -g yarn

# dale fork tu repo

# clona tu  repo
git clone https://github.com/YOUR-GITHUB-USERNAME/guides.git

# posicionate en la raiz de el repo
cd guides

# instala las dependencias
yarn install

# correlo localmente
yarn run dev
```

Usamos `yarn` porque `netlify` compila el sitio con `yarn`.

## tu PR aprovada

Aqui hay una guia que siguen los revisores de contenido para los PR:


Here are a few guidelines the reviewers follow when reviewing PRs:
- La descripcion y el titulo son relevantes
- La PR respeta el [guia de estilo de articulo](./CONTRIBUTING.md/#article-style-guide)
- Sigue los tips generales  encontrados en [Guia de moderador](https://forum.freecodecamp.org/t/freecodecamp-moderator-guidelines/18295)
- Con que el pull request mejore o expanda la guia, lo aceptamos aunque contenga errores de sintaxis en Español o en el contenido parcial.
- Pull request viejos son revisados primero

### Etiquetas

- **content** es para pull request que modifican el contenido de los articulos en la guia (agregan un nuevo articulo o actualizan un articulo existente)
- **duplicate** es para pull requests que tienen el mismo contenido que en otro PR abierto
- **changes requested** es para pull request que necesitan un cambio antes de ser aceptadas
- **stale** es para pull requests con la etiqueta _"changes requested"_ que no tienen actividad por mas de 2 semanas y subsqcuentemente seran cerrados.
  - las _stale_ pull request deben de estar cerradas.
  - Aqui hay [un ejemplo](https://github.com/freeCodeCamp/guides/pull/235).

### Contenido Duplicado/Conflictivo

Una PR es considerada un **Duplicado** si le hace cambios al mismo articulo con una PR diferente.

En general, un revisor deberá:

1. Ordenar las PR por la mas vieja
2. Buscar PR con contenido similar
3. Combinar la PR mas nueva con la mas vieja

Es muy probable que existan conflictos al combinar PRs duplicadas.

Los revisores harán un esfuerzo a resolver estos conflictos en la combinación de PRs.

### Pedir cambios

Si una pull request no es perfecta, el revisor podrá:
- pedir cambios al contribuidor y agregar la etiqueta *cambios pedidos*
- Arreglar cambios menores y hacer un commit sobre la PR

### Compilacion Travis CI 
Todas las PRs deben de pasar la verificación de Travis CI antes de que podamos combinarlos.

Si una PR rompe la compilación (Travis CI mostrara una "X" roja) habra dos tipos de soluciones.

Deberas de arreglar el problema antes de que combinemos tu PR:

1. Tu PR crea un nuevo articulo y le falta el `index.md` de alguna forma.
    - Cada folder dentro de  `src/pages` necesita un archivo`index.md` dentro de el (y el nombre debe de ser `index.md`).
    - Dos escenarios probables son:
      - nombraste el archivo con algo diferente a`index.md`, o
      - creaste un nuevo folder y después un sub-folder, y escribiste el articulo en el subfolder pero no pusiste el archivo `index.md` en el nuevo folder.
2. El artículo no tiene un `title` en la cabezera.
    - Por favor checa el [Title](#title) en la sección dentro de [guia de diseño de articulo](#article-style-guide).

### Cierre

Nosotros cerramos un pull request :

- si un PR mas viejo sobre el mismo articulo es combinado, y tu PR no agrega informacion nueva.

- si hay poco o cero esfuerzo en mejorar la información por ejemplo copiar y pegar info de wikipedia

- si hay texto de un origen con copyright - ver [problema con citas](https://github.com/freeCodeCamp/guides/issues/2503)

- si no respecta la [guia de estilo en artículos](#article-style-guide)
- si no respeta la [política de honestidad académica](https://www.freecodecamp.org/academic-honesty)
- si se ha hecho un request y no hay actividad por aproximadamente dos semanas

Si estas trabajando en un articulo plantilla, los cambios deben de ser significativos para cambiar el texto en la plantilla.

No aceptaremos una PR que solo agrega links a la sección de "Mas información".

El respositorio tiene un script `Normalise.js` que agrega atributos a los links pero también verifica si existe el texto "esta es una plantilla" mediante un regexp.

If found, it will revert the article text back to the generic stub text (and erase your changes).

This is intended behavior, since it allows us to update all stubs if the template stub changed for any reason.

### Obteniendo ayuda

Existe una comunidad de apoyo de todo un equipo de gente que contribuye, con quienes puedes intercambiar ideas y solicitar aportaciones sobre lo que escribes.

Mantente activo en la [sala de chat] (https://gitter.im/freecodecamp/contributors) y haz muchas preguntas.

## Guia de estilo para articulos

Escribimos una guia siguiente guía para escribir artículos de Guía para ayudarlo a comenzar a contribuir.

### Título

Los títulos de los artículos deben ser lo más breves, concisos y directos posible.

Queremos que los contribuidores encuentren rápidamente la información que están buscando, y el título debe reflejar el tema principal del artículo.

El nombre de la carpeta se utiliza en la URL, por lo que solo se utilizan guiones, números 0-9 y letras minúsculas a-z para ello.

Aun asi se pueden poner caracteres especiales título del artículo.

Listamos algunos ejemplos de títulos

> [`src / pages / html / tables / index.html`] (https://github.com/freeCodeCamp/guides/blob/master/src/pages/html/tables/index.md)

```markdown
---
título: Tablas
---
```

> [`src / pages / css / borders / index.md`] (https://github.com/freeCodeCamp/guides/blob/master/src/pages/css/borders/index.md)

```markdown
---
título: Fronteras
---
```

> [`src / pages / javascript / loops / for-loop / index.md`] (https://github.com/freeCodeCamp/guides/blob/master/src/pages/javascript/loops/for-loop/index .Maryland)

```markdown
---
título: For Loop
---
```

### Modularity

Each article should explain exactly one concept, and that concept should be apparent from the article's title.

We can reference other articles by linking to them inline, or in an "Other Resources" section at the end of the article.

Our goal is to have thousands of articles that cover a broad range of technical topics.

### Modularidad

Cada artículo debe explicar exactamente un concepto, y ese concepto debe ser evidente en el título del artículo.

Podemos hacer referencia a otros artículos al vincularlos en línea o en la sección "Otros recursos" al final del artículo.

Nuestro objetivo es tener miles de artículos que cubren una amplia gama de temas técnicos.

### Bloques de código
la idea de esto es que el usuario pueda usar estos artículos como referencia rápida.

Los artículos deben tener ejemplos simples del mundo real que muestren casos de uso común de esa sintaxis.

El markup de GitHub permite [agregar bloques de código] (https://help.github.com/articles/creating-and-highlighting-code-blocks/#syntax-highlighting) para muchos lenguajes de programación.

Para usarlo, se debe poner el lenguaje de programación después de el ```.

Por ejemplo, el siguiente Markdown

```markdown
    ```html
    <div class = 'awesome' id = 'más-impresionante'>
      <p> Esto es texto en html </ p>
    </div>
    ```
```

dará salida al siguiente bloque de código con resaltado de sintaxis `HTML` ya que indicamos el lenguaje es ` html` después de ```.

```html
<div class = 'awesome' id = 'más-impresionante'>
  <p> Esto es texto en html </ p>
</ div>
```

A continuación, se muestran otros dos ejemplos que utilizan el lenguaje de JavaScript y CSS.

```markdown
    ```javascript
        function logTheThings (cosas) {
          console.log (cosas);
        }
    ```

    ```css
        .increíble {
          background-color: #FCCFCC;
        }
    ```
```

Aquí ejemplo para el uso bloques de código:

- Las sentencias de JavaScript deben terminar con un punto y coma `;`
- Los comentarios realizados deben tener un espacio entre los caracteres de comentario y el comentario, de esta forma:
    ```javascript
    // Comentario prueba
    ```
### Enlaces

Use los enlaces web con el estilo de markup en sus artículos para vincular a otros sitios web.

la forma de utilizarlo es la siguiente:

```markdown
[BigdataMx] (https://guias.bigdatamx.org)
```

### Imágenes

Para incluir imágenes, si aún no están alojadas en otro sitio en la web, deberá ponerlas en línea usando una plataforma como [Imgur] (https://imgur.com/) o [Flickr] (https: / /www.flickr.com). También puede alojar imágenes comprometiéndolas en un repositorio gitHub. Luego puede hacer clic con el botón derecho en la imagen y copiar su URL.

No permitimos el alojamiento de imágenes directamente en el repositorio de git porque sería demasiado grande (cuando lo descarguen terminarían descargando las imágenes también), y porque es más fácil cambiar una imagen por simplemente cambiando la URL en un artículo que colocando la nueva imagen en el repositorio.

Para incluir la imagen en su artículo, use la sintaxis de reducción apropiada:

```markdown
! [Título de la imagen] (https: // url-to-image)
```

También las imágenes deberían aparecer al hacer clic en la pestaña <kcd> Vista previa </kcd>.

También puedes agregar diagramas, gráficos o visualizaciones.

También insertár videos de YouTube relevantes y editores de códigos [REPL.it] (https://repl.it/) interactivos.

No se deberá usar emojis o emoticones en la Guía. Bigdatamx tiene una comunidad global, y el significado cultural de un emoji o emoticon puede ser diferente en todo el mundo. Además, los emojis pueden representarse de manera diferente en diferentes sistemas.

### Atribuciones

Para minimizar el la probabilidad de plagio y mantener la integridad en estas guías, es importante dar crédito donde sea necesario.

Cualquier material citado, o usado directamente y sin cambios, del material fuente debe estar entre comillas y ser citado adecuadamente. También se debe citar el material que no es una cita directa pero que aún está parafraseado de un recurso diferente.

Puede crear números de indice para marcar el contenido que se cita con las etiquetas `<sup> </sup>`.

Por ejemplo: <sup> 1 </sup>

1. BigDataMx - Atribuciones

Después, en la parte inferior de su artículo, coloque una

```markdown
### Fuentes
```

Agregue un encabezado e incluya todas sus citas con numero para listar a sus fuentes.

Por ejemplo:

```markdown
Texto que debería citarse. <Sup> 1 </ sup>

Y aquí hay aún más que deberá citarse de otra fuente. <Sup> 2 </ sup>

### Fuentes

1. [Doe, John. "Palabras de autoría". * WikiCoder *. 1 de enero de 1970. Consultado: 20 de octubre de 2017] (#)
2. [Purdue OWL Staff. "MLA Works Cited: Electronic Sources". * Purdue Online Writing Lab. * 12 de octubre de 2017. Consultado: 20 de octubre de 2017.] (https://owl.english.purdue.edu/owl/resource/747/08/)
```

Puede consultar el enlace de Purdue arriba para ver cómo citar correctamente las fuentes web (¡incluso muestran cómo citar los tweets!).

Normalmente, una atribución tiene una estructura como la siguiente:

> Apellido del autor, nombre del autor. "Título del artículo." * Publicación. * Editor. Fecha de publicación. Fecha de acceso.

Si no puedes encontrar un autor o una fecha publicada, que es común, simplemente omítalos.

Es importante citar correctamente ya que esto no solo mantendrá a las guías acreditadas, sino que estas citas y enlaces también proporcionarán recursos valiosos si el lector desea obtener más información sobre el tema.

También deberás tener en cuenta que las instancias de plagio se eliminarán o se rechazarán sus solicitudes de extracción, y el usuario recibirá una advertencia.

Consulta las [Políticas de Honestidad Académica] de Bigdata Mx (https://www.freecodecamp.org/academic-honesty) antes de contribuir.
### Recursos

Si hay otros recursos de la guía que piensas que beneficiarían los lectores, agrégalos en la parte inferior de la sección de "Recursos" con una lista.

```markdown
### Recursos

- [Un nuevo recurso] (# enlace)
```

### Formateo

Use comillas dobles donde corresponda.

Utilice la coma de Oxford cuando sea posible (es una coma utilizada después del penúltimo elemento en una lista de tres o más elementos, antes de 'y' o 'o', por ejemplo, un pintor, escultor y arquitecto italiano). Hace las cosas más fáciles, más claras y más bonitas de leer.

## Escritura técnica

La escritura técnica, o la literatura de ciencia y tecnología, es difícil.

Tendrá que tomar un tema técnico (generalmente abstracto) y explicarlo de manera clara, precisa y objetiva.

Es probable que pases por varias rondas de revisión y edición antes de que se tenga un contenido final.

### Outline

Antes de comenzar a escribir, cree un resumen del tema y piense en los ejemplos de codificación que usará (si corresponde).

Esto ayuda a organizarse y facilitar el proceso de escritura.

### Introducción

El párrafo de introducción debe tener solo de 1 a 2 oraciones y ser una explicación simple del tema principal. 

Evite el uso de cualquier enlace a otros artículos de la Guía, ya que pueden ser una distracción.

### Contenido

Mantenga los párrafos cortos (alrededor de 1 a 4 oraciones). Es más probable que las personas lean varios párrafos cortos sobre un muro de texto.

### Claridad

Los artículos deben escribirse con oraciones cortas y claras, y usar la menor jerga que sea necesaria.

Toda la jerga debe definirse inmediatamente.

### Voz

Usas voz activa en lugar de voz pasiva. En general, es una manera más fuerte y más directa de comunicar un tema. Por ejemplo:

#### Pasivo

El bucle `for` en JavaScript es utilizado por los programadores para ...

#### Activo

Los programadores usan el bucle `for` en JavaScript para ...

### Punto de vista

El texto debe usar la segunda persona ("usted") para ayudar a darle un tono de conversación.

De esta manera, el texto y las instrucciones parecen dirigirse directamente al campista leyéndolo.

Intente evitar el uso de la primera persona ("Yo", "nosotros", "vamos" y "nos").

### Abreviaturas

Si deseas abreviar un término en su artículo, escríbelo completo primero, luego ponga la abreviación entre paréntesis.

Por ejemplo, `" En ciencias de la computación, un árbol de sintaxis abstracta (ASA) es ... "`

### Nombres propios

Los nombres propios deben usar mayúsculas correctas cuando sea posible. A continuación hay una lista de palabras tal como deberían aparecer en los artículos de la Guía.

- JavaScript (letras mayúsculas en "J" y "S" y sin abreviaturas)
- Node.js

El desarrollo de front-end (forma adjetiva con un guion) es cuando se trabaja en el front-end (forma de sustantivo sin guión). Lo mismo ocurre con el back-end, la pila completa y muchos otros términos compuestos.

### Herramientas de terceros

Para verificar la gramática y la ortografía, recomendamos usar una aplicación como [Grammarly] (https://grammarly.com) o una extensión / complemento integrado que verifique esto en su editor de texto como lo son:

- [Código VS] (https://code.visualstudio.com/) - [Código Corrector ortográfico] (https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
- [Sublime Text 3] (https://www.sublimetext.com/docs/3/spell_checking.html)

Para verificar su estilo de escritura, recomendamos la [Aplicación Hemingway] (http://www.hemingwayapp.com/).

No hay nada mágico en esta sencilla herramienta, pero detectará automáticamente problemas de estilo ampliamente acordados:

- voz pasiva
- adverbios innecesarios
- palabras que tienen equivalentes más comunes

La aplicación Hemingway asignará un "nivel de grado" para su escritura.

Debes aspirar a un nivel de grado de 6.

Otra herramienta disponible es la [De-Jargonizer] (http://scienceandpublic.com/), originalmente diseñada para la comunicación científica, pero podría ayudar a evitar una redacción sobreespecializada.

---

# Revisión de relaciones públicas

> Esta sección está dirigida a los revisores de este repositorio.

## Aplastar y Combinar

Usamos la opción <kcd> Aplastar y combinar </kcd> al fusionar el PR que mantiene limpio el historial de confirmaciones.

! [GIF - Aplastar and merge] (https://files.gitter.im/FreeCodeCamp/Contributors/56MQ/9cb8db153d7bb1b3576cd1ffc207e39d.gif)

## filtrado de relaciones públicas

> Relaciones Públicas, Abierto, El más antiguo Primero, Travis CI Build exitoso, nadie asignado, no hay comentarios

[`La: PR es: open sort: estado asc actualizado: éxito no: comentarios del destinatario: 0`] (https://github.com/bigdatamx/guides-capacitacion-praxis/pulls?utf8=%E2%9C%93&q=is%3Apr%20is%3Aopen%20sort%3Adaptado-asc%20status%3Asuccess%20no%3Aassignee%20comments%3A0)

> PR, abierto, el más antiguo primero, no tiene etiquetas: `platform`,` enhancement`, `invalid` o` changes requested`

[`La: PR es: open sort: updated-asc -label: platform -label: enhancement -label: invalid -label:" changes requested "`] (https://github.com/bigdatamx/guides-capacitacion-praxis//pulls?utf8=%E2%9C%93&q=es% 3Apr%20is%3Aopen%20sort%3Adaptado-asc%20-label%3Aplatform%20-label%3Aenhancement% 20-label% 3Ainvalid%20-label%3A%22changes%20requested%22).

## Plantillas

> Puede hacer la suya con la función [** replies saved **] (https://github.com/settings/replies/) integrada de GitHub o usar las siguientes.

### Error de compilación

```markdown
Hola, @username

Así que me encantaría poder fusionar los cambios, pero parece que hay un error con la compilación de Travis CI. ⚠️

Una vez que resuelva estos problemas, podré revisar sus relaciones públicas y fusionarlos. 😊

---

> No dude en consultar la [Guia de estilos] (https://github.com/freeCodeCamp/guides#article-title) para este repositorio sobre el formato correcto de un artículo para que su compilación de Travis CI pase. ✅
>
> Además, es una buena práctica en GitHub escribir una breve descripción de los cambios al crear un PR. 📝
```

### Sincronización de horquillas

> Cuando un PR no está actualizado con la rama `master`.

```` `` markdown
Hola, @username

Así que me encantaría poder fusionar los cambios, pero parece que hay un error con la compilación de Travis CI. ⚠️

```bash
Error: ENOTDIR: no es un directorio, abre 'src / pages / java / data-abstraction / index.md'
```

Este error en particular no fue causado por su archivo, sino que fue un error antiguo causado por la fusión del código defectuoso con la rama `master`. Desde entonces ha sido resuelto.

Para pasar la compilación, deberá sincronizar los últimos cambios desde la rama `master` del repositorio` freeCodeCamp / guides`.

Usando la línea de comando, puede hacer esto en tres sencillos pasos:

```bash
git remote add upstream git: //github.com/freeCodeCamp/guides.git

git buscar aguas arriba

git pull upstream master
```

Si está usando una GUI, puede simplemente `Agregar un nuevo control remoto ...` y usar el enlace `git: // github.com / freeCodeCamp / guides.git` desde arriba.

Una vez que sincronice su fork y pase la compilación, podré revisar su PR y fusionarla. 😊

---

> Sientete libre de hacer referencia al artículo [Syncing a Fork] (https://help.github.com/articles/syncing-a-fork/) en GitHub para obtener más información sobre cómo mantener su tenedor actualizado con el repositorio aguas arriba 🔄
>
> Además, es una buena práctica en GitHub escribir una breve descripción de los cambios al crear un PR. 📝
```
### Conflictos de fusión

> Cuando la PR tiene conflictos de fusión que deben resolverse.¹

```markdown
Hola, @username

Así que me encantaría poder fusionar tus cambios, pero parece que tienes algunos conflictos de fusión. ⚠️

Una vez que resuelva estos conflictos, podré revisar su PR y fusionarlo. 😊

---

> Si no está familiarizado con el proceso de fusión de conflictos, no dude en consultar la guía de GitHub sobre ["Resolver un conflicto de combinación"] (https://help.github.com/articles/resolving-a-merge-conflict- on-github /). 🔍️
>
> Además, es una buena práctica en GitHub escribir una breve descripción de los cambios al crear un RP. 📝
```
¹ Si un contribuyente primerizo tiene un conflicto de fusión, los mantenedores resolverán el conflicto por ellos.

### Duplicar

> Cuando una PR es repetitivo o duplicado.

```markdown
Hola, @username

Parece que cambios similares ya han sido aceptados anteriormente para este artículo que está editando, lo siento. 😓

Si cree que tiene más para agregar, no dude en abrir un nuevo RP.

¡Gracias de nuevo! 😊

---

> Si tiene alguna pregunta, no dude en comunicarse a través de [Gitter] (https://gitter.im/FreeCodeCamp/Contributors) o haciendo un comentario a continuación. 💬
```

### Clausura

> Cuando una PR no es válido.

```markdown
Hola, @username

En realidad, no ha agregado ningún contenido, por lo que cerraré este anuncio y lo marcaré como "no válido". 😓️

¡Siéntete libre de abrir otro RP! 👍
```