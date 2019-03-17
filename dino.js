//โหลดรูปภาพ
let dino = new Image()
let map = new Image()
map.src = 'image/map.jpg'
dino.src = 'image/dino_idle.png'

map.onload = () => start()
//เข้าถึง tag canvas
let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')

const scale = 4
const width = 41
const height = 40
const scaleWidth = scale * width
const scaleHeigth = scale * height
ground  = 480
canvasY = 0
gravity = 20

let drawFram = (framX, framY, canvasX) => {
    ctx.drawImage(map, 0, 0)
    ctx.drawImage(dino, framX * width, framY * height, width, height, canvasX, canvasY, scaleWidth, scaleHeigth)

    if (canvasY < ground){
        canvasY += gravity
    }
    window.addEventListener('click', jump)
}
let jump = () => {
    //กระโดด
    canvasY -= 200
}
//กำหนดจำนวน dino ใน sprite
const cycleLoop = [0, 1, 2, 3, 4, 5]
let currentLoopIndex = 0
let frameCount = 0

let sprite = () => {
    frameCount++
    //ความเร็วของ Animation
    if (frameCount < 4){
        window.requestAnimationFrame(sprite)
        return
    }

    frameCount = 0
    //เคลียร์ภาพไม่ให้ซ้อนกัน
    ctx.clearRect(0,0,canvas.width,canvas.height)

    drawFram(cycleLoop[currentLoopIndex], 0, 0)
    currentLoopIndex++
    if (currentLoopIndex >= cycleLoop.length){
        currentLoopIndex = 0
    }
    window.requestAnimationFrame(sprite)
}
let start = () => window.requestAnimationFrame(sprite)

//score
document.getElementById("subTitle").innerHTML = "SCORE : " + 1

