// Variables
const lacteos_cat = document.getElementById("cat1");
const selectElements = document.querySelectorAll('select');
const button_add = document.getElementById("button_add");

const listaProductos = document.getElementById("listaProductos");








function pagLacteos(){
    window.open("lacteos.html", "_self");
}
function pagCarnes(){
    window.open("carnes.html", "_self");
}
function pagInicio(){
    window.open("index.html", "_self");
}
function pagCansta(){
    window.open("canasta.html", "_self");
}


const startNumber = 0;
const endNumber = 20; 

  // Iterar sobre cada elemento select encontrado
  selectElements.forEach(selectElement => {
    selectElement.innerHTML = '';

    // Generar las opciones dinámicamente para el select actual
    for (let i = startNumber; i <= endNumber; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = i;
      selectElement.appendChild(option);
    }
  });

  function addProducto(){

    let productos = JSON.parse(sessionStorage.getItem('productosSeleccionados')) || [];


    selectElements.forEach(selectElement => {

        const id = selectElement.dataset.productId;
        const producto = selectElement.name;
        const cantidad = selectElement.value;

        if (cantidad != 0) {
            const item = {
              id: id,
              nombre: producto,
              cantidad: cantidad
            };
      
            // Verificar si ya existe un producto con ese id
            const existente = productos.find(p => p.id === id);
      
            if (existente) {
              // Si ya existe, actualiza la cantidad
              existente.cantidad = cantidad;
            } else {
              // Si no existe, lo agrega
              productos.push(item);
            }
      
            console.log(`ID: ${id}, Producto: ${producto}, Cantidad: ${cantidad}`);
          }
      });

      sessionStorage.setItem('productosSeleccionados', JSON.stringify(productos));
  }


const productosData = JSON.parse(sessionStorage.getItem('productosSeleccionados'));

listaProductos.innerHTML = '';
if (productosData) {
    productosData.forEach(producto => {
        const li = document.createElement('li');
        li.textContent = `${producto.nombre}............Cantidad: ${producto.cantidad}`;
        listaProductos.appendChild(li);
    });
}



function borrarData(){
    sessionStorage.removeItem('productosSeleccionados');
    listaProductos.innerHTML = '';
    selectElements.forEach(selectElement => {
        selectElement.value = 0;
    });
}

console.log(sessionStorage.getItem('productosSeleccionados'));


function enviarDataSuma(){
  fetch("http://localhost:5678/webhook-test/d891c4aa-b1e1-4b0e-a8b3-5550a19ede5d", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(productosData)
  })
.then(response => {
  if (!response.ok) {
    throw new Error('Error en la solicitud');
  }
  return response.json();
})
.then(data => {
  console.log('Respuesta del servidor:', data);
})
.catch(error => {
  console.error('Hubo un problema con la petición:', error);
});
}


function enviarDataResta(){
  fetch("http://localhost:5678/webhook-test/d891c4aa-b1e1-4b0e-a8b3-5550a19ede5c", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(productosData)
  })
.then(response => {
  if (!response.ok) {
    throw new Error('Error en la solicitud');
  }
  return response.json();
})
.then(data => {
  console.log('Respuesta del servidor:', data);
})
.catch(error => {
  console.error('Hubo un problema con la petición:', error);
});
}
