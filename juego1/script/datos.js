const canvas = document.querySelector(".MyJuego");
const ctx = canvas.getContext('2d')

const player = {
    // ubicacion
    x:65, 
    y:690, 
    width:50, 
    height:70,
    // color y movimiento 
    color:"255, 0, 0, 0",
    g: 0,
    jump: false,
    mov: false,
    rightPressed: false,
    leftPressed: false,
    abovePressed: false,
    downPressed: false,
    // fuerza de miv
    right: 4,
    left: 5,
    above: 6,
    contacto: false,
    // animaciones
    src: "./img/Robot.png",
    animar: () => {
        if (fram == 8) {
            if (fram1 == 2) {
                fram2 == 1 ? fram2 = 0 : fram2++
                fram1 = 0
            }else{fram1++}
            fram = 0
        } else{fram++}
    }
}

let plataform = []
function suelo(x, y, w) {
    plataform = plataform.concat({
        x: x,
        y: y,
        width: w, 
        height:40, 
        color:"0, 200, 0",

    })
}
// 
suelo(200, 290, canvas.width -200)
suelo(0, 410, 100)
suelo(canvas.width - 300 , 610, 200)
suelo(canvas.width/2 -100, 560, 200)
suelo(canvas.width/6 -100, 560, 200)
suelo(0, canvas.height -40, canvas.width)

// 
function pisoFlotante() {
    let con = () => {
        player.above = 6;
        player.contacto = true;
    }
    plataform.map( x => {
        dibujo(x)
        if (player.jump == false) {
            colition( x ) ? con() : false
            
        }
    });
}

function groundOfRock() {
    let img = new Image();
    img.src = "./img/suelos.png"
    for (let i = 0; i < 24; i++) {
        ctx.drawImage(img,
            0, 0, 50, 40, 
            50*i, canvas.height -40, 50, 40) 
    }
}

function soilOfEarth(x,y, cantidad) {
    let img = new Image();
    img.src = "./img/suelos.png"
    for (let i = 0; i < cantidad; i++) {
        ctx.drawImage(img,
        //  xh  yh wh  hh
            50, 0, 50, 40, 
        //  x           y    w   h  
            50*i + x,   y,   50, 40) 
    }
} 

let currency = [
    {id: 0, x: 200, y: 700, width: 50, height: 40},
    {id: 1, x: 600, y: 700, width: 50, height: 40},
    {id: 2, x: 300, y: 230, width: 50, height: 40},
    {id: 3, x: 980, y: 550, width: 50, height: 40},
    {id: 4, x: 750, y: 230, width: 50, height: 40},
    {id: 5, x: 580, y: 500, width: 50, height: 40},
    {id: 6, x: 200, y: 500, width: 50, height: 40},
]
function coin(x,y) {
    let img = new Image();
    img.src = "./img/suelos.png"
    ctx.drawImage(img,
    //  xh  yh wh  hh
        100, 0, 50, 40, 
    //  x    y    w   h  
        x,   y,   50, 40
    ) 
} 

// 
function animar(x, y, rW, rH, obj ) {
    let img = new Image();
    img.src = obj.src
    ctx.drawImage(img, 
        rW*x,  rH*y,  rW,        rH,
        obj.x, obj.y, obj.width, obj.height
    )
}



function pressed(obj) {
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    // console.log();
        
    function keyDownHandler(e) {
        if(e.keyCode == 39) {
            obj.rightPressed = true;
        }
        else if(e.keyCode == 37) {
            obj.leftPressed = true;
        }
        else if(e.keyCode == 38) {
            obj.abovePressed = true; 
        }
        // else if(e.keyCode == 40) {
        //     obj.downPressed = true;
        // }
    }
    
    function keyUpHandler(e) {
        if(e.keyCode == 39) {
            obj.rightPressed = false;
        }
        else if(e.keyCode == 37) {
            obj.leftPressed = false;
        }
        else if(e.keyCode == 38) {
            obj.abovePressed = false;
        }
        // else if(e.keyCode == 40) {
        //     obj.downPressed = false;
        // }
    }

    
    if(obj.rightPressed && obj.x + obj.width <= canvas.width ) {obj.x = obj.x + obj.right}
    if(obj.leftPressed && obj.x >= 0)  {obj.x = obj.x - obj.left}
    if(obj.downPressed && obj.y + obj.height <= canvas.height) {obj.y = obj.y + obj.down}
    // if(obj.abovePressed && obj.y >= 0) {obj.y = obj.y - obj.above}
    

}
