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

let muestra = "";

let mazo = [
            [1, 2, 3, 4, 5, 6, 7, 10, 11, 12], 
            [1, 2, 3, 4, 5, 6, 7, 10, 11, 12],
            [1, 2, 3, 4, 5, 6, 7, 10, 11, 12],
            [1, 2, 3, 4, 5, 6, 7, 10, 11, 12]
            ];

const reiniciarBaraja = (arr) => {
    arr.length = 0;
    arr.push([1, 2, 3, 4, 5, 6, 7, 10, 11, 12]);
    arr.push([1, 2, 3, 4, 5, 6, 7, 10, 11, 12]);
    arr.push([1, 2, 3, 4, 5, 6, 7, 10, 11, 12]);
    arr.push([1, 2, 3, 4, 5, 6, 7, 10, 11, 12]);
}

//Son la cantidad de espacios que hay en el contorno de cada tipo de palo.
const traduccionPalo = (palo) => {
    switch (palo) {
        case 0: 
            return 'O';
        break;
        case 1: 
            return 'C';
        break;
        case 2:
            return 'E';
        break;
        case 3: 
            return 'B';
        break;
    }
}

//Retorna valor del 0 al 3. 
const getPaloRandom = () => {
    return Math.floor(Math.random() * 4);
}

//Retorna valor del 0 al 9 de forma aleatoria. (1 al 7 y de 10 al 12 en cuanto a las cartas)
const getNumeroRandom = () => {
    return Math.floor(Math.random() * 10);
}

//Obtiene una carta no repartida anteriormente.
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

// Reparte 1 carta a jugador.
const repartirCarta = (jugador, baraja) => {
    let { palo, nro } = getCombinacionValida(baraja);
    palo = traduccionPalo(palo);
    jugador.cartas.push(palo + '-' + nro);
    jugador.cartas.shift();
    cartasRepartidas++;
}


// Reparte 1 carta a cada jugador hasta tener 3 c/u. Retorna 
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








