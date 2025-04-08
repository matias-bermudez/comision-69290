const jugador1 = {
    nick: prompt("Ingrese nombre del JUGADOR 1"),
    puntos: 0,
    mano: ["", "", ""]
};

const jugador2 = {
    nick: prompt("Ingrese nombre del JUGADOR 2"),
    puntos: 0,
    mano: ["", "", ""]
};

let mazo = [
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
            //[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
            ]

console.log(mazo);

const reiniciarBaraja = (arr) => {
    arr.length = 0;
    arr.push([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    arr.push([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    arr.push([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    arr.push([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
}

reiniciarBaraja(mazo);
console.log(mazo);
