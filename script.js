const btnReloj=document.querySelector(".btnReloj"),
      btnAlarma=document.querySelector(".btnTempo"),
      btnTempo=document.querySelector(".btnAlarma"),
      num=document.querySelectorAll(".num"),
      puntos=document.querySelectorAll(".punto");

let segundos,
    temporizador;
    



btnReloj.addEventListener("click",e=>{
    btnReloj.classList.add("btnImpTemAlar");
    btnAlarma.classList.remove("btnImpTemAlar");
    btnTempo.classList.remove("btnImpTemAlar");
    
    temporizador=setInterval(e=>{
        let tiempo=reloj();
        if(segundos==0){
            for(let i=0;i<4;i++){
                for(let o=0;o<7;o++){
                    num[i].children[o].removeAttribute("style");
                }
            }
        }
        tiempo.forEach((e,i)=>{
            let arrNum=obtenerNumero(e);
            pintarNumero(arrNum,i);
        });
        parpadeo(segundos);
    },1000);
});

btnAlarma.addEventListener("click",e=>{
    btnReloj.classList.remove("btnImpTemAlar");
    btnAlarma.classList.add("btnImpTemAlar");
    btnTempo.classList.remove("btnImpTemAlar");
    borrarReloj();
});

btnTempo.addEventListener("click",e=>{
    btnReloj.classList.remove("btnImpTemAlar");
    btnAlarma.classList.remove("btnImpTemAlar");
    btnTempo.classList.add("btnImpTemAlar");
    borrarReloj();
});





function parpadeo(seg){
    if(seg%2==0){
        for(let i=0;i<2;i++){
            puntos[i].style.opacity="1";
        }
    }else{
        for(let i=0;i<2;i++){
            puntos[i].removeAttribute("style");
        }
    }
}
function borrarReloj(){
    clearInterval(temporizador);
    for(let i=0;i<4;i++){
        for(let o=0;o<7;o++){
            num[i].children[o].removeAttribute("style");
        }
    }
    for(let i=0;i<2;i++){
        puntos[i].removeAttribute("style");
    }
}
function reloj(){
    let tiempo=new Date(),
        horas=tiempo.getHours().toString(),
        minutos=tiempo.getMinutes().toString();
        segundos=tiempo.getSeconds();
        minutos=((minutos.length<=1)?"0".concat(minutos):minutos).split("");
        horas=((horas.length<=1)?"0".concat(horas):horas).split("");
        return horas.concat(minutos);
}
function obtenerNumero (num){
    const objNum={
        0:[0,1,2,3,4,5],
        1:[2,3],
        2:[1,2,4,5,6],
        3:[1,2,3,4,6],
        4:[0,2,3,6],
        5:[0,1,3,4,6],
        6:[0,1,3,4,5,6],
        7:[1,2,3],
        8:[0,1,2,3,4,5,6],
        9:[0,1,2,3,6]
    }
    return objNum[num];
}
function pintarNumero(arr,i){
    arr.forEach(e=>{
        num[i].children[e].style.opacity="1";
    })

}