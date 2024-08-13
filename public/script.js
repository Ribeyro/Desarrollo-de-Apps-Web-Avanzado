// Función para saludar al hacer clic en el botón
function saludar() {
    const mensaje = 'Hola, te saluda Mario Bros';
    const mario = '<img src="/assets/superMario.gif"/>';

    // Mostrar el contenido en un elemento HTML con el id 'saludo'
    const saludoElement = document.getElementById('saludo');
    saludoElement.innerHTML = mensaje + '<br>' + mario;

    // Deshabilitar el botón
    botonSaludo.disabled = true;

    // Esperar 5 segundos antes de habilitar el botón de nuevo
    setTimeout(() => {
        saludoElement.innerHTML = 'Haz clic para saludar';
        botonSaludo.disabled = false;
    }, 3000);
}
// Asignar la función saludar al evento click del botón
const botonSaludo = document.getElementById('boton-saludo');
botonSaludo.addEventListener('click', saludar);