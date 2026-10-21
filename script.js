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

// La antigüedad en el empleo actual se calcula sola. Escrita a mano se queda
// vieja sin que nadie lo note, y una hoja de vida que dice "6 meses" cuando ya
// van ocho se lee como descuidada: ese descuido contagia al resto del
// documento. El texto que viene en el HTML es el valor de respaldo, correcto
// el día en que se escribió, por si esto no corre.
document.addEventListener('DOMContentLoaded', () => {
  const hoy = new Date();

  document.querySelectorAll('.duracion[data-desde]').forEach(el => {
    const [anio, mes] = el.dataset.desde.split('-').map(Number);
    if (!anio || !mes) return;

    const meses = (hoy.getFullYear() - anio) * 12 + (hoy.getMonth() + 1 - mes);
    if (meses < 1) return; // fecha futura o mal escrita: se respeta lo escrito

    const anios = Math.floor(meses / 12);
    const resto = meses % 12;
    const partes = [];
    if (anios) partes.push(anios === 1 ? '1 año' : `${anios} años`);
    if (resto) partes.push(resto === 1 ? '1 mes' : `${resto} meses`);
    el.textContent = partes.join(' ');
  });
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
