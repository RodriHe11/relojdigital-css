/*Para que se repita la funcion tiempo cada segundo
se utiliza un setTimeout()*/
/*hacer una funcion para que detecte los numeros y los
ponga en el reloj*/
    let hora=new Date();
    console.log(hora.getHours());
    console.log(hora.getMinutes());
    
function reloj(){
    let tiempo=new Date(),
        horas=tiempo.getHours().toString().split(""),
        minutos=tiempo.getMinutes().toString().split("");
    return horas.concat(minutos);   
}
function obtenerNumero (num){
    const objNum={
        0:[1,2,3,4,5,6],
        1:[3,4],
        2:[2,3,5,6,7],
        3:[2,3,4,5,7],
        4:[1,3,4,7],
        5:[1,2,4,5,7],
        6:[1,2,4,5,6,7],
        7:[2,3,4],
        8:[1,2,3,4,5,6,7],
        9:[1,2,3,4,7]
    }
    return objNum[num];
}