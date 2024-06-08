const divCarrito = document.getElementById("carrito");
const divFinalizar =document.getElementById("finalizar")
const totalContainer = document.getElementById("total-container");
const carritoVacioImg = "../resources/images/carrito-vacio.png";

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function mostrarCarrito() {
    divCarrito.innerHTML = "";
    if (carrito.length === 0) {
        mostrarCarritoVacio();
    } else {
        carrito.forEach(el => createCard(el, "carrito"));
        agregarBotonFinalizar();
    }
    actualizarTotal();
}

function mostrarCarritoVacio() {
    const mensaje = document.createElement("p");
    mensaje.innerText = "Tu Carrito de compras esta vacio!";
    mensaje.className = "msg-vacio"

    const imagen = document.createElement("img");
    imagen.src = carritoVacioImg;
    imagen.alt = "Carrito vacío";
    imagen.className = "img-vacio";

    divCarrito.appendChild(imagen);
    divCarrito.appendChild(mensaje);
}

function actualizarTotal() {
    const total = carrito.reduce((acc, item) => acc + item.precio, 0);
    totalContainer.innerText = `TOTAL: $${total}`;
}

function quitarCarrito(id) {
    carrito = carrito.filter(el => el.id !== id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
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
        botonFinalizar.innerText = "Finalizar Compra";
        botonFinalizar.className = "btn-finalizar";
        botonFinalizar.onclick = finalizarCompra;
        divFinalizar.appendChild(botonFinalizar);
    }
}

function finalizarCompra() {
    const total = carrito.reduce((acc, item) => acc + item.precio, 0);
    Swal.fire({
        title: `El monto total de tu compra es de $${total}.`,
        text: "¿Desea confirmar la compra?",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "SI",
        cancelButtonText: "NO"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                position: "top-mid",
                icon: "success",
                title: "Gracias por su compra! - Será redirigido al proveedor de pago. Hasta Luego!",
                showConfirmButton: false,
                timer: 3000
            });
            setTimeout(() => {
                carrito = [];
                localStorage.setItem("carrito", JSON.stringify(carrito));
                divCarrito.innerHTML = "";
                agregarBotonFinalizar();
                mostrarCarrito();
                actualizarTotal();
            }, 3000);
        }
    }) 
}

mostrarCarrito();