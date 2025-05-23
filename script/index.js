let mazo = 
    [
        [1, 2, 3, 4, 5, 6, 7, 10, 11, 12], 
        [1, 2, 3, 4, 5, 6, 7, 10, 11, 12],
        [1, 2, 3, 4, 5, 6, 7, 10, 11, 12],
        [1, 2, 3, 4, 5, 6, 7, 10, 11, 12]
    ];

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
        Swal.fire({
            title: "Lo sentimos...",
            icon: "error",
            text: `Imposible consultar valores, intente denuevo mas tarde.`,
            draggable: true
        });
    } 
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

let tiempoTruco;

const mostrarTruco = () => {
    if(!Truco.trucoCantado) {
        botonesTruco();
    }
}

const botonesTruco = () => {
    let jug1 = obtenerJugador1LocalStorage();
    let jug2 = obtenerJugador2LocalStorage();
    let truco = obtenerInfoTrucoLocalStorage();
    if(!truco.trucoCantado) {
        const boton = document.createElement("button");
        boton.innerText = `Truco`;
        boton.className = "boton-truco";
        if(jug2.mano) {
            const destinoJ1 = document.querySelector("body .mesa-juego .cartas .jugadores .jugador1");
            destinoJ1.appendChild(boton);
            boton.addEventListener("click", () => {
                truco.trucoCantado = true;
                actualizarInfoTrucoLocalStorage(truco);
                vaciarCartasMesa();
                tiempoTruco = setTimeout(() => {
                    jug1.puntosPartido += truco.valorMano;
                    actualizarLocalStorage(jug1, jug2);
                    finMano();
                    if(!partidoTerminado()) {
                        barajarRepartir();
                        imprimirCartas();
                        return;
                    } else {
                        finPartido();
                        return;
                    }
                }, 5000);
                aceptarRechazarTruco(jug2.id);
            });
        } else {
            const destinoJ2 = document.querySelector("body .mesa-juego .cartas .jugadores .jugador2");
            destinoJ2.appendChild(boton);
            boton.addEventListener("click", () => {
                truco.trucoCantado = true;
                actualizarInfoTrucoLocalStorage(truco);
                vaciarCartasMesa();
                tiempoTruco = setTimeout(() => {
                    jug2.puntosPartido += truco.valorMano;
                    actualizarLocalStorage(jug1, jug2);
                    finMano();
                    if(!partidoTerminado()) {
                        barajarRepartir();
                        imprimirCartas();
                        return;
                    } else {
                        finPartido();
                        return;
                    }
                }, 5000);
                aceptarRechazarTruco(jug1.id);
            });
        } 
    }
}

//id es el id del jugador el cual tiene que aceptar o rechazar el truco.
const aceptarRechazarTruco = (id) => {
    let jug1 = obtenerJugador1LocalStorage();
    let jug2 = obtenerJugador2LocalStorage();
    let truco = obtenerInfoTrucoLocalStorage();
    const botonQuiero = document.createElement("button");
    const botonNoQuiero = document.createElement("button");
    botonQuiero.innerText = `Quiero`;
    botonNoQuiero.innerText = `No quiero`;
    botonQuiero.className = "boton-truco";
    botonNoQuiero.className = "boton-truco";
    if(jug1.id === id) {
        const destino = document.querySelector("body .mesa-juego .cartas .jugadores .jugador1");
        destino.appendChild(botonNoQuiero);
        destino.appendChild(botonQuiero);
        botonQuiero.addEventListener("click", () => {
            clearTimeout(tiempoTruco);
            truco.valorMano = 2;
            actualizarInfoTrucoLocalStorage(truco);
            imprimirCartas();
        });
        botonNoQuiero.addEventListener("click", () => {
            clearTimeout(tiempoTruco);
            reiniciarTruco();
            jug2.puntosPartido += truco.valorMano;
            actualizarLocalStorage(jug1, jug2);
            finMano();
            if(!partidoTerminado()) {
                barajarRepartir();
                imprimirCartas();
                return;
            } else {
                finPartido();
                return;
            }
        });
    } else {
        const destino = document.querySelector("body .mesa-juego .cartas .jugadores .jugador2");
        destino.appendChild(botonNoQuiero);
        destino.appendChild(botonQuiero);
        botonQuiero.addEventListener("click", () => {
            clearTimeout(tiempoTruco);
            truco.valorMano = 2;
            actualizarInfoTrucoLocalStorage(truco);
            imprimirCartas();
        });
        botonNoQuiero.addEventListener("click", () => {
            truco = obtenerInfoTrucoLocalStorage();
            clearTimeout(tiempoTruco);
            jug1.puntosPartido += truco.valorMano;
            actualizarLocalStorage(jug1, jug2);
            finMano();
            if(!partidoTerminado()) {
                barajarRepartir();
                imprimirCartas();
                return;
            } else {
                finPartido();
                return;
            }
        });
    }
}

const mostrarGanador = () => {
    let jug1 = obtenerJugador1LocalStorage();
    let jug2 = obtenerJugador2LocalStorage();
    if (jugadorGano(jug2)) {
        Swal.fire({
            title: "Fin del partido.",
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
    vaciarMuestra();
    vaciarPuntuacion();
}

const controlFinPartido = () => {
    if(!partidoTerminado()) {
        barajarRepartir();
        imprimirCartas();
        return;
    } else {
        finPartido();
        return;
    }
}

const finPartido = () => {
    clearTimeout(tiempoActual);
    mostrarGanador();
    vaciarPuntuacion();
    reiniciarJugadores();
    reiniciarMuestra();
    vaciarLocalStorage();
    return;
}

const finMano = () => {
    clearTimeout(tiempoActual);
    reiniciarMano();
    vaciarCartasJugadas(reiniciarCartasJugadas);
    vaciarCartasMesa();    
    reiniciarMuestra();
    reiniciarMazo();
    actualizarPuntuacion();
    reiniciarTruco();
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
    let truco = obtenerInfoTrucoLocalStorage();
    if(jug2.mano) {
        vaciarCartasMesaJ2();
        jug1 = obtenerJugador1LocalStorage();
        jug2 = obtenerJugador2LocalStorage();
        let jugoJ1 = false;
        if(partidoTerminado()) {
            finPartido();
            return;
        } else {
            tiempoActual = setTimeout(() => {
                if(!jugoJ1) {
                    jug2.puntosPartido += truco.valorMano;
                    actualizarLocalStorage(jug1, jug2);
                    finMano();
                    controlFinPartido();
                    return;
                }
            }, 10000);
        }
        jug1 = obtenerJugador1LocalStorage();
        jug2 = obtenerJugador2LocalStorage();
        vaciarCartasMesaJ1();
        mostrarTruco();
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
        truco = obtenerInfoTrucoLocalStorage();
        let jugoJ2 = false;
        vaciarCartasMesaJ1();
        if(partidoTerminado()) {
            finPartido();
            return;
        } else {
            tiempoActual = setTimeout(() => {
                if(!jugoJ2) {
                    jug1.puntosPartido += truco.valorMano;
                    actualizarLocalStorage(jug1, jug2);
                    finMano();
                    controlFinPartido();
                    return;            
                }
            }, 10000);
        }
        mostrarTruco();
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
        truco = obtenerInfoTrucoLocalStorage();
        if(!partidoTerminado()) {
            if(jug1.puntosMano >= 2 && (jug1.puntosMano + jug2.puntosMano === 3)) {
                jug1.puntosPartido += truco.valorMano;
                actualizarLocalStorage(jug1, jug2);
                finMano();
                actualizarPuntuacion();
            } else if(jug2.puntosMano >= 2 && (jug1.puntosMano + jug2.puntosMano === 3)) {
                jug2.puntosPartido += truco.valorMano;
                actualizarLocalStorage(jug1, jug2);
                finMano();
                actualizarPuntuacion();
            }
            controlFinPartido();
            return;
        }
    }
}

const jugarPartido = () => {
    cargarLocalStorage();
    reiniciarPtosMano();
    reiniciarPtosPartido();
    actualizarPuntuacion();
    barajarRepartir();
    imprimirCartas();
}

const reanudar = document.getElementById('retomar');
reanudar.addEventListener("click", function(event) {
    event.preventDefault();
    if(obtenerJugador1LocalStorage()) {
        if(!hayCartasEnJuego()) {
            vaciarReglas();
            imprimirCartas();
            actualizarPuntuacion();
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
            Swal.fire({
                title: "Reanudando ...",
                icon: "success",
                showConfirmButton: false,
                position: "top-end",
                timer: 1000
            });
        }
    } else {
        Swal.fire({
                title: "No hay partido en juego.",
                icon: "error",
                text: "Comienze uno nuevo"
        });
    }
});

let form = document.getElementById('formularioComienzo');
form.addEventListener("submit", function(event){
    event.preventDefault();
    if(!obtenerJugador1LocalStorage() && !obtenerJugador2LocalStorage()) {
        cargarLocalStorage();
        let nickJ1 = document.getElementById('nombreJ1');
        let nickJ2 = document.getElementById('nombreJ2');
        let jug1 = obtenerJugador1LocalStorage();
        let jug2 = obtenerJugador2LocalStorage();
        if(nickJ1.value !== "" && nickJ2.value !== "") {
            vaciarReglas();
            jug1.nick = nickJ1.value;
            jug2.nick = nickJ2.value;
            actualizarLocalStorage(jug1, jug2);
            jugarPartido();
        } else {
            Swal.fire({
                title: "Fallo al comenzar.",
                icon: "error",
                text: `Ingrese ambos nombres para comenzar.`
            });
        }
    } else {
        Swal.fire({
            title: "Atencion:",
            icon: "info",
            text: `Hay una partida en juego, reanude en caso de no ver las cartas.`
        });
    }
});