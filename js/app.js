let carrito = [];

const productos = [
  { nombre: 'Remera', precio: 300 },
  { nombre: 'Pack de 3 remeras', precio: 800 },
  { nombre: 'Pantalón', precio: 500 },
  { nombre: 'Camisa', precio: 400 },
  // se puede seguir agregando productos
];

while (true) {
  console.log(`Productos en el carrito: ${JSON.stringify(carrito)}`);
  
  let respuesta = prompt(`Desea sumar un producto más? Seleccione uno de los siguientes productos:\n${productos.map(p => p.nombre).join('\n')}\nPara finalizar la compra escriba "fin".`);

  if (respuesta === 'fin') {
    console.log(`Compra finalizada. Productos en el carrito: ${JSON.stringify(carrito)}`);
    break;
  }
  
  let producto = productos.find(p => p.nombre === respuesta);
  
  if (producto) {
    let itemCarrito = carrito.find(i => i.nombre === respuesta);
    if (itemCarrito) {
      itemCarrito.cantidad++;
      itemCarrito.subtotal += producto.precio;
    } else {
      carrito.push({
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: 1,
        subtotal: producto.precio
      });
    }
    console.log(`Se agregó ${producto.nombre} al carrito.`);
  } else {
    console.log('Respuesta no válida. Por favor seleccione un producto de la lista o escriba "fin" para finalizar la compra.');
  }
}

let totalCompra = carrito.reduce((total, item) => total + item.subtotal, 0);
let impuesto = totalCompra * 0.21;
let totalConImpuesto = totalCompra + impuesto;

console.log(`Total de la compra: $${totalCompra}`);
console.log(`Impuesto del 21%: $${impuesto}`);
console.log(`Total con impuesto: $${totalConImpuesto}`);