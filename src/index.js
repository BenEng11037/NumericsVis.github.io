var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")

var width = canvas.width, height = canvas.height
var backgroundColor = "rgb(49, 49, 49)"

function clearCanvas() {
    ctx.beginPath()
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, width, height)
    ctx.closePath()
}
clearCanvas()

var sortingAlgoInput = document.getElementById("sortingAlgoInput")
var delayInput = document.getElementById("delayInput")
var numberOfElementsInput = document.getElementById("numberOfElementsInput")
var randomizeBtn = document.getElementById("randomizeBtn")
var startBtn = document.getElementById("startBtn")

var array = []
let lastArray = array  // for smarter rerendering
var delay = parseFloat(delayInput.value)
var numberOfElements = parseInt(numberOfElementsInput.value)
var barColor = "white"
var running = false

//#region array/core stuff

function drawBar(index, value, color=barColor) {
    ctx.beginPath()
    ctx.fillStyle = backgroundColor
    ctx.fillRect(width / numberOfElements * index, height, width / numberOfElements, -height)
    ctx.fillStyle = color
    ctx.fillRect(width / numberOfElements * index, height, width / numberOfElements, height / numberOfElements * (value + 1) * -1)
    ctx.closePath()
}

var lastSelected = -1
function drawSelected(index) {
    drawBar(lastSelected, array[lastSelected])
    drawBar(index, array[index], color="red")
    lastSelected = index
}

function drawArray() {
    for (let i = 0; i < numberOfElements; i++) {
        if (lastArray[i] != array[i]) {
            drawBar(i, array[i])
            lastArray[i] = array[i]
        }
    }
    drawBar(lastSelected, array[lastSelected])
}

async function sleep() {
    if (delay == 0) return
    return new Promise(resolve => {
        setTimeout(() => resolve(2), delay)
    })
}

//#endregion

//#region html element stuff

numberOfElementsInput.onchange = e => {
    let n = parseInt(e.target.value)
    if (n != null && numberOfElements != n) {
        numberOfElements = n
        clearCanvas()
    }
}

delayInput.onchange = e => {
    let d = parseFloat(e.target.value)
    if (d != null && delay != d) {
        delay = d
    }
}

startBtn.onclick = () => {
    running = !running
    if (running) {
        startBtn.textContent = "Stop"
        startBtn.style.backgroundColor = "darkred"
        switch(sortingAlgoInput.value) {
            case "Euler Method":
                eulerMethod(differentialEquation, 0, 1)  // Provide initial x0 and y0 values
                break
            default:
                console.log("Woopsie :(")
                break
        }
    } else {
        stopRunning()
    }
}

function stopRunning() {
    console.log("stopping")
    startBtn.textContent= "Start"
    startBtn.style.backgroundColor = "darkgreen"
    running = false
}

//#endregion

function drawPoint(x, y) {
    ctx.fillStyle = "white";
    ctx.fillRect(x * 10, height - y * 10, 2, 2);  // Adjust scaling as necessary
}

function drawGraph() {
    console.log('Graph updated');  
}
