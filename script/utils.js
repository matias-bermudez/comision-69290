//Funciones para limpiar pantalla.
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

const vaciarCartasJugadas = (fn) => {
    const paloj1 = document.getElementById('paloj1');
    const paloj2 = document.getElementById('paloj2');
    const numeroj2 = document.getElementById('numeroj2');
    const numeroj1 = document.getElementById('numeroj1');
    paloj1.textContent = "";
    numeroj1.textContent = "";
    paloj2.textContent = "";
    numeroj2.textContent = "";
    let jug1 = obtenerJugador1LocalStorage();
    let jug2 = obtenerJugador2LocalStorage()
    fn(jug1, jug2);
    actualizarLocalStorage(jug1, jug2);
}

//Funciones de reinicio.
const reiniciarMazo = () => {
    mazo.length = 0;
    mazo.push([1, 2, 3, 4, 5, 6, 7, 10, 11, 12]);
    mazo.push([1, 2, 3, 4, 5, 6, 7, 10, 11, 12]);
    mazo.push([1, 2, 3, 4, 5, 6, 7, 10, 11, 12]);
    mazo.push([1, 2, 3, 4, 5, 6, 7, 10, 11, 12]);
}

const reiniciarPtosMano = () => {
    let j1 = obtenerJugador1LocalStorage();
    let j2 = obtenerJugador2LocalStorage();
    j1.puntosMano = 0;
    j2.puntosMano = 0;
    actualizarLocalStorage(j1, j2);
}

const reiniciarMano = () => {
    let jug1 = obtenerJugador1LocalStorage();
    let jug2 = obtenerJugador2LocalStorage();
    jug1.cartas = [];
    jug2.cartas = [];
    actualizarLocalStorage(jug1, jug2);
    reiniciarPtosMano();
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

const reiniciarPtosPartido = () => {
    let j1 = obtenerJugador1LocalStorage();
    let j2 = obtenerJugador2LocalStorage();
    j1.puntosPartido = 0;
    j2.puntosPartido = 0;
    actualizarLocalStorage(j1, j2);
}

//Repartir cartas equiprobablemente - Facilitar acceso a valores y mazo.
//La asignacion esta justificada por la cantidad de espacios que tiene cada carta en sus contorno.
const traduccionPalo = (palo) => {
    switch (palo) {
        case 0: 
            return 'Oro';
        break;
        case 1: 
            return 'Copa';
        break;
        case 2:
            return 'Espada';
        break;
        case 3: 
            return 'Basto';
        break;
    }
}

//Ayuda a acceder al valor correcto en la matriz "valores".
const traduccionPaloInverso = (palo) => {
    switch (palo) {
        case 'Oro': 
            return 0;
        case 'Copa': 
            return 1;
        case 'Espada':
            return 2;
        case 'Basto': 
            return 3;
    }
}

//Ayuda a acceder al valor correcto en la matriz "valores".
const traduccionNumero = (numero) => {
    if ( numero <= 7) {
        return numero - 1;
    } else {
        return numero - 3;
    }
}

//Retorna valor del 0 al 3. (4 posibles palos) 
const getPaloRandom = () => {
    return Math.floor(Math.random() * 4);
}

//Retorna valor del 0 al 9 de forma aleatoria. (1 al 7 y de 10 al 12 en cuanto a las cartas)
const getNumeroRandom = () => {
    return Math.floor(Math.random() * 10);
}

//Obtiene una carta no repartida anteriormente.
const getCombinacionValida = () => {
    let palo;
    let numero;
    do {
        palo = getPaloRandom();
        numero = getNumeroRandom();
    } while (mazo[palo][numero] === -1);
    mazo[palo][numero] = -1;
    if (numero < 7) {
        numero ++;
    }   else numero += 3;
    palo = traduccionPalo(palo);
    return new Carta(palo, numero);
}

// Reparte una carta a un jugador.
const repartirCarta = (jugador) => {
    const carta = getCombinacionValida();
    jugador.cartas.push(carta);
}

//Control de estado de juego.
const noJugoJ2 = () => {
    let jug2 = obtenerJugador2LocalStorage();
    if(jug2.jugada.palo === "") {
        return true;
    }   else return false;
}

const noJugoJ1 = () => {
    let jug1 = obtenerJugador1LocalStorage();
    if(jug1.jugada.palo === "") {
        return true;
    }   else return false;
}

const noHayCartaJugadaJ1 = () => {
    const palo = document.getElementById('paloj1');
    const numero = document.getElementById('numeroj1');
    if(palo.innerText == "" && numero.innerText == "") {
        return true;
    } else return false;
}

const noHayCartaJugadaJ2 = () => {
    const palo = document.getElementById('paloj2');
    const numero = document.getElementById('numeroj2');
    if(palo.innerText == "" && numero.innerText == "") {
        return true;
    } else return false;
}

const hayCartasEnJuego = () => {
    const destinoJ1 = document.querySelector("body .mesa-juego .cartas .jugadores .jugador1");
    const destinoJ2 = document.querySelector("body .mesa-juego .cartas .jugadores .jugador2");
    if(destinoJ1.children.length > 0 || destinoJ2.children.length > 0) {
        return true;
    }   else return false;
}

const jugadorGano = (jugador) => {
    if(jugador.puntosPartido == 2) {
        return true;
    } else {
        return false;
    }
}

const partidoTerminado = () => {
    let jug1 = obtenerJugador1LocalStorage();
    let jug2 = obtenerJugador2LocalStorage();
    return (jugadorGano(jug1) || jugadorGano(jug2));
}