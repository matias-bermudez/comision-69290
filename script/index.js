let nickJ1 = prompt("Ingrese nombre del JUGADOR 1");
let nickJ2 = prompt("Ingrese nombre del JUGADOR 2")
while (nickJ1 === null) {
    nickJ1 = prompt("Ingrese nombre del JUGADOR 1")
}

while (nickJ2 === null) {
    nickJ2 = prompt("Ingrese nombre del JUGADOR 2")
}

const jugador1 = {
    nick: nickJ1,
    puntos: 0,
    cartas: ["vacio", "vacio", "vacio"],
    mano: true,
};

const jugador2 = {
    nick: nickJ2,
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

const reiniciarMazo = (arr) => {
    arr.length = 0;
    arr.push([1, 2, 3, 4, 5, 6, 7, 10, 11, 12]);
    arr.push([1, 2, 3, 4, 5, 6, 7, 10, 11, 12]);
    arr.push([1, 2, 3, 4, 5, 6, 7, 10, 11, 12]);
    arr.push([1, 2, 3, 4, 5, 6, 7, 10, 11, 12]);
}

//La asignacion esta justificada por la cantidad de espacios que tiene cada carta en sus contorno.
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

//Retorna valor del 0 al 3. (4 posibles palos) 
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
    palo = traduccionPalo(palo);
    return (palo + '-' + nro);
}

// Reparte una carta a un jugador.
const repartirCarta = (jugador, baraja) => {
    jugador.cartas.push(getCombinacionValida(baraja));
    jugador.cartas.shift();
}

// Reparte 1 carta a cada jugador hasta tener 3 cartas c/u. Retorna la muestra.
const barajarRepartir = (jugador1, jugador2, baraja) => {
    if (jugador1.mano) {
        for (let i = 1; i <= 6; i++ ) {
            repartirCarta(jugador2, baraja);
            repartirCarta(jugador1, baraja);
        }
    } else {
        for (let i = 1; i <= 6; i++ ) {
            repartirCarta(jugador1, baraja);
            repartirCarta(jugador2, baraja);
        }
    }
    let paloMuestra = getCombinacionValida(mazo);
    return paloMuestra;
}

//Funcion que selecciona la carta a jugar por jugador.
const jugarCarta = (jugador) => {
    console.log("Juega " + jugador.nick);
    console.log("Selecciona 0: Me voy al mazo");
    let contador = 1;
    for (let carta of jugador.cartas) {
        console.log("Selecciona " + contador + ": Jugar " + carta);
        contador++
    }
    let opcion = parseInt(prompt("Seleccione jugada."));
    while (opcion < 0 || opcion > 3 || isNaN(opcion)) {
        opcion = parseInt(prompt("Seleccione jugada valida"));
    }
    console.log("");
    return opcion;
}

//Jugamos la mano, actualmente solo muestra las cartas de cada jugador y da la opcion de jugar una carta
// o irse al mazo terminando la mano. No esta implementado sistema de puntos.
const jugarMano = (jugador1, jugador2, muestra) => {
    let jugadaJ1 = 1;
    let jugadaJ2 = 1;
    let cantIteraciones = 1;
    console.log("La muestra es: " + muestra);
    //let valores = generarValores(muestra);
    if(jugador1.mano) {
        while( (jugadaJ1 !== 0) && (cantIteraciones <= 3) ) {
            jugadaJ2 = jugarCarta(jugador2);
            if (jugadaJ2 === 0) {
                console.log(jugador2.nick+ ": Me voy al mazo");
                break;
            } else {
                console.log("La carta jugada por " + jugador2.nick + " es " + jugador2.cartas[jugadaJ2 -1]);
                jugadaJ1 = jugarCarta(jugador1);
                if (jugadaJ1 === 0) {
                    console.log(jugador1.nick + ": Me voy al mazo");
                } else {
                    console.log("La carta jugada por " + jugador1.nick + " es " + jugador1.cartas[jugadaJ1 -1]);
                }
            }
            cantIteraciones++;
        }
    } else {
        while( (jugadaJ2 !== 0) && (cantIteraciones <= 3) ) {
            jugadaJ1 = jugarCarta(jugador1);
            if (jugadaJ1 === 0) {
                console.log(jugador1.nick + ": Me voy al mazo");
                break;
            } else {
                console.log("La carta jugada por " + jugador1.nick + "es " + jugador1.cartas[jugadaJ1 -1]);
                jugadaJ2 = jugarCarta(jugador2);
                if (jugadaJ2 === 0) {
                    console.log(jugador2.nick + ": Me voy al mazo");
                } else {
                    console.log("La carta jugada por " + jugador2.nick + "es " + jugador2.cartas[jugadaJ2 -1]);
                }
            }
            cantIteraciones++;
        }
    }
}
reiniciarMazo(mazo);
muestra = barajarRepartir(jugador1, jugador2, mazo);
jugarMano(jugador1, jugador2, muestra);

console.log("¡Buen partido!");

