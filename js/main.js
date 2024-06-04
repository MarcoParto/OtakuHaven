const container = document.getElementById("container");
const btnCarrito = document.getElementById("btn-carrito");
const divCarrito = document.getElementById("carrito");

const botonMostrarOcultar = document.createElement("button");
botonMostrarOcultar.className = "btn-mostrar"
let mostrar = false;
botonMostrarOcultar.onclick = () => mostrarOcultar(mostrar);

btnCarrito.appendChild(botonMostrarOcultar);

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function actualizarBotonCarrito() {
    if (carrito.length === 0) {
        botonMostrarOcultar.innerText = "CARRITO DE COMPRAS VACIO";
        botonMostrarOcultar.disabled = true;
    } else {
        botonMostrarOcultar.innerText = mostrar ? "OCULTAR CARRITO" : "MOSTRAR CARRITO";
        botonMostrarOcultar.disabled = false;
    }
}

function agregarCarrito(id) {
    const mangaAgregar = productos.find(el => el.id === id);
    if (carrito.some(element => element.id === mangaAgregar.id)) {
        alert("Este producto ya se encuentra en su carrito de compras.");
    } else {
        carrito.push(mangaAgregar);
        alert("Producto agregado a su carrito de compras con exito!");
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrar = false;
        actualizarBotonCarrito();
    }
}

function quitarCarrito(id) {
    divCarrito.innerHTML = "";
    let nuevoCarrito = carrito.filter(el => el.id !== id);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    carrito = nuevoCarrito;
    carrito.forEach(el => createCard(el, "carrito"));
    agregarBotonFinalizar();
    actualizarBotonCarrito();
}

function createCard(manga, contenedor) {
    const card = document.createElement("div");
    card.className = "card";

    const titulo = document.createElement("p");
    titulo.innerText = manga.nombre;
    titulo.className = "titulo";

    const imagen = document.createElement("img");
    imagen.src = manga.imagen;
    imagen.alt = "Portada de manga/comic";
    imagen.className = "img";

    const precio = document.createElement("p");
    precio.innerText = `$${manga.precio}`;
    precio.className = "precio";

    const btnAdd = document.createElement("button");
    btnAdd.innerText = contenedor === "container" ? "Agregar" : "Quitar";
    btnAdd.className = "btn-add";
    if (contenedor === "container") {
        btnAdd.onclick = () => agregarCarrito(manga.id);
    } else {
        btnAdd.onclick = () => quitarCarrito(manga.id);
    }

    card.appendChild(titulo);
    card.appendChild(imagen);
    card.appendChild(precio);
    card.appendChild(btnAdd);

    const nuevoContenedor = document.getElementById(contenedor);
    nuevoContenedor.appendChild(card);
}

function mostrarOcultar(estado) {
    if (estado) {
        mostrar = false;
        divCarrito.innerHTML = "";
    } else {
        mostrar = true;
        divCarrito.innerHTML = "";
        carrito.forEach(el => createCard(el, "carrito"));
        agregarBotonFinalizar();
    }
    actualizarBotonCarrito();
}

function agregarBotonFinalizar() {
    if (carrito.length > 0) {
        const botonFinalizar = document.createElement("button");
        botonFinalizar.innerText = "FINALIZAR COMPRA";
        botonFinalizar.className = "btn-finalizar";
        botonFinalizar.onclick = finalizarCompra;
        divCarrito.appendChild(botonFinalizar);
    }
}

function finalizarCompra() {
    const total = carrito.reduce((acc, item) => acc + item.precio, 0);
    const confirmar = confirm(`El monto total de tu compra es de $${total}. ¿Desea confirmar la compra?`);
    if (confirmar) {
        alert("Gracias por su compra! - ahora será redirigido al proveedor de pago. Hasta Luego!");
        carrito = [];
        localStorage.setItem("carrito", JSON.stringify(carrito));
        divCarrito.innerHTML = "";
        agregarBotonFinalizar();
        actualizarBotonCarrito();
    }
}

productos.forEach(el => createCard(el, "container"));
carrito.forEach(el => createCard(el, "carrito"));
actualizarBotonCarrito();