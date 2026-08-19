// La animación de entrada es un adorno. El contenido se ve aunque esto no
// corra: styles.css solo la aplica bajo la clase .js-anim, que se añade en el
// <head>. Si el navegador bloquea el JavaScript, la hoja de vida sigue legible.
document.addEventListener('DOMContentLoaded', () => {
  const elementos = document.querySelectorAll('.reveal');

  // Sin IntersectionObserver (navegadores viejos) mostramos todo de una vez.
  if (!('IntersectionObserver' in window)) {
    elementos.forEach(el => el.classList.add('visible'));
    return;
  }

  const observador = new IntersectionObserver(entradas => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visible');
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.1 });

  elementos.forEach(el => observador.observe(el));
});

// Red de seguridad: si algo falla y a los 2 segundos quedan bloques ocultos,
// se muestran. Vale más una animación perdida que una página en blanco.
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add('visible');
      }
    });
  }, 2000);
});
