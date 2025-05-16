class Carta {
    static id = 0;
    constructor (palo, numero) {
        this.id = Carta.id++;
        this.palo = palo,
        this.numero = numero;
    }
}

const Muestra = new Carta("", -1);

const actualizarMuestraLocalStorage = (muestra) => {
    localStorage.setItem('muestra', JSON.stringify(muestra));
}

const obtenerMuestraLocalStorage = () => {
    return JSON.parse(localStorage.getItem('muestra'));
}

actualizarMuestraLocalStorage(Muestra);

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

const reiniciarJugadores = (jug1, jug2) => {
    jug1.nick = "";
    jug1.puntosMano = 0;
    jug1.cartas = [];
    jug1.puntosPartido = 0;
    jug1.jugada = new Carta("", -1);

    jug2.nick = "";
    jug2.puntosMano = 0;
    jug2.cartas = [];
    jug2.puntosPartido = 0;
    jug2.jugada = new Carta("", -1);
}

const reiniciarCartasJugadas = (jug1, jug2) => {
    jug1.jugada.palo = "";
    jug1.jugada.numero = -1;
    jug2.jugada.palo = "";
    jug2.jugada.numero = -1;
}

if (!localStorage.getItem('player1')) {
    localStorage.setItem('player1', JSON.stringify(jugador1));
}
if (!localStorage.getItem('player2')) {
    localStorage.setItem('player2', JSON.stringify(jugador2));
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

// Reparte 1 carta a cada jugador hasta tener 3 cartas c/u.
const barajarRepartir = () => {
    let jug1 = obtenerJugador1LocalStorage();
    let jug2 = obtenerJugador2LocalStorage();
    jug1.puntosMano = 0;
    jug2.puntosMano = 0;
    for (let i = 1; i <= 3; i++ ) {
        repartirCarta(jug2);
        repartirCarta(jug1);
    }
    let muestra = obtenerMuestraLocalStorage();
    muestra = getCombinacionValida();
    actualizarMuestraLocalStorage(muestra);
    actualizarLocalStorage(jug1, jug2);
    return;
}

const cambioMano = () => {
    let jug1 = obtenerJugador1LocalStorage();
    let jug2 = obtenerJugador2LocalStorage();
    if(jug1.mano) {
        jug1.mano = false;
        jug2.mano = true;
    } else {
        jug1.mano = true;
        jug2.mano = false;
    }
    actualizarLocalStorage(jug1, jug2);
}

//Suma un punto a puntosMano del jugador con mejor carta. Si hay empate gana jugador2.
const compararValores = async (cartaj1, cartaj2) => {
    let jug1 = obtenerJugador1LocalStorage();
    let jug2 = obtenerJugador2LocalStorage();
    let muestra = obtenerMuestraLocalStorage();
    let paloMuestra = traduccionPaloInverso(muestra.palo);
    try {
        let solicitud = await fetch("./db/data.json");
        let response = await solicitud.json();
        const valorJ1 = response[paloMuestra][traduccionPaloInverso(cartaj1.palo)][traduccionNumero(cartaj1.numero)];
        const valorJ2 = response[paloMuestra][traduccionPaloInverso(cartaj2.palo)][traduccionNumero(cartaj2.numero)];
        if(jug1.mano) {
            if(valorJ1 <= valorJ2) {
                jug2.puntosMano++;
                jug1.mano = true;
                jug2.mano = false;
            } else {
                jug1.puntosMano++;
                jug1.mano = false;
                jug2.mano = true;
            }
        } else if(valorJ1 < valorJ2) {
                jug2.puntosMano++;
                jug1.mano = true;
                jug2.mano = false;
            } else {
                jug1.puntosMano++;
                jug1.mano = false;
                jug2.mano = true;
            }
    actualizarLocalStorage(jug1, jug2);
    } catch(err) {
        //
    } finally {
        //
    }
}

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

const actualizarCartaJugadaJ1 = (palo, numero) => {
    const carta = new Carta(palo, numero);
    let jug1 = obtenerJugador1LocalStorage();
    let jug2 = obtenerJugador2LocalStorage();
    jug1.jugada = carta;
    const paloJugada = document.getElementById('paloj1');
    const numeroJugada = document.getElementById('numeroj1');
    paloJugada.innerText = palo;
    numeroJugada.innerText = numero;
    actualizarLocalStorage(jug1, jug2);
    eliminarCarta(carta, vaciarCartas);
}

const actualizarCartaJugadaJ2 = (palo, numero) => {
    const carta = new Carta(palo, numero);
    let jug1 = obtenerJugador1LocalStorage();
    let jug2 = obtenerJugador2LocalStorage();
    jug2.jugada = carta;
    const paloJugada = document.getElementById('paloj2');
    const numeroJugada = document.getElementById('numeroj2');
    paloJugada.innerText = palo;
    numeroJugada.innerText = numero;
    actualizarLocalStorage(jug1, jug2);
    eliminarCarta(carta, vaciarCartas);
}

const actualizarPuntuacion = () => {
    let jug1 = obtenerJugador1LocalStorage();
    let jug2 = obtenerJugador2LocalStorage();
    let muestra = obtenerMuestraLocalStorage();
    const puntuacion = document.getElementById('puntos');
    const paloMuestra = document.getElementById('paloMuestra');
    const numeroMuestra = document.getElementById('numeroMuestra');
    paloMuestra.innerText = muestra.palo;
    numeroMuestra.innerText = muestra.numero;
    puntuacion.innerText=`${jug1.nick}: ${jug1.puntosPartido} - ${jug2.nick}: ${jug2.puntosPartido}`;
} 

const vaciarCartasMesaJ1 = () => {
    const cartas = document.querySelector("body .mesa-juego .cartas .jugadores .jugador1");
    cartas.innerHTML = ``;
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
    paloj1.textContent = "";
    const numeroj1 = document.getElementById('numeroj1');
    numeroj1.textContent = "";

    const paloj2 = document.getElementById('paloj2');
    paloj2.textContent = "";
    const numeroj2 = document.getElementById('numeroj2');
    numeroj2.textContent = "";
    let jug1 = obtenerJugador1LocalStorage();
    let jug2 = obtenerJugador2LocalStorage()
    fn(jug1, jug2);
    actualizarLocalStorage(jug1, jug2);
}

const eliminarCarta = (carta, fn) => {
    let contador = 0;
    let id = -1;
    let jug1 = obtenerJugador1LocalStorage();
    let jug2 = obtenerJugador2LocalStorage();
    jug1.cartas.forEach(cartaAct => {
        if(cartaAct.palo == carta.palo && cartaAct.numero == carta.numero) {
            id = contador;
        } else {
            contador++;
        }
    });
    if(id !== -1) {
        jug1.cartas.splice(id, 1);
    }
    contador = 0;
    id = -1;
    jug2.cartas.forEach(cartaAct => {
        if(cartaAct.palo == carta.palo && cartaAct.numero == carta.numero) {
            id = contador;
        } else {
            contador++;
        }
    });
    if(id !== -1) {
        jug2.cartas.splice(id, 1);
    }
    actualizarLocalStorage(jug1, jug2);
    fn();
}

const hayCartasEnJuego = () => {
    const destinoJ1 = document.querySelector("body .mesa-juego .cartas .jugadores .jugador1");
    const destinoJ2 = document.querySelector("body .mesa-juego .cartas .jugadores .jugador2");
    if(destinoJ1.children.length > 0 || destinoJ2.children.length > 0) {
        return true;
    }   else return false;
}

const mostrarGanador = () => {
    let jug1 = obtenerJugador1LocalStorage();
    let jug2 = obtenerJugador2LocalStorage();
    if (jugadorGano(jug2)) {
        Swal.fire({
            title: "Drag me!",
            icon: "success",
            text: `Ganó ${jug2.nick}, fin del partido.`,
            draggable: true
        });
    } else {
        Swal.fire({
            title: "Fin del partido.",
            icon: "success",
            text: `Ganó ${jug1.nick}.`,
            draggable: true
        });
    }
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

let tiempoActual;

const cancelarTimeoutPerdido = () => {
    if (tiempoActual !== null) {
        clearTimeout(tiempoActual);
        tiempoActual = null;
    }
} 

const imprimirCartas = () => {
    cancelarTimeoutPerdido();
    actualizarPuntuacion();
    let jug1 = obtenerJugador1LocalStorage();
    let jug2 = obtenerJugador2LocalStorage();
    if(jug2.mano) {
        vaciarCartasMesaJ2();
        jug1 = obtenerJugador1LocalStorage();
        jug2 = obtenerJugador2LocalStorage();
        let jugoJ1 = false;
        if(partidoTerminado()) {
            mostrarGanador();
            return;
        } else {
            tiempoActual = setTimeout(() => {
                if(!jugoJ1) {
                    if(partidoTerminado()) {
                        return;
                    }
                    vaciarCartasJugadas(reiniciarCartasJugadas);
                    vaciarCartasMesa();
                    jug2.cartas = [];
                    jug1.cartas = [];
                    jug2.puntosPartido++;
                    actualizarLocalStorage(jug1, jug2);
                    reiniciarPtosMano();
                    jug1 = obtenerJugador1LocalStorage();
                    jug2 = obtenerJugador2LocalStorage();
                    if(!partidoTerminado()) {
                        barajarRepartir();
                        imprimirCartas();
                        return;
                    } else {
                        mostrarGanador();
                        return;
                    }
                }
            }, 10000);
        }
        jug1 = obtenerJugador1LocalStorage();
        jug2 = obtenerJugador2LocalStorage();
        vaciarCartasMesaJ1();
        jug1.cartas.forEach(carta => {
            const card = document.createElement("div");
            card.classList.add("carta");
            card.innerHTML =
            `
                <button id="${carta.palo}${carta.numero}">
                    <h3 class="palo">${carta.palo}</h3>
                    <h3 class="numero">${carta.numero}</h3>
                </button>
            `
            const destino = document.querySelector("body .mesa-juego .cartas .jugadores .jugador1");
            destino.appendChild(card);
            const boton = document.getElementById(`${carta.palo}${carta.numero}`);
            boton.addEventListener("click", async () => {
                clearTimeout(tiempoActual);
                jugoJ1 = true;
                if(noHayCartaJugadaJ1()) {
                    actualizarCartaJugadaJ1(carta.palo, carta.numero);
                    if(!noJugoJ2()) {
                        jug1 = obtenerJugador1LocalStorage();
                        jug2 = obtenerJugador2LocalStorage();
                        await compararValores(jug1.jugada, jug2.jugada);
                        vaciarCartasJugadas(reiniciarCartasJugadas);
                    } else {
                        cambioMano();
                    }
                    imprimirCartas();
                    return;
                }
            });
        });
    } else {
        jug1 = obtenerJugador1LocalStorage();
        jug2 = obtenerJugador2LocalStorage();
        let jugoJ2 = false;
        vaciarCartasMesaJ1();
        if(partidoTerminado()) {
            mostrarGanador();
            return;
        } else {
            tiempoActual = setTimeout(() => {
                if(!jugoJ2) {
                    if(partidoTerminado()) {
                        return;
                    }
                    vaciarCartasJugadas(reiniciarCartasJugadas);
                    vaciarCartasMesaJ2();
                    jug2.cartas = [];
                    jug1.cartas = [];
                    jug1.puntosPartido++;
                    actualizarLocalStorage(jug1, jug2);
                    if(!partidoTerminado()) {
                        barajarRepartir();
                        imprimirCartas();
                        return;
                    } else {
                        mostrarGanador();
                        return;
                    }             
                }
            }, 10000);
        }
        jug2.cartas.forEach(carta => {
            const card = document.createElement("div");
            card.classList.add("carta");
            card.innerHTML =
            `
                <button id="${carta.palo}${carta.numero}">
                    <h3 class="palo">${carta.palo}</h3>
                    <h3 class="numero">${carta.numero}</h3>
                </button>
            `
            const destino = document.querySelector("body .mesa-juego .cartas .jugadores .jugador2");
            destino.appendChild(card);
            const boton = document.getElementById(`${carta.palo}${carta.numero}`);
            boton.addEventListener("click", async () => {
                clearTimeout(tiempoActual);
                jugoJ2 = true;
                if(noHayCartaJugadaJ2()) {
                    actualizarCartaJugadaJ2(carta.palo, carta.numero);
                    if(!noJugoJ1()) {
                        jug1 = obtenerJugador1LocalStorage();
                        jug2 = obtenerJugador2LocalStorage();
                        await compararValores(jug1.jugada, jug2.jugada);
                        vaciarCartasJugadas(reiniciarCartasJugadas);
                    } else {
                        cambioMano();
                    }
                    imprimirCartas();
                    return;
                }
            });
        });
    }
    if(jug1.cartas.length === 0 && jug2.cartas.length === 0) {
        jug1 = obtenerJugador1LocalStorage();
        jug2 = obtenerJugador2LocalStorage();
        if(!partidoTerminado()) {
            if(jug1.puntosMano >= 2 && (jug1.puntosMano + jug2.puntosMano === 3)) {
                jug1.puntosPartido++;
                actualizarLocalStorage(jug1, jug2);
                reiniciarPtosMano();
                actualizarPuntuacion();
            } else if(jug2.puntosMano >= 2 && (jug1.puntosMano + jug2.puntosMano === 3)) {
                jug2.puntosPartido++
                actualizarLocalStorage(jug1, jug2);
                reiniciarPtosMano();
                actualizarPuntuacion();
            }
            jug1 = obtenerJugador1LocalStorage();
            jug2 = obtenerJugador2LocalStorage();
            if(!partidoTerminado()) {
                barajarRepartir();
                imprimirCartas();
                return;
            } else {
                mostrarGanador();
                return;
            }
        }
    }
}

const jugarPartido = () => {
    reiniciarPtosMano();
    reiniciarPtosPartido();
    actualizarPuntuacion();
    barajarRepartir();
    imprimirCartas();
}

const reanudar = document.getElementById('retomar');
reanudar.addEventListener("click", function(event) {
    event.preventDefault();
    if(!hayCartasEnJuego()) {
        vaciarReglas();
        actualizarPuntuacion();
        imprimirCartas();
        let jug1 = obtenerJugador1LocalStorage();
        let jug2 = obtenerJugador2LocalStorage();
        if(!(jug1.jugada.numero === -1)) {
            let palo = document.getElementById('paloj1');
            let numero = document.getElementById('numeroj1');
            palo.innerText = jug1.jugada.palo;
            numero.innerText = jug1.jugada.numero;
        }
        if(!(jug2.jugada.numero === -1)) {
            let palo = document.getElementById('paloj2');
            let numero = document.getElementById('numeroj2');
            palo.innerText = jug2.jugada.palo;
            numero.innerText = jug2.jugada.numero;
        }
    }
});


let boton = document.getElementById('boton');
boton.addEventListener("click", function(event){
    event.preventDefault();
    let nickJ1 = document.getElementById('nombreJ1');
    let nickJ2 = document.getElementById('nombreJ2');
    let jug1 = obtenerJugador1LocalStorage();
    let jug2 = obtenerJugador2LocalStorage();
    if(jug2.cartas.length > 0 || jug1.cartas.length > 0 || jug1.puntosPartido > 0 || jug2.puntosPartido > 0) {
        if(!partidoTerminado()) {
            Swal.fire({
                title: "Atencion:",
                icon: "info",
                text: `Hay un partido en juego, reinicie o reanude.`,
                draggable: true
            });
        } else jugarPartido();
    } else if(nickJ1.value !== "" && nickJ2.value !== "") {
        vaciarReglas();
        if (!localStorage.getItem('player1')) {
            localStorage.setItem('player1', JSON.stringify(jugador1));
        }
        if (!localStorage.getItem('player2')) {
            localStorage.setItem('player2', JSON.stringify(jugador2));
        }
        jug1.nick = nickJ1.value;
        jug2.nick = nickJ2.value;
        actualizarLocalStorage(jug1, jug2);
        jugarPartido();
    } else {
        Swal.fire({
            title: "Fallo al comenzar.",
            icon: "error",
            text: `Ingrese ambos nombres para comenzar.`,
            draggable: true
        });
    }
});

const reiniciar = document.getElementById('reinicio');
reiniciar.addEventListener("click", function(){
    let jug1 = obtenerJugador1LocalStorage();
    let jug2 = obtenerJugador2LocalStorage();
    localStorage.removeItem('player1');
    localStorage.removeItem('player2');
    reiniciarJugadores(jug1, jug2);
    actualizarLocalStorage(jug1, jug2);
    const destinoJ1 = document.querySelector("body .mesa-juego .cartas .jugadores .jugador1");
    const destinoJ2 = document.querySelector("body .mesa-juego .cartas .jugadores .jugador2");
    destinoJ1.innerHTML = ``;
    destinoJ2.innerHTML = ``;
    vaciarCartasJugadas(reiniciarCartasJugadas);
});

