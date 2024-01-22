let seleccionarCarta;

(async () => {
const datosPersonajes = await (await fetch('datosPersonajes.json')).json();
const jugador1 = document.getElementById('jugador1');
const jugador2 = document.getElementById('jugador2');
const cartasJugador1 = jugador1.querySelector('.cartas');
const cartasJugador2 = jugador2.querySelector('.cartas');
const botonLuchar = document.querySelector('button');

function iniciarJuego() {
  console.log('hola')
  limpiarMensajes();
  resetearCartas(); 
  seleccionarCartasAleatorias();
}

function limpiarMensajes() {
  alert('Nuevo juego iniciado. ¡Que comience la batalla!');
}

function resetearCartas() {
  cartasJugador1.innerHTML = '';
  cartasJugador2.innerHTML = '';
}

function seleccionarCartasAleatorias() {
  const cartas = datosPersonajes.slice();

  for (let i = 0; i < 5; i++) {
    const cartaJugador1 = cartas.splice(Math.floor(Math.random() * cartas.length), 1)[0];
    const cartaHtmlJugador1 = `
      <div class="carta" data-index="${i}" onclick="seleccionarCarta(event, 1)">
        <img src="${cartaJugador1.imagen}" alt="${cartaJugador1.nombre}">
        <p>${cartaJugador1.nombre}</p>
        <p>Ataque: ${cartaJugador1.ataque}</p>
        <p>Defensa: ${cartaJugador1.defensa}</p>
        <p>Salud: ${cartaJugador1.salud}</p>
      </div>`;
    cartasJugador1.innerHTML += cartaHtmlJugador1;

    const cartaJugador2 = cartas.splice(Math.floor(Math.random() * cartas.length), 1)[0];
    const cartaHtmlJugador2 = `
      <div class="carta" data-index="${i}" onclick="seleccionarCarta(event, 2)">
        <img src="${cartaJugador2.imagen}" alt="${cartaJugador2.nombre}">
        <p>${cartaJugador2.nombre}</p>
        <p>Ataque: ${cartaJugador2.ataque}</p>
        <p>Defensa: ${cartaJugador2.defensa}</p>
        <p>Salud: ${cartaJugador2.salud}</p>
      </div>`;
    cartasJugador2.innerHTML += cartaHtmlJugador2;
  }
}

function _seleccionarCarta(event, jugador) {
  const cartaSeleccionada = event.target;
  const cartasJugador = (jugador === 1) ? cartasJugador1 : cartasJugador2;

  cartasJugador.querySelectorAll('.carta').forEach(carta => carta.classList.remove('seleccionada'));
  cartaSeleccionada.classList.add('seleccionada');
}
seleccionarCarta = _seleccionarCarta;

function luchar() {
  const cartaJugador1 = cartasJugador1.querySelector('.seleccionada');
  const cartaJugador2 = cartasJugador2.querySelector('.seleccionada');

  if (!cartaJugador1 || !cartaJugador2) {
    alert('Cada jugador debe seleccionar exactamente una carta para luchar.');
    return;
  }
  console.log('a', cartaJugador1, cartaJugador2, cartasJugador1, cartasJugador2)

  // const indiceCartaJugador1 = parseInt(cartaJugador1.dataset.index);
  const indiceCartaJugador2 = parseInt(cartasJugador2.querySelector('.seleccionada').dataset.index);

  const nombre1 = cartaJugador1.querySelector('p').textContent;
  const nombre2 = cartaJugador2.querySelector('p').textContent;

  const cartaJugador1Datos = datosPersonajes.find(p => p.nombre === nombre1);
  const cartaJugador2Datos = datosPersonajes.find(p => p.nombre === nombre2);

  console.log(cartaJugador1Datos, cartaJugador2Datos)

  atacar(cartaJugador1Datos, cartaJugador2Datos);
}
function atacar(atacante, defensor) {
  defensor.salud -= atacante.ataque;

  alert(`${atacante.nombre} atacó a ${defensor.nombre}! 
    ${defensor.nombre} ahora tiene ${defensor.salud} puntos de vida.`);

  if (defensor.salud <= 0) {
    alert(`¡${atacante.nombre} ha ganado la batalla!`);
  } else {
    setTimeout(() => atacar(defensor, atacante), 1000); 
  }
}

botonLuchar.addEventListener('click', luchar);

iniciarJuego();
})();