let productoZapatillas = document.getElementById("productoZapatilla")
let carrito =[]
const carritodecompras = document.getElementById("carritodecompras")
const totalCarrito = document.getElementById("TotalCarrito")
const iconoCarrito = document.getElementById("iconoCarrito")
const botonVaciarCarrito = document.querySelector('#boton-vaciar');
const botonComprarCarrito = document.querySelector('#boton-comprar');
const btnFiltro = document.querySelectorAll('.botonFiltro');

window.addEventListener("load", function() {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
});



/*const zapatillas = [
				{id:1, nombre: 'Nike Zoom Freak 4 "NRG Lightning"',img:"img/nike.png" , precio: 78990, marca:"nike"},
				{id:2, nombre: 'Adidas DON issue 3 "Christmas"', img:"img/adidas.png" , precio: 69000, marca:"adidas"},
				{id:3, nombre: 'Under Armour Spawn 3 "Electric Blue"', img:"img/underarmor.png" , precio: 59000, marca:"under"},
				{id:4, nombre: 'Puma RS Dreamer J Cole "Lime Green"', img: "img/puma.jpg" , precio: 58000, marca:"puma"},
				{id:5, nombre: 'Nike Kyrie Flytrap 6 "Black Ice"', img:"img/nike2.png" , precio: 67900, marca:"nike"},

]*/



function mostrarMensaje(){
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

Toast.fire({
  icon: 'success',
  title: 'Agregaste el producto al carrito',
  background: '#e05c26',
  color:'white'
})
}


function removerDelCarrito(id) {
	
	carrito = carrito.filter((item) => item.id !== id);
	const productoAgregado = document.getElementById(id);
	if (productoAgregado) {
		productoAgregado.remove();
	}
	const total = carrito.reduce((acumulador, el) => acumulador += el.precio * el.cantidad, 0);
	totalCompra.innerHTML = `Total: ${total}`;
	localStorage.setItem('carrito', JSON.stringify(carrito));
}

function losProductos(zapatillas){
	fetch('./data/zapatillas.json')
    .then(response => response.json())
    .then(data => {
      zapatillas = data;
      productoZapatillas.innerHTML = "";
      zapatillas.forEach((item) => {
        const contendor = document.createElement("div");
		contendor.className = "card cartas";
		const card1 = document.createElement("div");
		card1.className = "card-body cartas2"
		const titulo = document.createElement('h5');
		titulo.className = "card-title"
		titulo.textContent = item.nombre;	
		const precio = document.createElement('p');
		precio.className = "card-text precio";
		precio.innerHTML = `$ ${item.precio}`;
		
		const img = document.createElement("img")
		img.src = `${item.img}`
		img.className = "imgZapatillas"

		const boton= document.createElement('button');
		boton.textContent = 'Agregar';
	boton.setAttribute("data-bs-toggle","modal" );
boton.setAttribute("data-bs-target","#exampleModal" );
		boton.setAttribute('marcador', item.id);
boton.className = "botonAgregar";
boton.addEventListener('click', () => agregarAlCarrito(item));



		card1.appendChild(titulo)
		card1.appendChild(img)
		card1.appendChild(precio)
		card1.appendChild(boton)
		contendor.appendChild(card1)

		productoZapatillas.appendChild(contendor)
      });
    })
    .catch(error => {
      console.log(error);
    });
}

btnFiltro.forEach(btn =>{
btn.addEventListener('click', filtradoProductos)
})

function filtradoProductos(e){
if(e.target.id === "todos"){
losProductos();
}else{
	productoZapatillas.innerHTML = "";
	fetch('./data/zapatillas.json')
    .then(response => response.json())
    .then(data => {
      zapatillas = data;
       const arrayFiltrado = zapatillas.filter((el) => el.marca === e.target.id);
	  console.log(arrayFiltrado)

	  losProductos(arrayFiltrado);
    })
    .catch(error => {
      console.log(error);
    });


}




}


function agregarAlCarrito(item){
	mostrarMensaje();
	const itemRepetido = carrito.find((carritoItem) => carritoItem.id === item.id);
	
	
	//console.log(carrito)
	if(itemRepetido){
		carrito = carrito.map((carritoItem) => {
			if(carritoItem.id === item.id)
			{
				carritoItem.cantidad += 1;
				const productoAlCarrito = document.getElementById(carritoItem.id);
				console.log(productoAlCarrito)
				
		productoAlCarrito.innerHTML = `<img src=${item.img} class ="imgCarrito"> Cantidad: ${carritoItem.cantidad} - Item: ${carritoItem.nombre} - Precio Total: $${carritoItem.precio * carritoItem.cantidad}`
				
const botonRemover = document.createElement('button');
botonRemover.textContent = 'X';
botonRemover.setAttribute('marcador', item.id);
botonRemover.className = "remover"
botonRemover.addEventListener('click', () => {
removerDelCarrito(item.id);							
								
});
productoAlCarrito.appendChild(botonRemover);

			}
			return carritoItem

		}
		)
	}else{
		const nuevoItem = {...item, cantidad : 1}
		const productoAgregado = document.createElement("p");
productoAgregado.classList.add("contenedorCarrito");
		
		productoAgregado.innerHTML = `<img src=${item.img} class ="imgCarrito"> Cantidad: ${nuevoItem.cantidad} - Item: ${nuevoItem.nombre} - Precio Total: $${nuevoItem.precio} `;
		productoAgregado.id = item.id;
		carrito = [...carrito, nuevoItem];
		carritodecompras.appendChild(productoAgregado)
		
		
botonVaciarCarrito.addEventListener("click", vaciarCarrito);


				
const botonRemover = document.createElement('button');
botonRemover.textContent = 'X';
botonRemover.setAttribute('marcador', item.id);
botonRemover.className = "remover"
botonRemover.addEventListener('click', () => {
removerDelCarrito(item.id);
});
productoAgregado.appendChild(botonRemover);

		}
		//console.log(carrito)
		const total = carrito.reduce ((acumulador, el) => acumulador += el.precio*el.cantidad, 0)
		totalCompra.innerHTML = `Total: $${total}`;

localStorage.setItem('carrito', JSON.stringify(carrito));






}	
function vaciarCarrito() {
	if (carrito.length === 0) {
		Swal.fire('El carrito esta vacio');
		return;
	  }
	Swal.fire({
		title: '¿Estás seguro?',
		text: "Se borrara todo",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Si!'
	  }).then((result) => {
		if (result.isConfirmed) {
			carrito.forEach((item) => {
				const productoAgregado = document.getElementById(item.id);
				if (productoAgregado) {
					productoAgregado.remove();
				}
			});
			
			carrito = [];
			totalCompra.innerHTML = "Total: $0";
			localStorage.setItem("carrito", JSON.stringify(carrito));
		  	Swal.fire(
			'Borrado',
			'El carrito fue vaciado',
			'success'
		  )
		}
	  })

}

const carritoEnStorage = localStorage.getItem('carrito');
if (carritoEnStorage) {
	carrito = JSON.parse(carritoEnStorage);
	carrito.forEach((item) => {
		const productoAgregado = document.createElement("p");
productoAgregado.classList.add("contenedorCarrito");
		productoAgregado.innerHTML = `<img src=${item.img} class ="imgCarrito"> Cantidad: ${item.cantidad} - Item: ${item.nombre} - Precio Total: $${item.precio * item.cantidad} `;
		productoAgregado.id = item.id;
		carritodecompras.appendChild(productoAgregado);

		botonVaciarCarrito.addEventListener("click", vaciarCarrito);
		botonComprarCarrito.addEventListener("click", comprarCarrito);

		function vaciarCarrito() {
			if (carrito.length === 0) {
				Swal.fire('El carrito esta vacio');
				return;
			  }
			Swal.fire({
				title: '¿Estás seguro?',
				text: "Se borrara todo",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Si'
			  }).then((result) => {
				if (result.isConfirmed) {
					carrito = [];
					productoAgregado.innerHTML = ""
					totalCompra.innerHTML = "Total: $0";
					localStorage.setItem("carrito", JSON.stringify(carrito));
				  Swal.fire(
					'Borrado',
					'El carrito fue vaciado',
					'success'
				  )
				}
			  })

		}

		
			const botonRemover = document.createElement('button');
botonRemover.textContent = 'X';
botonRemover.setAttribute('marcador', item.id);
botonRemover.className = "remover"
botonRemover.addEventListener('click', () => {
	removerDelCarrito(item.id);
});
productoAgregado.appendChild(botonRemover);

	});
				const total = carrito.reduce ((acumulador, el) => acumulador += el.precio*el.cantidad, 0)
				totalCompra.innerHTML = `Total: $${total}`;


}

function comprarCarrito() {

	Swal.fire({
		title: 'CSdsadsadd.',
		width: 600,
		padding: '3em',
		color: '#716add',
		background: '#fff url(/img/basquet.jpg)',
		backdrop: `
		  rgba(0,0,123,0.4)
		  url("/images/nyan-cat.gif")
		  left top
		  no-repeat
		`
	  })

	  carrito.forEach((item) => {
		const productoAgregado = document.getElementById(item.id);
		if (productoAgregado) {
			productoAgregado.remove();
		}
	});
	
	carrito = [];
	totalCompra.innerHTML = "Total: $0";
	localStorage.setItem("carrito", JSON.stringify(carrito));
}







losProductos();