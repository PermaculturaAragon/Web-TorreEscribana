---
layout: page
title: Jornadas y Talleres
subtitle: Conoce Torre Escribana mientras aprendes
cover-img: ..\assets\img\proyecto\herramientas.jpg
---


Una forma de visitar Torre Escribana es aprovechar las jornadas colaborativas, los talleres y cursos formativos que se realizan aquí. Para estar informada de los mismos aprovecha para Suscribirte al Canal de **[TELEGRAM](https://t.me/torreescribana)** o visitando regularmente la **[AGENDA](/agenda/)**




{% assign eventos = site.agenda | sort: "start-date" | reverse  %}
<section>
  <div class="container-fluid">
    <div class="row row-centered">
      {% for evento in eventos %}
        <!-- ESTE IF HACE QUE SÓLO SALGAN LOS EVENTOS QUE TIENEN TALLER=TRUE -->
      {% if evento.taller == true %} 
      <div class="col-10 col-lg-6 wow bounceIn">
        {% include card_event.html %}
      </div>
      {% endif %}
      
      
      {% endfor %}
    </div>
  </div>
</section>



