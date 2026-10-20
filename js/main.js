const canciones = [
    "Canción para los Días de la Vida - Luis Alberto Spinetta",
    "Que Bueno Que Llegaste - Cami y Bronko Yotte",
    "I Wanna Be Adored (Remastered 2009) - The Stone Roses",
    "lyin - Loyle Carner",
    "Cassius 1999 - Cassius"
];

let indiceActual = 0;

function actualizarCarrusel() {
    const textoCancion = document.getElementById("texto-cancion");
    const numeroCancion = document.getElementById("numero-cancion");

    if (textoCancion && numeroCancion) {
        textoCancion.innerText = canciones[indiceActual];
        numeroCancion.innerText = (indiceActual + 1) + " / " + canciones.length;
    }
}

function siguienteCancion() {
    indiceActual++;
    if (indiceActual >= canciones.length) {
        indiceActual = 0; // Vuelve al inicio
    }
    actualizarCarrusel();
}

function anteriorCancion() {
    indiceActual--;
    if (indiceActual < 0) {
        indiceActual = canciones.length - 1; // Va al último
    }
    actualizarCarrusel();
}

function mostrarFormulario() {
    const form = document.getElementById("form-review");
    const btn = document.getElementById("btn-mostrar-form");

    if (form && btn) {
        if (form.style.display === "block") {
            form.style.display = "none";
            btn.innerText = "DEJA TU REVIEW";
        } else {
            form.style.display = "block";
            btn.innerText = "OCULTAR FORMULARIO";
        }
    }
}

function agregarReview(event) {
    event.preventDefault();
    const nombre = document.getElementById("input-nombre").value;
    const tipoReview = document.getElementById("select-tipo").value;
    const estrellas = document.getElementById("select-estrellas").value;
    const comentario = document.getElementById("input-comentario").value;

    const nuevaTarjeta = document.createElement("article");
    nuevaTarjeta.classList.add("tarjeta-review");

    nuevaTarjeta.innerHTML = `
        <h4>${nombre}</h4>
        <p class="puntuacion">${estrellas}</p>
        <p class="album-review">${tipoReview}</p>
        <p>"${comentario}"</p>
    `;
    const contenedor = document.getElementById("grid-reviews");
    if (contenedor) {
        contenedor.appendChild(nuevaTarjeta);
    }

    document.getElementById("form-review").reset();
    mostrarFormulario();
}