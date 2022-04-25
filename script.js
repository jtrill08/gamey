import { updateGround, setupGround } from "./ground.js"
import { updateDino, setupDino, getDinoRect, setDinoLose } from "./dino.js"
import { updateCar, setupCar, getCarRects } from "./car.js"
import { updatePalm, setupPalm } from "./palm.js"
import { updateCloud, setupCloud } from "./clouds.js"



const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
const SPEED_SCALE_INCREASE = 0.00001

const scoreElem = document.querySelector("[data-score]")
const highScoreElem = document.querySelector("[data-highscore]")
const startScreenElem = document.querySelector("[data-start-screen]")
const startScreen2Elem = document.querySelector("[data-start-screen2]")
const endScreenElem = document.querySelector("[data-end-screen]")


document.addEventListener("keydown", handleStart, { once: true })


let lastTime
let speedScale
let score
let endScreen = document.querySelector("[data-end-screen]")
function update(time) {
  if (lastTime == null) {
    lastTime = time
    window.requestAnimationFrame(update)
    return
  }
  
  const delta = time - lastTime

  updateGround(delta, speedScale)
  updateDino(delta, speedScale)
  updateCar(delta, speedScale)
  updatePalm(delta, speedScale)
  updateSpeedScale(delta)
  updateScore(delta)
  updateCloud(delta,speedScale)
  if (checkLose()) return handleLose()

  lastTime = time
  window.requestAnimationFrame(update)
}


function checkLose() {
  const dinoRect = getDinoRect()
  return getCarRects().some(rect => isCollision(rect, dinoRect))

}

function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  )
  
}

function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE
}

let highScore
let offHighScore


function updateHScore(){
  highScore = localStorage.getItem('myCar')
  highScoreElem.textContent =Math.floor(highScore)  
  offHighScore = highScoreElem.textContent
}


function updateScore(delta) {
  let officialScore=score += delta * 0.01
  scoreElem.textContent = Math.floor(officialScore)
  localStorage.setItem('myCar', officialScore)
}
console.log(localStorage)
console.log(highScore)

function handleStart() {
  lastTime = null
  speedScale = 1
  score = 0
  highScore = 0
  updateHScore()
  setupGround()
  setupDino()
  setupCar()
  setupPalm()
  setupCloud()
  startScreenElem.classList.add("hide")
  startScreen2Elem.classList.add("hide")
  endScreenElem.classList.add("hide")
  
  window.requestAnimationFrame(update)
}

function handleLose() {
  setDinoLose()

  setTimeout(() => {
    document.addEventListener("keydown", handleStart, { once: true })
   
    endScreenElem.classList.remove("hide")
    endScreen.textContent ="GAME OVER"
  }, 100)

  function soundEnd(){
    var audio = new Audio('War.mp3');
    audio.play();
  }
  soundEnd()

  


}


