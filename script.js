const btnReloj=document.querySelector(".btnReloj"),
      btnTempo=document.querySelector(".btnTempo"),
      btnAlarma=document.querySelector(".btnAlarma"),
      num=document.querySelectorAll(".num"),
      puntos=document.querySelectorAll(".punto"),
      btnSubir=document.querySelector(".btnSubir"),
      btnBajar=document.querySelector(".btnBajar"),
      btnParo=document.querySelector(".btnParo");

const pos1=document.querySelector(".pos1"),
      pos2=document.querySelector(".pos2"),
      pos3=document.querySelector(".pos3"),
      pos4=document.querySelector(".pos4");

let segundos,
    temporizador;

    



btnReloj.addEventListener("click",e=>{
    borrarReloj();
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
    console.log("Estas en el temporizador");

    
    
});

btnTempo.addEventListener("click",e=>{
    btnReloj.classList.remove("btnImpTemAlar");
    btnAlarma.classList.remove("btnImpTemAlar");
    btnTempo.classList.add("btnImpTemAlar");
    borrarReloj();
    let etapa=0;
    inicialNumero();
    btnParo.addEventListener("click",e=>{
        etapa++;
        tempo(etapa);
        console.log(etapa);
        if(etapa==3)etapa=0;
    })

    
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
function borrarNumero(dig){
    for(let o=0;o<7;o++){
        num[dig].children[o].removeAttribute("style");
    }
    
}
function inicialNumero(){
    let arr=[0,0,0,0];
    arr.forEach((e,i)=>{
        for(let o=0;o<7;o++){
            num[i].children[o].removeAttribute("style");
        }
        let dig=obtenerNumero(e);
        pintarNumero(dig,i);
    })
    for(let i=0;i<2;i++){
        puntos[i].style.opacity="1";
    }
}
function tempo(etapa){
    let arr=[0,0,0,0];
    if(etapa==1){
        //iniciar temporizador
        temporizador=setInterval(e=>{
            borrarNumero(3);
            arr[3]++;
            if(arr[3]>9){
              borrarNumero(2);
              arr[3]=0;
              arr[2]++;
              if(arr[2]>9){
                borrarNumero(1);
                    arr[2]=0;
                    arr[1]++;
                    if(arr[1]>9){
                        borrarNumero(0);
                        arr[1]=0;
                        arr[0]++;
                        if(arr[0]==5){
                            clearInterval(temporizador);
                        }
                    }
                }
            }
            arr.forEach((e,i,arr)=>{
                let numPint=obtenerNumero(e);
                pintarNumero(numPint,i);
            })
            if(arr[3]%2==0){
                for(let i=0;i<2;i++){
                    puntos[i].style.opacity="1";
                }
            }else{
                for(let i=0;i<2;i++){
                    puntos[i].removeAttribute("style");
                }
            }
        },1000);
    }else if(etapa==2){
        //parar temporizador
        clearInterval(temporizador);
    }else if(etapa==3){
        //reiniciar temporizador
        inicialNumero()
    }
    
}