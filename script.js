document.addEventListener('DOMContentLoaded', () => {
    // ====== 1. VARIABLES GLOBALES ======
    // - Seleccionar todos los botones de colores (.botonDari)
    const botones = document.querySelectorAll('.buttonDari');
    // - Seleccionar el botón de inicio (#startButton)
    const botonInicio = document.querySelector('#startButton')
    // - Seleccionar los displays de puntaje (#puntaje y #maxPuntaje)
    const points = document.querySelector('#points');
    const highScore = document.querySelector('#highScore');
    // - Variables para:
    //   * secuencia (array): guarda la secuencia generada por la computadora.
    let secuencia = [];
    //   * ronda (number): índice de la secuencia que el jugador debe repetir.
    let ronda = 0;
    //   * puntaje (number): puntos actuales.
    let puntaje = 0;
    //   * maxPuntaje (number): récord almacenado en localStorage.
    let localHighScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0;
    //   * esperandoJugador (boolean): controla si el juego espera input del jugador.
    let esperandoJugador = false;

    // ====== 2. INICIALIZACIÓN ======
    // - Mostrar el maxPuntaje almacenado en localStorage al cargar la página.
    highScore.textContent = `Mejor Puntaje: ${localHighScore}`;
    // ====== 3. FUNCIONES PRINCIPALES ======

    // ----- 3.1. generarColorAleatorio() -----
    // - Define un array con los 4 colores posibles.
    const colors = [ 'blue', 'green', 'red', 'yellow'];
    // - Elige un color aleatorio y lo agrega al array 'secuencia'.
    function generarColorAleatorio() {
        const colorAleatorio = colors[Math.floor(Math.random() * colors.length)];
        secuencia.push(colorAleatorio);
        // Actualiza el display de puntaje
        points.textContent = `Puntos: ${puntaje}`;
        // Retorna el color generado (opcional).
        return colorAleatorio;
    }

    // ----- 3.2. iluminarBoton(color) -----
    // - Recibe un color (ej: "azul").
    function iluminarBoton(color) {
        // - Selecciona el botón correspondiente usando dataset.color.
        const boton = document.querySelector(`.buttonDari[data-color="${color}"]`);
        // - Añade la clase CSS 'active' para iluminar el botón.
        boton.classList.add('active');
        // - Elimina la clase 'active' después de 300ms (setTimeout).
        setTimeout(() => {
            boton.classList.remove('active');
        }, 300);
    }

    // ----- 3.3. reproducirSecuencia() -----
    // - Recorre la secuencia actual con un intervalo de 600ms entre cada color.
    function reproducirSecuencia() {
        esperandoJugador = false; // Desactiva input del jugador
        let i = 0; // Índice para recorrer la secuencia
        const intervalo = setInterval(() => {
            if (i < secuencia.length) {
                iluminarBoton(secuencia[i]); // Ilumina el botón correspondiente
                i++;
            } else {
                clearInterval(intervalo); // Detiene el intervalo al completar la secuencia
                esperandoJugador = true; // Permite input del jugador
            }
        }, 600);
    }

    // ----- 3.4. manejarClic(color) -----
  
    function manejarClic(color) {
        if (!esperandoJugador) return; // Si no es el turno del jugador, no hace nada
        iluminarBoton(color); // Ilumina el botón clickeado

        if (color === secuencia[ronda]) {
            ronda++; // Avanza a la siguiente ronda
            if (ronda === secuencia.length) { // Si completa la secuencia
                puntaje++; // Aumenta el puntaje
                points.textContent = `Puntos: ${puntaje}`; // Actualiza el display de puntaje
                if (puntaje > localHighScore) { // Verifica si es un nuevo récord
                    localHighScore = puntaje;
                    highScore.textContent = `Mejor Puntaje: ${localHighScore}`;
                    localStorage.setItem('highScore', localHighScore); // Guarda el récord en localStorage
                }
                ronda = 0; // Reinicia la ronda
                generarColorAleatorio(); // Genera un nuevo color para la siguiente ronda
                reproducirSecuencia(); // Reproduce la nueva secuencia
            }
        } else {
            alert("Game Over!"); // Muestra mensaje de fin de juego
            reiniciarJuego(); // Reinicia el juego
        }
    }

    // ----- 3.5. reiniciarJuego() -----
    // - Resetea secuencia, ronda y puntaje.
    function reiniciarJuego() {
        secuencia = []; // Reinicia la secuencia
        ronda = 0; // Reinicia la ronda
        puntaje = 0; // Reinicia el puntaje
        points.textContent = `Puntos: ${puntaje}`; // Actualiza el display de puntaje
        esperandoJugador = false; // Desactiva input del jugador
        generarColorAleatorio(); // Genera el primer color aleatorio
        reproducirSecuencia(); // Reproduce la secuencia inicial
    }


    // ====== 4. EVENT LISTENERS ======

    // ----- 4.1. Botón de Inicio -----
    // - Al hacer clic:
    //   * Reinicia el juego (reiniciarJuego()).
    //   * Genera el primer color aleatorio.
    //   * Reproduce la secuencia (reproducirSecuencia()).
    botonInicio.addEventListener('click', () => {
        reiniciarJuego();
        generarColorAleatorio();
        reproducirSecuencia();
    });

    // ----- 4.2. Botones de Color -----
    // - Por cada botón:
    //   * Al hacer clic, obtiene su color (dataset.color) y llama a manejarClic().
    botones.forEach(boton => {
        boton.addEventListener('click', () => {
            const color = boton.dataset.color; // Obtiene el color del botón
            manejarClic(color); // Llama a manejarClic con el color
        });
    });
});
