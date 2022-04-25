import {
  setCustomProperty,
  incrementCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

const SPEED = 0.05
const CAR_INTERVAL_MIN = 500
const CAR_INTERVAL_MAX = 2000
const worldElem = document.querySelector("[data-world]")

let nextCarTime
export function setupCar() {
  nextCarTime = CAR_INTERVAL_MIN
  document.querySelectorAll("[data-car]").forEach(car => {
    car.remove()
  })
}

export function updateCar(delta, speedScale) {
  document.querySelectorAll("[data-car]").forEach(car => {
    incrementCustomProperty(car, "--left", delta * speedScale * SPEED * -1)
    if (getCustomProperty(car, "--left") <= -100) {
      car.remove()
    }
  })

  if (nextCarTime <= 0) {
    createCar1()
    nextCarTime =
      randomNumberBetween(CAR_INTERVAL_MIN, CAR_INTERVAL_MAX) / speedScale
  }
  nextCarTime -= delta
}

export function getCarRects() {
  return [...document.querySelectorAll("[data-car")].map(car => {
    return car.getBoundingClientRect()
  })
}

function createCar1() {
  const car = document.createElement("img")
  car.dataset.car = true
  car.src = "imgs/car.png"
  car.classList.add("car")
  setCustomProperty(car, "--left", 100)
  worldElem.append(car)
}



function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
