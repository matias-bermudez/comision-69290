const vaciarReglas = () => {
    const reglas = document.querySelector("body .mesa-juego .cartas .reglas");
    reglas.innerHTML = ``;
}

const vaciarCartas = () => {
    const contenedor1 = document.querySelector(".mesa-juego .cartas .jugadores .jugador1");
    contenedor1.innerHTML = ``;
    const contenedor2 = document.querySelector(".mesa-juego .cartas .jugadores .jugador2");
    contenedor2.innerHTML = ``;
}

const vaciarCartasMesaJ1 = () => {
    const cartas = document.querySelector("body .mesa-juego .cartas .jugadores .jugador1");
    cartas.innerHTML = ``;
}

const vaciarPuntuacion = () => {
    let puntuacion = document.getElementById('puntos');
    puntuacion.innerText = `0 - 0`;
}

const vaciarCartasMesaJ2 = () => {
    const cartas = document.querySelector("body .mesa-juego .cartas .jugadores .jugador2");
    cartas.innerHTML = ``;
}

const vaciarMuestra = () => {
    let paloMuestra = document.getElementById('paloMuestra');
    let numeroMuestra = document.getElementById('numeroMuestra');
    paloMuestra.innerText = `Muestra`;
    numeroMuestra.innerText = ``;
}

const vaciarCartasMesa = () => {
    vaciarCartasMesaJ1();
    vaciarCartasMesaJ2();
    vaciarMuestra();
}

const vaciarCartasJugadas = (fn) => {
    const paloj1 = document.getElementById('paloj1');
    paloj1.textContent = "";
    const numeroj1 = document.getElementById('numeroj1');
    numeroj1.textContent = "";
    const paloj2 = document.getElementById('paloj2');
    paloj2.textContent = "";
    const numeroj2 = document.getElementById('numeroj2');
    numeroj2.textContent = "";
    let jug1 = obtenerJugador1LocalStorage();
    let jug2 = obtenerJugador2LocalStorage()
    fn(jug1, jug2);
    actualizarLocalStorage(jug1, jug2);
}

const reiniciarJugadores = () => {
    let jug1 = obtenerJugador1LocalStorage();
    jug1.nick = "";
    jug1.puntosMano = 0;
    jug1.cartas = [];
    jug1.puntosPartido = 0;
    jug1.jugada = new Carta("", -1);
    let jug2 = obtenerJugador2LocalStorage();
    jug2.nick = "";
    jug2.puntosMano = 0;
    jug2.cartas = [];
    jug2.puntosPartido = 0;
    jug2.jugada = new Carta("", -1);
    actualizarLocalStorage(jug1, jug2);
}

const reiniciarMuestra = () => {
    let muestra = obtenerMuestraLocalStorage();
    muestra.palo = "";
    muestra.numero = -1;
    actualizarMuestraLocalStorage(muestra);
}

const reiniciarCartasJugadas = (jug1, jug2) => {
    jug1.jugada.palo = "";
    jug1.jugada.numero = -1;
    jug2.jugada.palo = "";
    jug2.jugada.numero = -1;
}

const reiniciarMazo = () => {
    mazo.length = 0;
    mazo.push([1, 2, 3, 4, 5, 6, 7, 10, 11, 12]);
    mazo.push([1, 2, 3, 4, 5, 6, 7, 10, 11, 12]);
    mazo.push([1, 2, 3, 4, 5, 6, 7, 10, 11, 12]);
    mazo.push([1, 2, 3, 4, 5, 6, 7, 10, 11, 12]);
}

const reiniciarMano = (jugador1, jugador2) => {
    jugador1.cartas.length = 0;
    jugador2.cartas.length = 0;
}

const reiniciarPtosMano = () => {
    let j1 = obtenerJugador1LocalStorage();
    let j2 = obtenerJugador2LocalStorage();
    j1.puntosMano = 0;
    j2.puntosMano = 0;
    actualizarLocalStorage(j1, j2);
}

const reiniciarPtosPartido = () => {
    let j1 = obtenerJugador1LocalStorage();
    let j2 = obtenerJugador2LocalStorage();
    j1.puntosPartido = 0;
    j2.puntosPartido = 0;
    actualizarLocalStorage(j1, j2);
}