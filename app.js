import data from "./datos.js";
let categorias=generarLista();
let indexPreguntas=0;
let contador=0;
let nombre;
document.getElementById("salir").addEventListener("click", function(){
  const salir=location.reload();
})

document.getElementById("boton").addEventListener("click", function(){
  const contenedor=document.getElementById("contenedor");
  const input=document.querySelector("#contenedor>div>input");
  const pregunta=document.querySelector(".contenedorP");
  const botonSalir=document.getElementById("salir");
  if (input.value.length>0){
    nombre=input.value;
    contenedor.style.display="none"
    pregunta.style.display="block"
    botonSalir.style.display="block"
    llenarCampos(indexPreguntas)
    document.getElementById("contador").innerHTML=contador;
  }
})
document.querySelectorAll(".respuestas>li>input").forEach(function(item){
  item.addEventListener("click",validar)
})

function validar(e){
  if(e.target.dataset.rsp === "true"){
    contador+=1;
    document.getElementById("contador").innerHTML=contador;
    alert("Es correcto")
    llenarCampos(++indexPreguntas);
    if(contador==5){
      alert(nombre+" ha ganado");
      location.reload();

    }
  }else{
    alert("Es incorrecto");
    location.reload();
  }
}

function aleatoria(lista){
  return[...lista].sort(()=>Math.random() >0.5?1:-1)
}
function generarLista(){
  return aleatoria(data).map(item=>{
    let preguntasReorder=aleatoria(item.preguntas)[0]
    preguntasReorder.soluciones=aleatoria(preguntasReorder.soluciones)
    return{
      nombre:item.nombre,
      pregunta:preguntasReorder
    }
  })
}
function llenarCampos(id){
  if(categorias[id]!=undefined){
    
    document.querySelector(".preguntas").innerHTML=categorias[id].pregunta.pregunta;
    document.querySelectorAll(".respuestas>li>input").forEach(function(item,index){
      let solucion=categorias[id].pregunta.soluciones[index];
      item.value=solucion.texto
      item.dataset.rsp=solucion.valor
    })
  }
}

