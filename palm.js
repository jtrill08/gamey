import {
    setCustomProperty,
    incrementCustomProperty,
    getCustomProperty,
  } from "./updateCustomProperty.js"
  
  const SPEED = 0.03
  const PALM_INTERVAL_MIN = 100
  const PALM_INTERVAL_MAX = 4000
  const worldElem = document.querySelector("[data-world]")
  
  let nextPalmTime
  export function setupPalm() {
    nextPalmTime = PALM_INTERVAL_MIN
    document.querySelectorAll("[data-palm]").forEach(palm => {
      palm.remove()
    })
  }
  
  export function updatePalm(delta, speedScale) {
    document.querySelectorAll("[data-palm]").forEach(palm => {
      incrementCustomProperty(palm, "--left", delta * speedScale * SPEED * -1)
      if (getCustomProperty(palm, "--left") <= -100) {
        palm.remove()
      }
    })
  
    if (nextPalmTime <= 0) {
      createPalm()
      createPalmBig()
      nextPalmTime =
        randomNumberBetween(PALM_INTERVAL_MIN, PALM_INTERVAL_MAX) / speedScale
    }
    nextPalmTime -= delta
  }
  
  export function getPalmRects() {
    return [...document.querySelectorAll("[data-palm]")].map(palm => {
      return palm.getBoundingClientRect()
    })
  }
  
  function createPalm() {
    const palm = document.createElement("img")
    palm.dataset.palm = true
    palm.src = "imgs/palm.png"
    palm.classList.add("palm")
    setCustomProperty(palm, "--left", 100)
    worldElem.append(palm)
  }

  function createPalmBig() {
    const palm = document.createElement("img")
    palm.dataset.palm = true
    palm.src = "imgs/palm.png"
    palm.classList.add("palmBig")
    setCustomProperty(palm, "--left", 300)
    worldElem.append(palm)
  }
  
  function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  