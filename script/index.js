const jugador1 = {
    nick: '',
    puntos: 0,
    cartas: ["vacio", "vacio", "vacio"],
    mano: true,
    puntosPartido: 0,
};

const jugador2 = {
    nick: '',
    puntosMano: 0,
    cartas: ["vacio", "vacio", "vacio"],
    mano: false,
    puntosPartido: 0,
};

let nickJ1 = document.getElementById('nombreJ1');
let nickJ2 = document.getElementById('nombreJ2');
let boton = document.getElementById('boton');

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

const muestra = new Carta(-1, -1);

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

const valoresConMuestra = () => {
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

const reiniciarValores = () => {
    valores.length = 0;
    valores.push([8, 9, 10, 1, 2, 3, 4, 5, 6, 7]); 
    valores.push([8, 9, 10, 1, 2, 3, 4, 5, 6, 7]);
    valores.push([8, 9, 10, 1, 2, 3, 4, 5, 6, 7]);
    valores.push([8, 9, 10, 1, 2, 3, 4, 5, 6, 7]);
}

let mazo = [
            [1, 2, 3, 4, 5, 6, 7, 10, 11, 12], 
            [1, 2, 3, 4, 5, 6, 7, 10, 11, 12],
            [1, 2, 3, 4, 5, 6, 7, 10, 11, 12],
            [1, 2, 3, 4, 5, 6, 7, 10, 11, 12]
            ];

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
const repartirCartaJ1 = (jugador) => {
    carta = getCombinacionValida();
    jugador.cartas.push(carta);
    jugador.cartas.shift();
    const contenedor = document.createElement("div");
    const numero = document.createElement("h3");
    const palo = document.createElement("h3");

    contenedor.classList.add("carta");
    numero.classList.add("numero");
    palo.classList.add("palo");

    numero.textContent = carta.getNumero();
    palo.textContent = carta.getPalo();

    contenedor.appendChild(palo);
    contenedor.appendChild(numero)

    const destino = document.querySelector("body .mesa-juego .cartas .jugador1");
    destino.appendChild(contenedor);
}

const repartirCartaJ2 = (jugador) => {
    carta = getCombinacionValida();
    jugador.cartas.push(carta);
    jugador.cartas.shift();

    const contenedor = document.createElement("div");
    const numero = document.createElement("h3");
    const palo = document.createElement("h3");

    contenedor.classList.add("carta");
    numero.classList.add("numero");
    palo.classList.add("palo");

    numero.textContent = carta.getNumero();
    palo.textContent = carta.getPalo();

    contenedor.appendChild(palo);
    contenedor.appendChild(numero)

    const destino = document.querySelector("body .mesa-juego .cartas .jugador2");
    destino.appendChild(contenedor);
}

const irAlMazo = (jugador1, jugador2) => {
    console.log(jugador1.nick+ ": Me voy al mazo");
    reiniciarMano(jugador1, jugador2);
    reiniciarMazo();
}

const stringCarta = (carta) => {
    return carta.numero + " de " + carta.palo;
}

// Reparte 1 carta a cada jugador hasta tener 3 cartas c/u. Retorna la muestra.
const barajarRepartir = (jugador1, jugador2) => {
    if (jugador1.mano) {
        for (let i = 1; i <= 6; i++ ) {
            repartirCartaJ2(jugador2);
            repartirCartaJ1(jugador1);
        }
    } else {
        for (let i = 1; i <= 6; i++ ) {
            repartirCartaJ1(jugador1);
            repartirCartaJ2(jugador2);
        }
    }
    aux = getCombinacionValida();
    muestra.palo = aux.getPalo();
    muestra.numero = aux.getNumero();
    return 0;
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

const compararValores = (jugador1, jugador2, cartaj1, cartaj2, valores) => {
    if(valores[traduccionPaloInverso(cartaj1.palo)][traduccionNumero(cartaj1.numero)] <
        valores[traduccionPaloInverso(cartaj2.palo)][traduccionNumero(cartaj2.numero)] ) {
            jugador2.puntos++;
            return 2;
        } else {
            jugador1.puntos++;
            return 1;
        }
}

const jugarManoAMano = (jugador1, jugador2, fn) => {
    let jugadaJ1 = 1;
    let jugadaJ2 = 1;
    jugadaJ2 = jugarCarta(jugador2);
    if (jugadaJ2 === 0) {
        jugador1.puntosPartido++;
        return 0;
    } else {
        console.log("La carta jugada por " + jugador2.nick + " es " + stringCarta(jugador2.cartas[jugadaJ2 - 1]));
        console.log("");
        const CartaJ2 = new Carta((jugador2.cartas[jugadaJ2 - 1].palo), (jugador2.cartas[jugadaJ2 - 1].numero));
        jugador2.cartas.splice(jugadaJ2 - 1, 1);
        jugadaJ1 = jugarCarta(jugador1);
        if (jugadaJ1 === 0) {
            jugador2.puntosPartido++;
            irAlMazo(jugador1, jugador2);
        } else {
            console.log("La carta jugada por " + jugador1.nick + " es " + stringCarta(jugador1.cartas[jugadaJ1 - 1]));
            console.log("");
            const CartaJ1 = new Carta((jugador1.cartas[jugadaJ1 - 1].palo), (jugador1.cartas[jugadaJ1 - 1].numero));
            jugador1.cartas.splice(jugadaJ1 - 1, 1);
            return fn(jugador1, jugador2, CartaJ1, CartaJ2, valores);
        }
    }
}

//Jugamos la mano, actualmente solo muestra las cartas de cada jugador y da la opcion de jugar una carta
// o irse al mazo terminando la mano. No esta implementado sistema de puntos.
const jugarMano = (jugador1, jugador2) => {
    let caso = -1;
    let cantIteraciones = 1;
    barajarRepartir(jugador1, jugador2);
    valoresConMuestra();
    console.log("La muestra es: " + muestra.getNumero() + " de " + muestra.getPalo());
    if(jugador1.mano) {
        while((cantIteraciones <= 3) && !(caso === 0)) {
            caso = jugarManoAMano(jugador1, jugador2, compararValores);
            if(jugador1.puntos === 2) {
                jugador1.puntosPartido++;
                console.log("j1 gano mano");
                break;
            } else if(jugador2.puntos === 2) {
                jugador2.puntosPartido++;
                console.log("j2 gano mano");
                break;
            }
            cantIteraciones++;
        }
        jugador1.mano = false;
        jugador2.mano = true;
    } else {
        while((cantIteraciones <= 3) && !(caso === 0)) {
            caso = jugarManoAMano(jugador2, jugador1, compararValores);
            if(jugador2.puntos === 2) {
                jugador2.puntosPartido++;
                console.log("j2 gano mano");
                break;
            } else if(jugador1.puntos === 2) {
                jugador1.puntosPartido++;
                console.log("j1 gano mano");
                break;
            }
            cantIteraciones++;
        }
        jugador1.mano = true;
        jugador2.mano = false;
    }
    irAlMazo(jugador1, jugador2);
    reiniciarValores();
}

const jugarPartido = (jugador1, jugador2) => {
    while(jugador1.puntosPartido < 2 && jugador2.puntosPartido < 2) {
        jugarMano(jugador1, jugador2);
    }
    console.log("¡Buen partido!"); 
}

boton.addEventListener("click", function(){
    jugador1.nick = nickJ1.value;
    jugador2.nick = nickJ2.value;
    jugarPartido(jugador1, jugador2);
})







