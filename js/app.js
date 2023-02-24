// alert("hola mundo"); (comprobando el linkeado)


let cantidad = 0;

while (true) {
  console.log(`Cantidad actual de Remeras: ${cantidad}`);

  let respuesta = prompt(`Desea sumar un producto más? En caso de necesitar sumar un producto coloque "+" en caso de querer quitar un producto coloque "-" . Para finalizar la compra escriba "fin".`);

  if (respuesta === "+") {
    if (cantidad < 9) {
      cantidad++;
    } else {
      alert("Para cantidades mayores a 10 le sugerimos ir a la sección de packs.");
    }
  } else if (respuesta === "-") {
    if (cantidad > 0) {
      cantidad--;
    } else {
      console.log("No puede quitar más productos, ya que no hay ninguno en el carrito.");
    }
  } else if (respuesta === "fin") {
    console.log(`Compra finalizada. Cantidad total de Remeras: ${cantidad}`);
    break;
  } else {
    console.log("Respuesta no válida. Por favor ingrese un signo +, - o la palabra 'fin'.");
  }
}
