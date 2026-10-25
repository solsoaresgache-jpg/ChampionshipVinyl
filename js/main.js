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
function enviarMensaje(event) {
    event.preventDefault(); 

    const aviso = document.getElementById("aviso-envio");
    if (aviso) {
        aviso.style.display = "block";
    }
    document.getElementById("form-contacto").reset();
}
let carrito = JSON.parse(localStorage.getItem("carrito_cv")) || [];

// Se ejecuta apenas carga la página para mostrar los productos guardados
document.addEventListener("DOMContentLoaded", () => {
    actualizarCarritoHTML();
});

function alternarCarrito() {
    const dropdown = document.getElementById("dropdown-carrito");
    if (dropdown) {
        dropdown.classList.toggle("abierto");
    }
}

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre: nombre, precio: precio });
    localStorage.setItem("carrito_cv", JSON.stringify(carrito));
    actualizarCarritoHTML();
}

// Función especial para cuando comprás desde index.html
function agregarDesdeIndex(nombre, precio) {
    agregarAlCarrito(nombre, precio);
    if (confirm("¡A 18' Del Sol fue agregado al carrito! ¿Querés ir a la Tienda a ver tu pedido?")) {
        window.location.href = "tienda.html";
    }
}

function actualizarCarritoHTML() {
    const listaCarrito = document.getElementById("lista-carrito");
    const precioTotal = document.getElementById("precio-total");
    const contador = document.getElementById("contador-carrito");

    if (contador) {
        contador.textContent = carrito.length;
    }

    if (!listaCarrito || !precioTotal) return;

    listaCarrito.innerHTML = "";
    let total = 0;

    if (carrito.length === 0) {
        listaCarrito.innerHTML = '<li class="carrito-vacio">El carrito está vacío.</li>';
    } else {
        carrito.forEach((item, index) => {
            total += item.precio;
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${item.nombre}</span>
                <span class="precio-item">$${item.precio.toLocaleString("es-AR")}</span>
                <button type="button" class="btn-borrar-item" onclick="eliminarDelCarrito(${index})">✕</button>
            `;
            listaCarrito.appendChild(li);
        });
    }

    precioTotal.textContent = "$" + total.toLocaleString("es-AR");
}

function eliminarDelCarrito(indice) {
    carrito.splice(indice, 1);
    localStorage.setItem("carrito_cv", JSON.stringify(carrito));
    actualizarCarritoHTML();
}

function vaciarCarrito() {
    carrito = [];
    localStorage.removeItem("carrito_cv");
    actualizarCarritoHTML();
}

function finalizarCompra() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }
    alert("¡Gracias por tu compra en Championship Vinyl! Te contactaremos para coordinar la entrega en San Telmo.");
    vaciarCarrito();
    alternarCarrito();
}