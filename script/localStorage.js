class Carta {
    static id = 0;
    constructor (palo, numero) {
        this.id = Carta.id++;
        this.palo = palo,
        this.numero = numero;
    }
}

const Muestra = new Carta("", -1);

const jugador1 = {
    nick: "",
    puntosMano: 0,
    cartas: [],
    puntosPartido: 0,
    jugada: new Carta("", -1),
    mano: true,
};

const jugador2 = {
    nick: "",
    puntosMano: 0,
    cartas: [],
    puntosPartido: 0,
    jugada: new Carta("", -1),
    mano: false,
};

const cargarLocalStorage = () => {
    if(!localStorage.getItem('player1')) {
        localStorage.setItem('player1', JSON.stringify(jugador1));
    }
    if(!localStorage.getItem('player2')) {
        localStorage.setItem('player2', JSON.stringify(jugador2));
    }
    if(!localStorage.getItem('muestra')) {
        localStorage.setItem('muestra', JSON.stringify(Muestra));
    }
}

const actualizarLocalStorage = (player1, player2) => {
    localStorage.setItem('player1', JSON.stringify(player1));
    localStorage.setItem('player2', JSON.stringify(player2));
}

const obtenerJugador1LocalStorage = () => {
    return JSON.parse(localStorage.getItem('player1'));
}

const obtenerJugador2LocalStorage = () => {
    return JSON.parse(localStorage.getItem('player2'));
}

const obtenerMuestraLocalStorage = () => {
    return JSON.parse(localStorage.getItem('muestra'));
}

const actualizarMuestraLocalStorage = (muestra) => {
    localStorage.setItem('muestra', JSON.stringify(muestra));
}

const vaciarLocalStorage = () => {
    localStorage.removeItem('muestra');
    localStorage.removeItem('player1');
    localStorage.removeItem('player2');
}
