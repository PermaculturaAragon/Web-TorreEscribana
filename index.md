---
layout: home
title: Torre Escribana
subtitle: Un proyecto viviencial basado en la Permacultura
cover-img: /assets/img/index/abeja.jpg
---

Torre Escribana, una finca situada en la fértil zona de huerta cerca de Zaragoza y regada por las aguas del río Gállego, está diseñada con principios permaculturales para albergar y fomentar la vida en todas sus formas. Inspirada por la naturaleza, la finca busca ser un modelo de sostenibilidad y responsabilidad ambiental, ofreciendo inspiración a aquellos que desean vivir de manera más consciente. A través de la aplicación de patrones naturales, trabajamos para regenerar y cuidar el trozo de tierra que nos ha sido confiado.

## ¿Qué hay en Torre Escribana?


En Torre Escribana, la vida bulle en todas sus formas. Desde cientos de árboles, arbustos y flores hasta plantas medicinales y aromáticas, desde bichos diminutos hasta criaturas tan grandes como una cabra, nuestra finca es un ecosistema vibrante donde la diversidad es la norma.

Pero no se trata solo de naturaleza; elementos como acequias, vallas y bioconstrucciones se entrelazan con la vida vegetal y animal, formando sistemas complejos como huertos, bosques comestibles, el Wc Seco, espacios de convivencia y estructuras de apoyo para sistemas de energías renovables y gestión del agua asegurando una armonía sostenible con el entorno natural. 
 
En Torre Escribana, la conexión con la tierra es palpable en cada rincón, y estamos emocionados de compartir este oasis de vida y sostenibilidad con vosotras.


[Descubre mucho más.](/proyecto/)  
[Conoce a sus integrantes.](/nosotras/)  
[Profundiza en su diseño.](/diseno/)


## ¿Qué es la Permacultura?

La Permacultura es un enfoque holístico para el diseño y la gestión de sistemas sostenibles que se basa en principios éticos y patrones naturales. Se trata de crear hábitats humanos armoniosos y productivos que trabajen en colaboración con los ecosistemas naturales en lugar de contra ellos.

En la Permacultura, se valora la diversidad, la interconexión y la resiliencia, se busca minimizar el desperdicio y maximizar el rendimiento del sistema. Es un enfoque integral que abarca áreas como la agricultura, la arquitectura, la energía, el agua, la economía y la comunidad que se centra en soluciones creativas y sostenibles para los desafíos contemporáneos.
 
<p>Para saber más <a href="http://www.permaculturaaragon.org/" target="_blank">Permacultura Aragón</a>.</p>




{% assign eventos = site.agenda %}
<section>
  <div class="container">
    <div class="row">
      <div class="col-lg-12 text-center">
        <h2 class="section-heading">Próximos eventos</h2>
        <hr class="primary">
      </div>
    </div>
  </div>
  <div class="container-fluid">
    <div class="row row-centered">

      {% for evento in eventos %}

      <div class="col-lg-4 col-md-6 col-sm-12 col-centered text-center wow bounceIn taller-box">
        <div class="proximo-taller-box" style="background-image: url({{taller.taller_imagen}})">
          <div class="proximo-taller-box-info">
            <h3>{{ evento.title }}</h3>
            {{evento.date}}

            <a href="{{ evento.url }}" class="btn btn-primary btn-xl page-scroll "><i class="fa fa-info-circle"></i>
              detalles</a>

          </div>
        </div>
      </div>

      {% endfor %}

    </div>
  </div>
</section>

## Blog

ULTIMOS 3 ARTICULOS

ENLACE AL BLOG

## Noticias

ULTIMAS 3 NOTICIAS

ENLACE A TODAS LAS NOTICIAS

## Visita Torre escribana

Es posible visitar Torre Escribana de diferentes maneras y estaremos encantadas de abrir nuestras puertas para compartir con vosotras nuestras experiencias, pero es importante saber que es nuestro hogar, nuestra"cueva". Es allí donde vivimos las alegrías y penas familiares y donde hacemos nuestra vida día tras día.

Si quieres visitar el proyecto [AQUI](/visitas/) te explicamos como puedes hacerlo. Consulta además la [agenda](/agenda/) de Torre Escribana para comprobar si se acerca una jornada colaborativa o día de puertas abiertas.


## Contacto

[Contacto](/contacto/)


## Proyectos amigos

links a enlaces de interes
