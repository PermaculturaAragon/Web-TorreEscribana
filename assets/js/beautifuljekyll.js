// Beautiful Jekyll core behaviour + Torre Escribana custom JS

let BeautifulJekyllJS = {

  init : function() {
    // Navbar
    BeautifulJekyllJS.initNavbar();

    // Imagen de cabecera (big image)
    BeautifulJekyllJS.initHeaderImg();

    // Navbar que se encoge al hacer scroll
    $(window).scroll(function() {
      if ($(".navbar").offset().top > 50) {
        $(".navbar").addClass("top-nav-short");
      } else {
        $(".navbar").removeClass("top-nav-short");
      }
    });

    // Estilos al abrir/cerrar menú móvil
    $('#main-navbar').on('show.bs.collapse', function () {
      $(".navbar").addClass("top-nav-expanded");
    });
    $('#main-navbar').on('hidden.bs.collapse', function () {
      $(".navbar").removeClass("top-nav-expanded");
    });

    // Buscador en overlay
    BeautifulJekyllJS.initSearch();
  },

  initNavbar : function() {
    // Decide si la navbar debe ser dark o light según su fondo
    const navbar = $('.navbar');
    if (!navbar.length) return;

    const rgb = navbar.css("background-color").replace(/[^\d,]/g,'').split(",");
    if (rgb.length < 3) return;

    const brightness = Math.round(
      (parseInt(rgb[0]) * 299 +
       parseInt(rgb[1]) * 587 +
       parseInt(rgb[2]) * 114) / 1000
    );

    if (brightness <= 125) {
      navbar.removeClass("navbar-light").addClass("navbar-dark");
    } else {
      navbar.removeClass("navbar-dark").addClass("navbar-light");
    }
  },

  // 🔹 NUEVO: inicializar imagen de cabecera SIN aleatorios
  initHeaderImg : function() {
    const bigImgEl = $("#header-big-imgs");
    if (!bigImgEl.length) return;

    // Número de imágenes declarado
    const numImgs = parseInt(bigImgEl.attr("data-num-img")) || 0;
    if (numImgs === 0) return;

    // Usamos siempre la primera (data-img-src-1)
    const src  = bigImgEl.attr("data-img-src-1");
    const desc = bigImgEl.attr("data-img-desc-1");

    if (!src) return;
    BeautifulJekyllJS.setImg(src, desc);
  },

  // 🔹 Necesario para aplicar el background a la cabecera
  setImg : function(src, desc) {
    $(".intro-header.big-img").css("background-image", 'url(' + src + ')');
    const $desc = $(".img-desc");
    if (typeof desc !== "undefined" && desc !== false && desc !== "") {
      $desc.text(desc).show();
    } else {
      $desc.hide();
    }
  },

  initSearch : function() {
    const overlay = document.getElementById("beautifuljekyll-search-overlay");
    if (!overlay) return;

    $("#nav-search-link").click(function(e) {
      e.preventDefault();
      $("#beautifuljekyll-search-overlay").show();
      $("#nav-search-input").focus().select();
      $("body").addClass("overflow-hidden");
    });

    $("#nav-search-exit").click(function(e) {
      e.preventDefault();
      $("#beautifuljekyll-search-overlay").hide();
      $("body").removeClass("overflow-hidden");
    });

    $(document).on('keyup', function(e) {
      if (e.key === "Escape") {
        $("#beautifuljekyll-search-overlay").hide();
        $("body").removeClass("overflow-hidden");
      }
    });
  }
};

// --- Código personalizado Torre Escribana ---

document.addEventListener('DOMContentLoaded', function () {

  BeautifulJekyllJS.init();

  // Marca eventos pasados según data-end
  $(".card").each((_, element) => {
    const el = $(element);
    const endDate = el.data("end");
    if (!endDate) return;

    const diff = new Date().getTime() - new Date(endDate).getTime();
    if (diff > 0) {
      el.addClass("past-event");
    }
  });
});
