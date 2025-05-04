const jugador1 = {
    nick: '',
    puntosMano: 0,
    cartas: [],
    puntosPartido: 0,
};

const jugador2 = {
    nick: '',
    puntosMano: 0,
    cartas: [],
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

const Mesa = {
    jugadas: ["", ""],
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
            [8, 9, 10, 1, 2, 3, 11, 5, 6, 7], 
            [8, 9, 10, 1, 2, 3, 4, 5, 6, 7],
            [14, 9, 10, 1, 2, 3, 12, 5, 6, 7],
            [13, 9, 10, 1, 2, 3, 4, 5, 6, 7]
            ];

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
}

const reiniciarPtosMano = (j1, j2) => {
    j1.puntosMano = 0;
    j2.puntosMano = 0;
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

const irAlMazo = (jugador1, jugador2) => {
    reiniciarMano(jugador1, jugador2);
    reiniciarMazo();
}

const stringCarta = (carta) => {
    return carta.numero + " de " + carta.palo;
}

// Reparte 1 carta a cada jugador hasta tener 3 cartas c/u.
const barajarRepartir = (jugador1, jugador2) => {
    for (let i = 1; i <= 3; i++ ) {
        repartirCarta(jugador2);
        repartirCarta(jugador1);
    }
    return 0;
}

const compararValores = (jugador1, jugador2, cartaj1, cartaj2) => {
    
    if(valores[traduccionPaloInverso(cartaj1.palo)][traduccionNumero(cartaj1.numero)] <=
        valores[traduccionPaloInverso(cartaj2.palo)][traduccionNumero(cartaj2.numero)] ) {
            console.log("entro j2 suma")
            jugador2.puntosMano++;
            return 0;
        } else {
            console.log("entro j1 suma")
            jugador1.puntosMano++;
            return 0;
        }
}

const noJugoJ2 = () => {
    const paloj2 = document.getElementById('paloj2').innerText;
    const numeroj2 = document.getElementById('numeroj2').innerText;
    if(paloj2 === "" || numeroj2 ==="") {
        return true;
    } else return false;
}

const noJugoJ1 = () => {
    const paloj1 = document.getElementById('paloj1').innerText;
    const numeroj1 = document.getElementById('numeroj1').innerText;
    if(paloj1 === "" || numeroj1 === "") {
        return true;
    } else return false;
}

const vaciarCartas = () => {
    const contenedor1 = document.querySelector('.mesa-juego .cartas .jugadores .jugador1');
    contenedor1.innerHTML= ``;
    const contenedor2 = document.querySelector('.mesa-juego .cartas .jugadores .jugador2');
    contenedor2.innerHTML= ``;
}

const actualizarPuntuacion = (jugador1, jugador2) => {
    const puntuacion = document.getElementById('puntos');
    puntuacion.innerText=`${jugador1.nick}: ${jugador1.puntosPartido} - ${jugador2.nick}: ${jugador2.puntosPartido}`;
} 

const vaciarCartasJugadas = () => {
    const paloj1 = document.getElementById('paloj1');
    paloj1.textContent = "";
    const numeroj1 = document.getElementById('numeroj1');
    numeroj1.textContent = "";

    const paloj2 = document.getElementById('paloj2');
    paloj2.textContent = "";
    const numeroj2 = document.getElementById('numeroj2');
    numeroj2.textContent = "";
}

const eliminarCarta = (jugador, carta, fn) => {
    let contador = 0;
    let id = 0;
    jugador.cartas.forEach(cartaAct => {
        if(cartaAct.getPalo() == carta.getPalo() && cartaAct.getNumero() == carta.getNumero()) {
            id = contador;
        } else {
            contador++;
        }
    });
    jugador.cartas.splice(id, 1);
    fn();
}

const jugadorGano = (jugador) => {
    if(jugador.puntosPartido == 2) {
        return true;
    } else {
        return false;
    }
}

const imprimirCartas = (jugador1, jugador2) => {
    actualizarPuntuacion(jugador1, jugador2);
    jugador1.cartas.forEach(carta => {
        const card = document.createElement("div");
        card.classList.add("carta");
        card.innerHTML=`
            <h3 class="palo">${carta.getPalo()}</h3>
            <h3 class="numero">${carta.getNumero()}</h3>
            <button id="${carta.getPalo()}${carta.getNumero()}">Jugar</button>
        `
        const destino = document.querySelector("body .mesa-juego .cartas .jugadores .jugador1");
        destino.appendChild(card);
        const boton = document.getElementById(`${carta.getPalo()}${carta.getNumero()}`);
        boton.addEventListener("click", () => {
            let palo = document.getElementById('paloj1');
            let numero = document.getElementById('numeroj1');
            if(palo.innerText == "" && numero.innerText == "") {
                palo.innerText = carta.getPalo();
                numero.innerText = carta.getNumero();
                const CartaJugada = new Carta(palo.innerText, parseInt(numero.innerText));
                eliminarCarta(jugador1, CartaJugada, vaciarCartas);
                imprimirCartas(jugador1, jugador2);
                if(!noJugoJ2()) {
                    let palo2 = document.getElementById('paloj2');
                    let numero2 = document.getElementById('numeroj2');
                    const cartaj2 = new Carta(palo2.innerText, parseInt(numero2.innerText));
                    compararValores(jugador1, jugador2, CartaJugada, cartaj2);
                    vaciarCartasJugadas();
                }
            }
        });
    });
    jugador2.cartas.forEach(carta => {
        const card = document.createElement("div");
        card.classList.add("carta");
        card.innerHTML=`
            <h3 class="palo">${carta.getPalo()}</h3>
            <h3 class="numero">${carta.getNumero()}</h3>
            <button id="${carta.getPalo()}${carta.getNumero()}">Jugar</button>
        `
        const destino = document.querySelector("body .mesa-juego .cartas .jugadores .jugador2");
        destino.appendChild(card);
        const boton = document.getElementById(`${carta.getPalo()}${carta.getNumero()}`);
        boton.addEventListener("click", () => {
            let palo = document.getElementById('paloj2');
            let numero = document.getElementById('numeroj2');
            if(palo.innerText == "" && numero.innerText == "") {
                palo.innerText = carta.getPalo();
                numero.innerText = carta.getNumero();
                const CartaJugada = new Carta(palo.innerText, parseInt(numero.innerText));
                eliminarCarta(jugador2, CartaJugada, vaciarCartas);
                imprimirCartas(jugador1, jugador2);
                if(!noJugoJ1()) {
                    let palo1 = document.getElementById('paloj1');
                    let numero1 = document.getElementById('numeroj1');
                    const cartaj1 = new Carta(palo1.innerText, parseInt(numero1.innerText));
                    compararValores(jugador1, jugador2, cartaj1, CartaJugada);
                    vaciarCartasJugadas();
                }
            }
        });
    });
    if(jugador1.cartas.length === 0 && jugador2.cartas.length === 0) {
        if(!(jugador1.puntosMano + jugador2.puntosMano == 3)){
            let palo1 = document.getElementById('paloj1');
            let numero1 = document.getElementById('numeroj1');
            const cartaj1 = new Carta(palo1.innerText, parseInt(numero1.innerText));
            let palo2 = document.getElementById('paloj2');
            let numero2 = document.getElementById('numeroj2');
            const cartaj2 = new Carta(palo2.innerText, parseInt(numero2.innerText));
            compararValores(jugador1, jugador2, cartaj1, cartaj2);
        }
        if(!jugadorGano(jugador1) && !jugadorGano(jugador2)) {
            console.log(jugador1.puntosMano + " J1")
            console.log(jugador2.puntosMano + " J2")

            if(jugador1.puntosMano >= 2) {
                jugador1.puntosPartido++;
                actualizarPuntuacion(jugador1, jugador2);
            } else if(jugador2.puntosMano >= 2) {
                jugador2.puntosPartido++
                actualizarPuntuacion(jugador1, jugador2);
            }
            reiniciarPtosMano(jugador1, jugador2); 
            if(!jugadorGano(jugador1) && !jugadorGano(jugador2)) {
                barajarRepartir(jugador1, jugador2);
                imprimirCartas(jugador1, jugador2);
            } else {
                const marcador = document.getElementById('puntos');
                if(jugadorGano(jugador1)) {
                    marcador.innerText = `Ganó ${jugador1.nick}, fin del partido.`
                } else {
                    marcador.innerText = `Ganó ${jugador2.nick}, fin del partido.`
                }
            }
        }
    }
}

const jugarPartido = (jugador1, jugador2) => {
    jugador1.puntosPartido = 0;
    jugador2.puntosPartido = 0;
    jugador1.puntosMano = 0;
    jugador2.puntosMano = 0;
    actualizarPuntuacion(jugador1, jugador2);
    barajarRepartir(jugador1, jugador2);
    imprimirCartas(jugador1, jugador2);
}

boton.addEventListener("click", function(event){
    event.preventDefault();
    jugador1.nick = nickJ1.value;
    jugador2.nick = nickJ2.value;
    jugarPartido(jugador1, jugador2);
})

