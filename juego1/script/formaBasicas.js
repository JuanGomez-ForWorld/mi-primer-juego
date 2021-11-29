'use strict'
// variables
const fps = 50;
let end = true;

let fondo = new Image();
fondo.src = "./img/cielo.png"

let puerta = new Image();
puerta.src = "./img/puerta.png"

const endGame = { x: 1150, y: 180, width: 70, height: 120}
// 1100, 180, 70, 120


let fram1=0, fram2=0, fram = 0, countCoin = 0
// function that load each FPS
function update() {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(fondo, 0, 0, canvas.width, canvas.height)

    ctx.fillStyle = `#fff`;
    ctx.font="bold italic 40px arial";
    ctx.fillText("coin: " + countCoin, 40, 40)
    
    let coinNum = 0
    currency.map(x => {
        coin( x.x, x.y)

        if (colition( x )) {
            countCoin++
            currency.splice(x.id, 1)
            currency.map( n => {
                n.id = coinNum
                coinNum++
            })
            console.log(currency);
        }
    })

    // puerta 
    ctx.drawImage(puerta, endGame.x-50, endGame.y, endGame.width, endGame.height)
    // puerta end
    ctx.drawImage(puerta, 50, 640, 70, 120)

    colition(endGame) ? end = true : false

    dibujo(player)

    animar(fram1, fram2, 160, 230, player)
    if (player.rightPressed || player.leftPressed) {
        player.animar()
    }else{fram1 = 0, fram2 = 0}
    

    pressed(player)
    jump(player)
    

    pisoFlotante()
    groundOfRock()
    soilOfEarth(200, 290, 20)
    soilOfEarth(0, 410, 2)
    soilOfEarth(900, 610, 4)
    soilOfEarth(canvas.width/2 -100, 560, 4)
    soilOfEarth(canvas.width/6 -100, 560, 4)


    // groundOfRock
    gravedad(player) 

    // console.log("x");

    // The game finish 
    if( end ){ 
        clearInterval(updateGame)
        clear() 
    }
}

// function of one load


function colition( obj ) {
    let posX = player.x + player.width
    let posY = player.y + player.height
    if( posX  >= obj.x && player.x <= obj.x + obj.width){
        if(posY >= obj.y && player.y <= obj.y + (obj.height / 2)){
            return true
        }
    }
    return false
}
function gravedad(obj) {
    let posY = obj.y + obj.height <= canvas.height
    obj.mov = (!obj.contacto && posY && !obj.jump ? true : false )

    if (obj.mov) {  
        if( obj.g == 0 && !obj.jump) { obj.g = 2 } 
        obj.y += (obj.g += 0.05 )
    } 
    else { 
        obj.g = 0 
        obj.contacto = false
    }
    
    return obj.mov
}
function jump(obj) {
    obj.abovePressed ?  obj.jump = true : false

    const start = () => {
        obj.jump = false; 
        if(obj.g > 4.59 ) {
            obj.above = 6
        }
    }

    let f = 0.1 
    obj.rightPressed || obj.leftPressed?
    f = 0.17 : f = 0.1

    obj.jump  && obj.above >= 0  ?
    obj.y -= (obj.above -= f) : start()
        
    // console.log(obj.g)
}
function dibujo(obj) {
    ctx.fillStyle = `rgb(${obj.color})`;
    ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
}
// The game start

let updateGame 

function start() {
    updateGame = setInterval(update, 1000 / fps)
}

let mecha = new Image();
mecha.src = "./img/meca.png"

function clear() {
    ctx.drawImage(fondo, 0, 0, canvas.width, canvas.height)
    player.x = 65
    player.y = 695
    end = false
    playDiv.style.width = "210px"
    currency = [
        {id: 0, x: 200, y: 700, width: 50, height: 40},
        {id: 1, x: 600, y: 700, width: 50, height: 40},
        {id: 2, x: 300, y: 230, width: 50, height: 40},
        {id: 3, x: 980, y: 550, width: 50, height: 40},
        {id: 4, x: 750, y: 230, width: 50, height: 40},
        {id: 5, x: 580, y: 500, width: 50, height: 40},
        {id: 6, x: 200, y: 500, width: 50, height: 40},
    ]
    countCoin = 0


   portada()
}

function portada() {
    ctx.font="bold italic 80px arial";
    ctx.fillText("sin nombre juego", 300, 150)
    
    ctx.beginPath();
    ctx.fillStyle = `#666`;
    ctx.fillRect(450,450,400, 150); 
    ctx.stroke()

    ctx.fillStyle = `#fff`;
    ctx.font="bold italic 60px arial";
    ctx.fillText("juegar", 560, 540)
    
    ctx.drawImage(mecha, 0, 200, 400, canvas.height- 200)   
}

const playDiv = document.querySelector(".play")

playDiv.onclick = (x) =>{
    start()
    playDiv.style.width = "0px"
    console.log(playDiv);
}

start()