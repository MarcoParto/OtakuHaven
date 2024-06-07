const container = document.getElementById("container");
const carritoCount = document.getElementById("carrito-count");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let productos = [];

function actualizarContadorCarrito() {
    if (carrito.length === 0) {
        carritoCount.innerText = "(vacío)";
    } else {
        carritoCount.innerText = `(${carrito.length})`;
    }
}

function agregarCarrito(id) {
    const mangaAgregar = productos.find(el => el.id === id);
    if (carrito.some(element => element.id === mangaAgregar.id)) {
        Swal.fire({
            position: "top-end",
            icon: "error",
            text: "YA POSEE UNA COPIA DE ESTE PRODUCTO EN SU CARRITO",
            showConfirmButton: false,
            timer: 1500});
    } else {
        mangaAgregar.imagen = `.${mangaAgregar.imagen}`;
        carrito.push(mangaAgregar);
        Swal.fire({
            title: "Producto agregado al carrito!",
            text: "¿Desea ir a su carrito de compras?",
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, ir al carrito.",
            cancelButtonText: "No, seguir comprando."
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "./pages/cart.html";
            }
        }) 
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarContadorCarrito();
    }
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
    btnAdd.innerText = "Agregar";
    btnAdd.className = "btn-add";
    btnAdd.onclick = () => agregarCarrito(manga.id);

    card.appendChild(titulo);
    card.appendChild(imagen);
    card.appendChild(precio);
    card.appendChild(btnAdd);

    const nuevoContenedor = document.getElementById(contenedor);
    nuevoContenedor.appendChild(card);
}

fetch("./js/data.json")
.then(response => response.json())
.then(data => {
    productos = data;
    productos.forEach(el => createCard(el, "container"));
})

actualizarContadorCarrito();