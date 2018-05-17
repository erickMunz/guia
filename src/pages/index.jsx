import React from 'react';
import Helmet from 'react-helmet';

function Index() {
  return (
    <div>
      <Helmet>
        <title>Praxis - Big Data Analytics</title>
      </Helmet>
      <h2>Big Data Analytics</h2>
      <hr/>
      <p>
        {
          'Site donde se concetra la información referente al plan de capacitación de la especialidad Big Data Analytics'
        }
      </p>
      <p>Tópicos principales</p>
        <ul>
          <li>Arquitectura Sistemas Operativos Linux</li>
          <li>Arquitectura de Base de Datos</li>
          <li>Minería de Datos</li>
          <li>Procesamiento - Analítica</li>
        </ul>
        <h3>Por donde empezar?</h3>
        <p>
          {
            'Quieres empezar a programar pero \'no sabes en donde' +
            'comezar?, checa: '
          }
          <a
            href='https://bigdatamx.org'
            rel='nofollow'
            target='_blank'
            >
            bigdatamx.org
          </a>
          {
            'Aqui podrás aprender desde cero' +
            ' a programar.'
          }
        </p>
        <h3>Agrega contenido a las guias</h3>
        <p>
          {
            'Este sitio y sus contenidos son '
          }
          <a
            href='https://github.com/bigdatamx/guias-capacitacion'
            rel='nofollow'
            target='_blank'
            >
            open source
          </a>
          {
            ' ayuda a mejorarlo, estaremos muy agradecidos!'
          }
        </p>
        <hr />
        <p>Programa feliz!</p>
    </div>
  );
}

Index.displayName = 'IndexPage';

export default Index;
