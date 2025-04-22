console.log("¡Bienvenido a Truco Uruguayo!");
alert("Ahora va el prompt del jugador 1");

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
    puntosPartido: 0,
};

const jugador2 = {
    nick: nickJ2,
    puntosMano: 0,
    cartas: ["vacio", "vacio", "vacio"],
    mano: false,
    puntosPartido: 0,
};

let muestra = "";

class Carta {
    static id = 0;
    constructor (palo, numero) {
        this.id = Carta.id++;
        this.palo = palo,
        this.numero = numero;
    }
    getPalo = () => {
        return this.palo;
    }
    getNumero = () => {
        return this.numero;
    }
}

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
        break;
        case 'Copa': 
            return 1;
        break;
        case 'Espada':
            return 2;
        break;
        case 'Basto': 
            return 3;
        break;
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

let valores = [
            [8, 9, 10, 1, 2, 3, 4, 5, 6, 7], 
            [8, 9, 10, 1, 2, 3, 4, 5, 6, 7],
            [8, 9, 10, 1, 2, 3, 4, 5, 6, 7],
            [8, 9, 10, 1, 2, 3, 4, 5, 6, 7]
            ];

const valoresConMuestra = (muestra, valores) => {
    const palo = traduccionPaloInverso(muestra.getPalo());
    const numero = muestra.getNumero();
    valores[palo][traduccionNumero(2)] = 19;
    valores[palo][traduccionNumero(4)] = 18;
    valores[palo][traduccionNumero(5)] = 17;
    valores[palo][traduccionNumero(11)] = 16;
    valores[palo][traduccionNumero(10)] = 15;
    if ((numero == 2) || (numero == 4) || (numero == 5) || (numero == 10) || (numero == 11)) {
        switch (palo) {
            case 0:
                valores[0][traduccionNumero(12)] = valores[0][traduccionNumero(numero)];
                break;
            case 1:
                valores[1][traduccionNumero(12)] = valores[1][traduccionNumero(numero)];
                break;
            case 2:
                valores[2][traduccionNumero(12)] = valores[2][traduccionNumero(numero)];
                break;
            case 3:
                valores[3][traduccionNumero(12)] = valores[3][traduccionNumero(numero)];
                break;
        }
    }
}

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

const reiniciarMano = (jugador1, jugador2) => {
    jugador1.cartas.length = 0;
    jugador2.cartas.length = 0;
    for (let i = 1; i <= 3; i++) {
        jugador1.cartas.push("");
        jugador2.cartas.push("");
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
    let numero;
    do {
        palo = getPaloRandom();
        numero = getNumeroRandom();
    } while (baraja[palo][numero] === -1);
    baraja[palo][numero] = -1;
    if (numero < 7) {
        numero ++;
    }   else numero += 3;
    palo = traduccionPalo(palo);
    return new Carta(palo, numero);
}

// Reparte una carta a un jugador.
const repartirCarta = (jugador, baraja) => {
    jugador.cartas.push(getCombinacionValida(baraja));
    jugador.cartas.shift();
}

const irAlMazo = (jugador1, jugador2) => {
    console.log(jugador1.nick+ ": Me voy al mazo");
    reiniciarMano(jugador1, jugador2);
}

const stringCarta = (carta) => {
    return carta.numero + " de " + carta.palo;
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
    return getCombinacionValida(mazo);
}

//Funcion que selecciona la carta a jugar por jugador.
const jugarCarta = (jugador) => {
    console.log("Juega " + jugador.nick);
    console.log("Selecciona 0: Me voy al mazo");
    let contador = 1;
    for (let carta of jugador.cartas) {
        console.log("Selecciona " + contador + ": Jugar " + stringCarta(carta));
        contador++
    }
    let opcion = parseInt(prompt("Seleccione jugada."));
    while (opcion < 0 || opcion > jugador.cartas.length || isNaN(opcion)) {
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
    console.log("La muestra es: " + muestra.numero + " de " + muestra.palo);
    //let valores = generarValores(muestra);
    if(jugador1.mano) {
        while( (jugadaJ1 !== 0) && (cantIteraciones <= 3) ) {
            jugadaJ2 = jugarCarta(jugador2);
            if (jugadaJ2 === 0) {
                irAlMazo(jugador2, jugador1);
                break;
            } else {
                console.log("La carta jugada por " + jugador2.nick + " es " + stringCarta(jugador2.cartas[jugadaJ2 - 1]));
                console.log("");
                jugador2.cartas.splice(jugadaJ2 - 1, 1);
                jugadaJ1 = jugarCarta(jugador1);
                if (jugadaJ1 === 0) {
                    irAlMazo(jugador1, jugador2);
                } else {
                    console.log("La carta jugada por " + jugador1.nick + " es " + stringCarta(jugador1.cartas[jugadaJ1 - 1]));
                    console.log("");
                    jugador1.cartas.splice(jugadaJ1 - 1, 1);
                }
            }
            cantIteraciones++;
        }
    } else {
        while( (jugadaJ2 !== 0) && (cantIteraciones <= 3) ) {
            jugadaJ1 = jugarCarta(jugador1);
            if (jugadaJ1 === 0) {
                irAlMazo(jugador1, jugador2);
                break;
            } else {
                console.log("La carta jugada por " + jugador1.nick + "es " + stringCarta(jugador1.cartas[jugadaJ1 - 1]));
                console.log("");
                jugador1.cartas.splice(jugadaJ1 - 1, 1);
                jugadaJ2 = jugarCarta(jugador2);
                if (jugadaJ2 === 0) {
                    irAlMazo(jugador2, jugador1);
                } else {
                    console.log("La carta jugada por " + jugador2.nick + "es " + stringCarta(jugador2.cartas[jugadaJ2 - 1]));
                    console.log("");
                    jugador2.cartas.splice(jugadaJ2 - 1, 1);
                }
            }
            cantIteraciones++;
        }
    }
    if (!((jugadaJ2 === 0) || (jugadaJ1 === 0))) {
        reiniciarMano(jugador1, jugador2);
    }
}
/*reiniciarMazo(mazo);
muestra = barajarRepartir(jugador1, jugador2, mazo);
jugarMano(jugador1, jugador2, muestra);
reiniciarMazo(mazo); */

const muestraTest = new Carta('Oro', 6);
valoresConMuestra(muestraTest, valores);
if ((valores[0][traduccionNumero(4)]) > (valores[0][traduccionNumero(2)])) {
    console.log("hola");
}
//console.log("¡Buen partido!"); 

