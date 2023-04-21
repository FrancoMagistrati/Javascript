let continuar = true
let resultado
let profesor = "Franco Magistrati"
function login (){
	let ingresar = prompt("Ingresa el nombre del profesor")

	if(ingresar === "Franco Magistrati")
	{	
		alert("Bienvenido " + profesor)
		continuar = true

	}else{
		alert("Profesor incorrecto")
		return continuar = false
		
	}
return continuar = true

}

if(login()){


class Alumno{
	constructor(nombre, nota1, nota2){
			this.nombre = nombre
			this.nota1 = nota1
			this.nota2 = nota2
			}
}

const alumnos= []
do{
let opciones = prompt("Ingresa la opcion que desees \n1-Agregar Alumno \n2-Eliminar ultimo Alumno \n3-Ver alumnos \n4-Ver promedio del Alumno \n5-Ver todos los alumnos \n6-Salir")

if(opciones === "1"){
	
let ingresaAlumno = {}
ingresaAlumno.nombre = prompt("Ingresa nombre del Alumno").trim()
if(ingresaAlumno.nombre)
{
	let notaIngresada1 = parseFloat(prompt("Ingresa nota 1"))
	if(!isNaN(notaIngresada1) && notaIngresada1 <= 10 && notaIngresada1 >0){
	let notaIngresada2 = parseFloat(prompt("Ingresa nota 2"))
	if(!isNaN(notaIngresada2) && notaIngresada2 <= 10 && notaIngresada2 >0){
		alumnos.push(new Alumno(ingresaAlumno.nombre, notaIngresada1, notaIngresada2))
		alert("Estudiante ingresado correctamente")
		resultado = (notaIngresada1 + notaIngresada2) /2
	}else{alert("Ingresaste mal la segunda nota")}

}else{alert("Ingresaste mal la primer nota")}
}

}else if(opciones === "2"){
	if(alumnos.length === 0)
{
alert("No hay alumnos cargados")
}else{
alumnos.pop()
alert("Se elemino el alumno")
}
}else if(opciones === "3"){
	if(alumnos.length === 0){
		alert("No hay alumnos cargados")
	}else{	
		let nombreCargado = prompt("Que alumno buscas?")
	

	const busqueda = alumnos.find((el) => el.nombre === nombreCargado)
	

	console.log(busqueda)
		if(busqueda == undefined){
		alert("No existe el alumno")
	}else{
		alert("Alumno " + busqueda.nombre + " Nota 1: " + busqueda.nota1 + " Nota 2: " + busqueda.nota2)}
	}



}else if(opciones === "4"){
	if(alumnos.length === 0){
		alert("No hay alumnos cargados")
	}else{	
	nombreCargado = prompt("Que alumno buscas?")	
	busqueda = alumnos.find((el) => el.nombre === nombreCargado)
	console.log(busqueda)
		if(busqueda == undefined){
		alert("No existe el alumno")
	}else{
		if(resultado >= 6){
			alert("Alumno " + busqueda.nombre + " Promedio " + Math.ceil(resultado) + " Aprobado")}
	else{alert("Alumno " + busqueda.nombre + " " + busqueda.apellido + " Promedio " + Math.ceil(resultado) + " Desaprobado")}
	}
	}
}else if(opciones === "5"){


}else if(opciones === "6"){

alert("Hasta luego!!")
	continuar = false


}else{alert("No es correcta la opcion")}


}while(continuar)
console.log(alumnos)
}