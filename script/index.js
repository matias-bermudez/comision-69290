const jugador1 = {
    nick: prompt("Ingrese nombre del JUGADOR 1"),
    puntos: 0,
    cartas: ["vacio", "vacio", "vacio"],
    mano: true
};

const jugador2 = {
    nick: prompt("Ingrese nombre del JUGADOR 2"),
    puntos: 0,
    cartas: ["vacio", "vacio", "vacio"],
    mano: false
};

let mazo = [
            [1, 2, 3, 4, 5, 6, 7, 10, 11, 12], 
            [1, 2, 3, 4, 5, 6, 7, 10, 11, 12],
            [1, 2, 3, 4, 5, 6, 7, 10, 11, 12],
            [1, 2, 3, 4, 5, 6, 7, 10, 11, 12]
            ];

let muestra = "";

const reiniciarBaraja = (arr) => {
    arr.length = 0;
    arr.push([1, 2, 3, 4, 5, 6, 7, 10, 11, 12]);
    arr.push([1, 2, 3, 4, 5, 6, 7, 10, 11, 12]);
    arr.push([1, 2, 3, 4, 5, 6, 7, 10, 11, 12]);
    arr.push([1, 2, 3, 4, 5, 6, 7, 10, 11, 12]);
}

const getPaloRandom = () => {
    return Math.floor(Math.random() * 4);
}

const getNumeroRandom = () => {
    return Math.floor(Math.random() * 10);
}

const getCombinacionValida = (baraja) => {
    let palo;
    let nro;
    do {
        palo = getPaloRandom();
        nro = getNumeroRandom();
    } while (baraja[palo][nro] === -1);
    baraja[palo][nro] = -1;
    if (nro < 7) {
        nro ++;
    }   else nro += 3;

    return { palo, nro };
}

const repartirCarta = (jugador, baraja) => {
    let cartasRepartidas = 0;
    while (cartasRepartidas < 1) {
        let { palo, nro } = getCombinacionValida(baraja);
        switch (palo) {
            case 0: 
                jugador.cartas.push('O-' + nro);
                jugador.cartas.shift();
            break;
            case 1: 
                jugador.cartas.push('C-' + nro);
                jugador.cartas.shift();
            break;
            case 2: 
                jugador.cartas.push('E-' + nro);
                jugador.cartas.shift();
            break;
            case 3: 
                jugador.cartas.push('B-' + nro);
                jugador.cartas.shift();
            break;
        }
        cartasRepartidas++;
    }
}

const barajarRepartir = (jugador1, jugador2, baraja) => {
    if (jugador1.mano) {
        for (let i = 1; i <= 6; i++ ) {
            repartirCarta(jugador2, baraja);
            repartirCarta(jugador1, baraja);
        }
        jugador1.mano = false;
        jugador2.mano = true;
    } else {
        for (let i = 1; i <= 6; i++ ) {
            repartirCarta(jugador1, baraja);
            repartirCarta(jugador2, baraja);
        }
        jugador2.mano = false;
        jugador1.mano = true;
    }
}








