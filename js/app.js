// Variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners () {
    // cuando agregas un curso presionando "Agregar al carrito"
  listaCursos.addEventListener("click", agregarCurso);

  // Cuando elimine carrito
  carrito.addEventListener("click", eliminarCurso);
 
// Muestra cursos del storage
document.addEventListener("DOMContentLoaded", () => {
     articulosCarrito = JSON.parse (localStorage.getItem("carrito")) || [];

     carritoHtml();
})


  // Eliminar todos los aritculos del carrito
  vaciarCarrito.addEventListener("click", () => {
    articulosCarrito = []; // reseatamos el codigo

    limpiarHTML(); // Elimionamos todo el HTML
  });

 
}


// Funciones 
function agregarCurso(e){
    e.preventDefault();
   if (e.target.classList.contains("agregar-carrito")) {
         const cursoSeleccionado = e.target.parentElement.parentElement

              leerDatosCurso(cursoSeleccionado);
   }
}   
 // Elimina un curso del carrito
 function eliminarCurso(e){

  e.preventDefault();
  if(e.target.classList.contains("borrar-curso")) {
      const id = e.target.getAttribute("data-id");

      // Elimina del array de articulos carrito por el data-id
     articulosCarrito.forEach(curso =>  {

          if(curso.id === id) {
         // si la cantidad es mayor a 1 entonces cantidad--
         if (curso.cantidad > 1) {
          curso.cantidad--;

          // Mostramos el new HTML
          carritoHtml();
         } else {
              // recorremos con filter
              articulosCarrito = articulosCarrito.filter(curso => curso.id !== id );
          // volvemos cagar el HTML
              carritoHtml();
         }

    
      }
     })

      carritoHtml(); // Iterar el carrito y mostrar en HTMLs
  }
 }


// Lee el contenido del HTML al que le dimos click y extrae la informacon del curso
function leerDatosCurso(curso) {
    // console.log(curso)
   // Crear un objketo del contenido del curso
   const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent, 
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1
   }

    // Revisa si un element ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
 if (existe) {
       // Actualizamos Cantidad
       const cursos = articulosCarrito.map(curso => {
        if(curso.id === infoCurso.id) {
              curso.cantidad++;
              return curso // retoma el objeto actualizado
        } else {
            return curso;  // retoma los objetos que no son duplicados
        } 
       })
       articulosCarrito = [...cursos]
 } else {
      // Agregamos cantidad 
      articulosCarrito = [...articulosCarrito, infoCurso];
 }
   // Agrega elementos al array carrito
 

   console.log(articulosCarrito);

   carritoHtml()
}

// Muestra el carrito de compras en el HTML
  


function carritoHtml () {

 
  // Limpiar el HTML
 limpiarHTML();

  // Recorre el carrito y genera HTML
articulosCarrito.forEach( curso => {
    const {imagen, titulo, precio, cantidad, id} = curso;
      const row = document.createElement("tr");
      row.innerHTML = `
      <td>    <img src="${imagen}" width=100>     </td>  
      <td>    ${titulo}  </td>
      <td>  ${precio}  </td>
      <td>  ${cantidad} </td>
      <td>
      <a href="#" class="borrar-curso" data-id=${id}> X </a>
      </td>
      
     
      `;
      
      
      // Agrega el html del carrito en el tbody
      contenedorCarrito.appendChild(row);
})

     // Agregar el carrito de compras al storage
     sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
}

// Eliminar los curso dl tbody
function limpiarHTML() {

    // Forma lente
    // contenedorCarrito.innerHTML = ""

    while(contenedorCarrito.firstChild) {
   contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}




