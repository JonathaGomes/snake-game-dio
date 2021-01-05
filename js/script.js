let canvas = document.getElementById("snake")
let context = canvas.getContext("2d")
let box = 32
let snake = []
snake[0] = {
    x: 4 * box, 
    y: 4 * box
}
let direction = "right"
let comida = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG() {
    context.fillStyle = "lightgreen"
    context.fillRect(0, 0, 16 * box, 16 * box)
}

function criarCobrinha() {
    for(i=0; i < snake.length; i++) {
        context.fillStyle = "green"
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
}

function gerarComida() {
    context.fillStyle = "red"
    context.fillRect(comida.x, comida.y, box, box)
}

document.addEventListener("keydown", update)

function update(event) {
    if(event.keyCode == 37 && direction != "right") direction = "left"
    if(event.keyCode == 38 && direction != "down") direction = "up"
    if(event.keyCode == 39 && direction != "left") direction = "right"
    if(event.keyCode == 40 && direction != "up") direction = "down"
}

function iniciarJogo() {

    if (wall == "morre") {
        if((snake[0].x > 15 * box) || (snake[0].x < 0 * box) || (snake[0].y > 15 * box) || (snake[0].y < 0 * box)){
            clearInterval(jogo)
            location.reload()
        } 
    } else {
        if(snake[0].x > 15 * box) snake[0].x = 0
        if(snake[0].x < 0) snake[0].x = 16 * box
        if(snake[0].y > 15 * box) snake[0].y = 0
        if(snake[0].y < 0) snake[0].y = 16 * box
    }


    for(i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo)
            location.reload()
        }
    }

    criarBG()
    criarCobrinha()
    gerarComida()

    let snakeX = snake[0].x 
    let snakeY = snake[0].y

    if(direction == "right") snakeX += box
    if(direction == "left") snakeX -= box
    if(direction == "up") snakeY -= box
    if(direction == "down") snakeY += box
    
    if (snakeX != comida.x || snakeY != comida.y) {
        snake.pop()
    } else {
        comida.x = Math.floor(Math.random() * 15 + 1) * box,
        comida.y = Math.floor(Math.random() * 15 + 1) * box
    }

    let novaCabeca = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(novaCabeca)
}

let wall
let buttonDificulty = document.getElementById("dificulty")
buttonDificulty.addEventListener("click", function(){
    let dificuldade = 150
    dificuldade = document.getElementById("dificuldade")
    alert("Velocidade da cobra em MS: " + dificuldade.value)
})

let buttonWall = document.getElementById("wall")
buttonWall.addEventListener("click", function(){
    let parede = "vive"
    parede = document.getElementById("parede").value
    wall = parede
    alert("Se você bater na parede você: " + wall)
})

function jogo(){
    let game = setInterval(iniciarJogo, dificuldade.value)
}

let button = document.getElementById("game")
button.addEventListener("click", jogo)
