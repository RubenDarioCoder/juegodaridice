document.addEventListener('DOMContentLoaded', () => {
    // ====== 1. VARIABLES GLOBALES ======
    // - Seleccionar todos los botones de colores (.botonDari)
    // - Seleccionar el botón de inicio (#startButton)
    // - Seleccionar los displays de puntaje (#puntaje y #maxPuntaje)
    // - Variables para:
    //   * secuencia (array): guarda la secuencia generada por la computadora.
    //   * ronda (number): índice de la secuencia que el jugador debe repetir.
    //   * puntaje (number): puntos actuales.
    //   * maxPuntaje (number): récord almacenado en localStorage.
    //   * esperandoJugador (boolean): controla si el juego espera input del jugador.

    // ====== 2. INICIALIZACIÓN ======
    // - Mostrar el maxPuntaje almacenado en localStorage al cargar la página.

    // ====== 3. FUNCIONES PRINCIPALES ======

    // ----- 3.1. generarColorAleatorio() -----
    // - Define un array con los 4 colores posibles.
    // - Elige un color aleatorio y lo agrega al array 'secuencia'.
    // - Retorna el color generado (opcional).

    // ----- 3.2. iluminarBoton(color) -----
    // - Recibe un color (ej: "azul").
    // - Selecciona el botón correspondiente y añade la clase CSS 'active'.
    // - Elimina la clase 'active' después de 300ms (setTimeout).

    // ----- 3.3. reproducirSecuencia() -----
    // - Recorre la secuencia actual con un intervalo de 600ms entre cada color.
    // - Usa iluminarBoton() para mostrar cada color.
    // - Al terminar, activa 'esperandoJugador = true' para permitir input del jugador.

    // ----- 3.4. manejarClic(color) -----
    // - Verifica si es el turno del jugador (esperandoJugador).
    // - Ilumina el botón clickeado.
    // - Compara el color clickeado con la secuencia en la posición 'ronda':
    //   * Si es correcto: avanza la ronda.
    //   * Si completa la secuencia: aumenta el puntaje, actualiza el récord y pasa a la siguiente ronda.
    //   * Si falla: muestra "Game Over" y reinicia el juego.

    // ----- 3.5. reiniciarJuego() -----
    // - Resetea secuencia, ronda y puntaje.
    // - Actualiza el display de puntaje a 0.

    // ====== 4. EVENT LISTENERS ======

    // ----- 4.1. Botón de Inicio -----
    // - Al hacer clic:
    //   * Reinicia el juego (reiniciarJuego()).
    //   * Genera el primer color aleatorio.
    //   * Reproduce la secuencia (reproducirSecuencia()).

    // ----- 4.2. Botones de Color -----
    // - Por cada botón:
    //   * Al hacer clic, obtiene su color (dataset.color) y llama a manejarClic().
});
