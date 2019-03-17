//โหลดรูปภาพ
let dino = new Image()
let map = new Image()
map.src = 'image/map.jpg'
dino.src = 'image/dino_idle.png'
//เริ่มเกมส์ จะเรียกฟังก์ชัน start()
map.onload = () => start()
//เข้าถึง tag canvas
let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')

const scale = 4 //กำหนดขนาด dino ที่จะเเสดงใน canvas
const width = 41 //ความกว้าง dino
const height = 40 //ความยาว dino
const scaleWidth = scale * width
const scaleHeigth = scale * height
ground  = 480 //ตำเเหน่งพื้นที่ dino ยืน
canvasY = 0 
gravity = 20 //เเรงโน้วถ่วง

let drawFram = (framX, framY, canvasX) => {
    ctx.drawImage(map, 0, 0)
    ctx.drawImage(dino, framX * width, framY * height, width, height, canvasX, canvasY, scaleWidth, scaleHeigth)

    if (canvasY < ground){
        canvasY += gravity
    }
    window.addEventListener('click', jump) //เวลาคลิ๊กเเล้ว ฟังก์ชัน jump() จะทำงาน
}
let jump = () => {
    //กระโดดขึ้น 200
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
    
    /*ส่ง sprite ไปทำงานใน draw(framX, framY, canvasX)
        framX คือ cycleLoop[currentLoopIndex]
        framY คือ 0
        canvasx คือ 0
    */
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

