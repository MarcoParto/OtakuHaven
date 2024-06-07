const divCarrito = document.getElementById("carrito");
const totalContainer = document.getElementById("total-container");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function actualizarTotal() {
    const total = carrito.reduce((acc, item) => acc + item.precio, 0);
    totalContainer.innerText = `Total: $${total}`;
}

function quitarCarrito(id) {
    divCarrito.innerHTML = "";
    carrito = carrito.filter(el => el.id !== id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    carrito.forEach(el => createCard(el, "carrito"));
    agregarBotonFinalizar();
    actualizarTotal();
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
    btnAdd.innerText = "Quitar";
    btnAdd.className = "btn-add";
    btnAdd.onclick = () => quitarCarrito(manga.id);

    card.appendChild(titulo);
    card.appendChild(imagen);
    card.appendChild(precio);
    card.appendChild(btnAdd);

    const nuevoContenedor = document.getElementById(contenedor);
    nuevoContenedor.appendChild(card);
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
        actualizarTotal();
    }
}

carrito.forEach(el => createCard(el, "carrito"));
agregarBotonFinalizar();
actualizarTotal();