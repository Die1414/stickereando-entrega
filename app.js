let articulosCarrito = []; // Esto son los productos que hay en el carrito.
const listaProductos = document.querySelector('#producto-container'); // Listado de todos los productos del DOM
const contenedorCarrito = document.querySelector('#lista-carrito tbody'); // Este es el contenedor del DOM para los articulos del carrito
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); // Boton para descartar los elementos del carrito de compras
const carrito = document.querySelector('#carrito'); // Listado de elementos del carrito para detectar el boton remover del carrito de cada producto añadido
const cantidadCarrito = document.querySelector('.numero-carrito');

document.addEventListener('DOMContentLoaded', () => {
	fetch('../utilidades/productos.json')
		.then((data) => data.json())
		.then((productos) => {
			renderProducts(productos);
		})
		.catch((err) => {
			console.log(err);
		});

	articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
	cantidadCarrito.textContent = localStorage.getItem('cantidadCarrito') || 0;
});

function renderProducts(productos) {
	const contenido = document.querySelector('#producto-container');

	let html = '';

	productos.forEach((producto) => {
		html += `
        <div class="card">
              <img src="img/${producto.imagen}" alt="" class="imagen-producto ">
                <div class="info-card">
                  <h4>${producto.nombre}</h4>
                  <p class="precio">$${producto.precio}</p>
                  <a href="#" class="button input agregar-carrito" data-id="${producto.id}">Agregar
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-plus-fill" viewBox="0 0 16 16">
  				  <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zM8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5V8z"/></svg>
                  </a>
              </div>
          </div>  
        `;
	});
	contenido.innerHTML = html;
}

// Evento para agregar al carrito
listaProductos.addEventListener('click', agregarProducto);

// Deteccion de evento para eliminar productos de carrito
carrito.addEventListener('click', eliminarProducto);

// Evento para descartar todos los productos añadidos al carrito
vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

function eliminarProducto(evt) {
	// el event listener me dar el evt
	evt.preventDefault(); // como es un ancla evito el comportamiento predeterminado
	if (evt.target.classList.contains('borrar-producto')) {
		// me aseguro que el evento solo reaccione con el click al boton
		const producto = evt.target.parentElement.parentElement; // selecciono el objeto completo
		const productoId = producto.querySelector('a').getAttribute('data-id'); // obtengo el valor que lo identifica como unico

		//Eliminar del carrito
		articulosCarrito = articulosCarrito.filter((producto) => producto.id !== productoId); // dejo todos los elementos en el carrito salvo el que coincide con el seleccionado
		// Actualizo la intefaz del DOM con todos los elementos menos el seleccionado para borrar
		// carritoHTML();
	}
}

function agregarProducto(evt) {
	evt.preventDefault(); // evito el comportamiento del anchor

	if (evt.target.classList.contains('agregar-carrito')) {
		// reacciono solo al click en el boton
		const producto = evt.target.parentElement.parentElement; // guardo todo el card del producto
		leerDatosProducto(producto); // funcion para obtener los datos del card y pasarlo a un objeto
	}
}

function leerDatosProducto(producto) {
	// producto es toda la etiqueta con la class card y sus hijos
	const infoProducto = {
		imagen: producto.querySelector('img').src, // obtengo el src de la imagen y la guardo en una propiedad
		titulo: producto.querySelector('h4').textContent, // obtengo el Titulo del h4 y lo meto en la propiedad titulo del obj
		precio: producto.querySelector('.precio').textContent, // obtengo el texto de la etiqueta que tiene precio y lo guardo en el objeto
		id: producto.querySelector('a').getAttribute('data-id'), // obtengo el id unico del producto y lo guardo en el objeto
		cantidad: 1, // seteo por defecto el valor 1 a cantidad
	};

	if (articulosCarrito.some((producto) => producto.id === infoProducto.id)) {
		//? pregunto si el produto seleccionado esta en el carrito (true o false)
		const productos = articulosCarrito.map((producto) => {
			//* recorro todo el carrito
			if (producto.id === infoProducto.id) {
				//* encuentro el proucto que coincide seleecionado con el que ya se encuentra en el carrito
				let cantidad = parseInt(producto.cantidad); //& obtengo la cantidad guardada en el carrito
				cantidad += 1; //^ le sumo uno a esa cantidad encontrada
				producto.cantidad = cantidad; //& seteo la nueva cantidad al carrito
				return producto; //& retorno el producto completo con la cantidad diferente
			} else {
				return producto; //& solo retorno el producto ya que no estaba en el carrito
			}
		});
		articulosCarrito = productos;
	} else {
		//articulosCarrito.push(infoProducto) // agrego solo el proucto que no existia en el carrito
		articulosCarrito = [...articulosCarrito, infoProducto]; // agrego solo el proucto que no existia en el carrito
	}

	let arrayCantidades = 0;
	articulosCarrito.forEach((producto) => {
		arrayCantidades += producto.cantidad;
	});
	cantidadCarrito.textContent = arrayCantidades;
	localStorage.setItem('cantidadCarrito', arrayCantidades);
	sincronizarStorage();
}

function sincronizarStorage() {
	localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

// funcion para quitar todos los elementos del carrito
function vaciarCarrito() {
	while (contenedorCarrito.firstChild) {
		// mientras el carrito tenga un elemento lo borro
		contenedorCarrito.removeChild(contenedorCarrito.firstChild);
		localStorage.removeItem('carrito');
	}
}