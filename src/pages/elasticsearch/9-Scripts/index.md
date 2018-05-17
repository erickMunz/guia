---
title: 9-Scripts
---
#Scripts

Elasticsearch cuenta con un gran número de herramientas para poder manipular información, una de ellas es la habilidad de crear scripts.

elastic search, cuenta con un numero de lenguajes para los scripts dentro de los que se encuentran:

- Painless
- expression
- mustache
- java

## Painless

Diseñado por elasticsearch, painless es muy parecido a Groovy, esta basado en java y tiene una compilación similar, se compila por medio de las bibiliotecas ANTLR4 yASM.

Dentro de sus caracteristicas se encuentran:
* Rendimiento rápido: los scripts de painless  se ejecutan varias veces más rápido que las alternativas.

* Seguridad: lista blanca de grano fino con granularidad de llamada / campo de método. .
* Tipeo opcional: las variables y los parámetros pueden usar tipos explícitos o el deftipo dinámico .
* Sintaxis: amplía la sintaxis de Java para proporcionar funciones de lenguaje de scripts Groovy que hacen que los scripts sean más fáciles de escribir.
* Optimizaciones: diseñado específicamente para scripting Elasticsearch.

Keywords de painless:

* if, else, while, do, for, in, continue, break, return, new, try, catch, throw, this, instanceof


##Expression

Basado en las expressiones de lucene se  compilan una javascript a bytecode. Están diseñados para la clasificación personalizada de alto rendimiento y funciones de ordenación y están habilitados secuencias de comando.

Una de sus caracteristicas principales es el rendimiento ya que las expresiones se diseñaron para tener un rendimiento competitivo con el código Lucene personalizado. Este rendimiento se debe a la baja sobrecarga por documento en comparación con otros motores de scripting: las expresiones hacen más "por adelantado".

**Sintaxis**
La sintaxis es muy parecida a Javascript pero debe ser escrito en una sola linea.
y algunos de los metodos que podemos utilizar para dentro de expression son:

|Expresion| Descripción|
|--|--|
|doc['field_name'].value|El valor del campo, como double |
|doc['field_name'].empty |Un booleano que indica si el campo no tiene valores dentro del documento. |
|doc['field_name'].length |La cantidad de valores en este documento. |
|doc['field_name'].min() |El valor mínimo del campo en este documento. |
|doc['field_name'].max() |El valor máximo del campo en este documento. |
|doc['field_name'].median() |El valor mediano del campo en este documento. |
|doc['field_name'].avg() |El promedio de los valores en este documento. |
|doc['field_name'].sum() |La suma de los valores en este documento. |

**Para las fechas**

|Expresion| Descripción|
|--|--|
|doc['field_name'].date.centuryOfEra|Siglo (1-2920000) |
|doc['field_name'].date.dayOfMonth|Día (1-31), por ejemplo, 1para el primero del mes.|
|doc['field_name'].date.dayOfWeek|Día de la semana (1-7), por ejemplo, 1para el lunes.|
|doc['field_name'].date.dayOfYear|Día del año, por ejemplo, 1para el 1 de enero.s|


## Mustache

Mustache es un legunaje para preprocesar contenido de algun campo almacenado en elasticsearch, nos ayuda para poder agregarle caracteristicas de texto a algun campo. Se generan plantillas para el texto y despues son prepocesadas.

Por ejemplo: 
```json
GET _search/template
{
    "source" : {
      "query": { "match" : { "{{mi_campo}}" : "{{mi_valor}}" } },
      "size" : "{{tamaño}}"
    },
    "params" : {
        "mi_campo" : "mensaje",
        "my_value" : "valor",
        "tamaño" : 5
    }
}
```
En donde {{mi_campo}},{{mi_valor}} y {{tamaño}}, son variables que serán llenadas de alguna manera.
se definen los parametros con la etiqueta "params".

## Java

La API de java es una forma avanzada de hacer scripts, es por lo versatil que resulta el lenguaje java para manipular los datos y las agregaciónes dentro de estos mismos.

Este es un ejemplo de script mostrado en la página oficial de ![elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-scripting-engine.html)
En donde se calcula el el score de la frecuencia de una palabra dentro de un campo de elasticsearch.

```java
private static class MyExpertScriptEngine implements ScriptEngine {
    @Override
    public String getType() {
        return "expert_scripts";
    }

    @Override
    public <T> T compile(String scriptName, String scriptSource, ScriptContext<T> context, Map<String, String> params) {
        if (context.equals(SearchScript.CONTEXT) == false) {if (context.equals(SearchScript.CONTEXT) == false) {
            throw new IllegalArgumentException(getType() + " scripts cannot be used for context [" + context.name + "]");throw new IllegalArgumentException(getType() + " scripts cannot be used for context [" + context.name + "]");
        }}
        // we use the script "source" as the script identifier// we use the script "source" as the script identifier
        if ("pure_df".equals(scriptSource)) {if ("pure_df".equals(scriptSource)) {
            SearchScript.Factory factory = (p, lookup) -> new SearchScript.LeafFactory() {SearchScript.Factory factory = (p, lookup) -> new SearchScript.LeafFactory() {
                final String field;final String field;
                final String term;final String term;
                {{
                    if (p.containsKey("field") == false) {if (p.containsKey("field") == false) {
                        throw new IllegalArgumentException("Missing parameter [field]");throw new IllegalArgumentException("Missing parameter [field]");
                    }}
                    if (p.containsKey("term") == false) {if (p.containsKey("term") == false) {
                        throw new IllegalArgumentException("Missing parameter [term]");
                    }
                    field = p.get("field").toString();
                    term = p.get("term").toString();
                }

                @Override
                public SearchScript newInstance(LeafReaderContext context) throws IOException {
                    PostingsEnum postings = context.reader().postings(new Term(field, term));
                    if (postings == null) {
                        // the field and/or term don't exist in this segment, so always return 0
                        return new SearchScript(p, lookup, context) {
                            @Override
                            public double runAsDouble() {
                                return 0.0d;
                            }
                        };
                    }
                    return new SearchScript(p, lookup, context) {
                        int currentDocid = -1;
                        @Override
                        public void setDocument(int docid) {
                            // advance has undefined behavior calling with a docid <= its current docid
                            if (postings.docID() < docid) {
                                try {
                                    postings.advance(docid);
                                } catch (IOException e) {
                                    throw new UncheckedIOException(e);
                                }
                            }
                            currentDocid = docid;
                        }
                        @Override
                        public double runAsDouble() {
                            if (postings.docID() != currentDocid) {
                                // advance moved past the current doc, so this doc has no occurrences of the term
                                return 0.0d;
                            }
                            try {
                                return postings.freq();
                            } catch (IOException e) {
                                throw new UncheckedIOException(e);
                            }
                        }
                    };
                }

                @Override
                public boolean needs_score() {
                    return false;
                }
            };
            return context.factoryClazz.cast(factory);
        }
        throw new IllegalArgumentException("Unknown script name " + scriptSource);
    }

    @Override
    public void close() {
        // optionally close resources
    }
}
``` 

Y podemos hacer uso de este script especificando el lenguaje como **expert_scripts** y el nombre del script:

```json
POST /_search
{
  "query": {
    "function_score": {
      "query": {
        "match": {
          "body": "foo"
        }
      },
      "functions": [
        {
          "script_score": {
            "script": {
                "source": "pure_df",
                "lang" : "expert_scripts",
                "params": {
                    "field": "body",
                    "term": "foo"
                }
            }
          }
        }
      ]
    }
  }
}

```