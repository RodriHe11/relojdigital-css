/*Zona variable - constantes*/
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
    temporizador,
    temporizador2,
    etapa=0,
    numero=0,
    digitoAlarm=[0,0,0,0];


/*Zona Eventos*/   
btnReloj.addEventListener("click",funcionamientoReloj);
btnAlarma.addEventListener("click",alarma);
btnTempo.addEventListener("click",cronometro);

/*Zona funciones*/
function reloj(){
    let tiempo=new Date(),
        horas=tiempo.getHours().toString(),
        minutos=tiempo.getMinutes().toString();
        segundos=tiempo.getSeconds();
        minutos=((minutos.length<=1)?"0".concat(minutos):minutos).split("");
        horas=((horas.length<=1)?"0".concat(horas):horas).split("");
        return horas.concat(minutos);
}
function funcionamientoReloj(){
    borrarReloj();
    btnParo.removeEventListener("click",crono);
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
}
function cronometro(){
    btnReloj.classList.remove("btnImpTemAlar");
    btnAlarma.classList.remove("btnImpTemAlar");
    btnTempo.classList.add("btnImpTemAlar");
    borrarReloj();
    let etapa=0;
    inicialNumero();
    btnParo.addEventListener("click",crono);
}
function crono(){
        etapa++;
        accionCrono(etapa);
        if(etapa==3)etapa=0;
}
function accionCrono(etapa){
    let arr=[0,0,0,0];
    if(etapa==1){
        //iniciar temporizador
        btnReloj.removeEventListener("click",funcionamientoReloj);
        btnTempo.removeEventListener("click",cronometro);
        btnAlarma.removeEventListener("click",alarma);
        temporizador2=setInterval(e=>{
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
                            clearInterval(temporizador2);
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
        clearInterval(temporizador2);
    }else if(etapa==3){
        //reiniciar temporizador
        inicialNumero();
        btnReloj.addEventListener("click",funcionamientoReloj);
        btnTempo.addEventListener("click",cronometro);
        btnAlarma.addEventListener("click",alarma);
    }
    
}
function alarma(){
    btnParo.removeEventListener("click",crono);
    btnReloj.classList.remove("btnImpTemAlar");
    btnTempo.classList.remove("btnImpTemAlar");
    btnAlarma.classList.add("btnImpTemAlar");
    borrarReloj();
    inicialNumero();
    pos1.addEventListener("click",e=>{
        console.log("primero");
        btnSubir.addEventListener("click",sumarNumero(0));
        btnBajar.addEventListener("click",restarNumero(0));
    });
    pos2.addEventListener("click",e=>{
        console.log("segundo");
        btnSubir.addEventListener("click",sumarNumero(1));
        btnBajar.addEventListener("click",restarNumero(1));
    });
    pos3.addEventListener("click",e=>{
        console.log("tercero");
        btnSubir.addEventListener("click",sumarNumero(2));
        btnBajar.addEventListener("click",restarNumero(2));
    });
    pos4.addEventListener("click",e=>{
        console.log("cuarto");
        btnSubir.addEventListener("click",sumarNumero(3));
        btnBajar.addEventListener("click",restarNumero(3));
    });

    


    
    console.log("Estas en el temporizador");
}
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
function sumarNumero(pos){
    numero=0;
    if(pos==0){
        if(numero<2){
            numero++;
            digitoAlarm[pos]=numero;
        }
    }else if(pos==1){
        if(digitoAlarm[0]==2 && numero<4){
            numero++;
            digitoAlarm[pos]==numero;
        }
    }else if(pos==2){
        if(digitoAlarm[0]==2 && digitoAlarm[1]==4){
            digitoAlarm[pos]=numero;
        }else if(numero <6){
            numero++;
            digitoAlarm[pos]==numero;
        }
    }else if(pos==3){
        if(digitoAlarm[0]==2 && digitoAlarm[1]==4 || digitoAlarm[2]==6){
            digitoAlarm[pos]=numero;
        }else{
            numero++;
            digitoAlarm[pos]=numero;
        }
    }
    borrarNumero(pos);
    let dig=obtenerNumero(numero);
    pintarNumero(dig,pos);
}
function restarNumero(pos){
    if(numero>0){
        numero--;
        digitoAlarm[pos]=numero;
    }
    borrarNumero(pos);
    let dig=obtenerNumero(numero);
    pintarNumero(dig,pos);
}