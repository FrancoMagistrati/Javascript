let continuar = true
let nombre = "Alumnos"
let profesor = "Franco Magistrati"
let nota1
let nota2
let resultado
function login (){
	let ingresar = prompt("Ingresa el nombre del profesor")
	let entrar = true
	if(ingresar === "Franco Magistrati")
	{
		alert("Bienvenido " + profesor)


	}else{
		alert("Profesor incorrecto")
		entrar = false
		
	}
return entrar

}

if(login()){
	
	do{
		let nuevonombre = prompt("Nombre del Alumno")
		
	if(nuevonombre != null && nuevonombre !=""){
		 nota1 = parseInt(prompt("Nota del primer parcial"))
		if(nota1>0 && nota1 <=10){
		
			nota2 = parseInt(prompt("Nota del segundo parcial"))
				if(nota2 >0 && nota2<=10){
					nombre = nombre + "\n" + nuevonombre + " Primer parcial, " + nota1 + " Segundo parical " + nota2 
			
					alert(nombre)
					resultado = (nota1 + nota2) /2
					if(resultado>=6)
					{
						let aprobado = nuevonombre + " Aprobado!! \nSu promedio final es: " + resultado
						alert(aprobado)
					}else{
						let desaprobado = nuevonombre + " Desaprobado \nSu promedio final es: " + resultado
						alert(desaprobado)
					}
				}else {alert("Ingresaste mal la segunda nota")}

			}else{alert("Ingresaste mal la nota")}
	
		
		
	
		}else{
		let pregunta = prompt("¿Desea agregar otro alumno? \n-Si \n-No")
		if(pregunta == "si" || pregunta =="Si"){
		nuevonombre
	}else {
		
	alert("Hasta luego!!!")
	
	continuar = false
	}
	
	}
	}while(continuar)


}




