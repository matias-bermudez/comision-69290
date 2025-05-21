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