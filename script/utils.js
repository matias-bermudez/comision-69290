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
    const puntuacion = document.getElementById('puntos');
    puntuacion.innerHTML = `0 - 0`;
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