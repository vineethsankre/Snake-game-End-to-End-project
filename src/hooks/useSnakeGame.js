import { useEffect, useRef, useState } from 'react'
import { CANVAS_SIZE, TILE, INITIAL_SPEED } from '../config'

const cols = CANVAS_SIZE / TILE
const rows = CANVAS_SIZE / TILE

function randomCoord() {
  return {
    x: Math.floor(Math.random() * cols),
    y: Math.floor(Math.random() * rows)
  }
}

export default function useSnakeGame() {
  const [snake, setSnake] = useState([{ x: Math.floor(cols/2), y: Math.floor(rows/2) }])
  const [dir, setDir] = useState({ x: 1, y: 0 }) // start moving right
  const [food, setFood] = useState(randomCoord)
  const [running, setRunning] = useState(true)
  const [score, setScore] = useState(0)
  const [speed, setSpeed] = useState(INITIAL_SPEED)
  const tickRef = useRef(null)

  // key handler
  useEffect(() => {
    function onKey(e) {
      if (!running) return
      const k = e.key
      if ((k === 'ArrowUp' || k === 'w') && dir.y !== 1) setDir({ x: 0, y: -1 })
      if ((k === 'ArrowDown' || k === 's') && dir.y !== -1) setDir({ x: 0, y: 1 })
      if ((k === 'ArrowLeft' || k === 'a') && dir.x !== 1) setDir({ x: -1, y: 0 })
      if ((k === 'ArrowRight' || k === 'd') && dir.x !== -1) setDir({ x: 1, y: 0 })
      if (k === ' ' || k === 'Enter') setRunning(r => !r) // pause / resume
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [dir, running])

  // game loop
  useEffect(() => {
    if (!running) {
      if (tickRef.current) clearInterval(tickRef.current)
      return
    }
    tickRef.current = setInterval(() => {
      setSnake(prev => {
        const head = { x: prev[0].x + dir.x, y: prev[0].y + dir.y }

        // wall collisions - wrap-around OR game over? We'll use wrap-around
        if (head.x < 0) head.x = cols - 1
        if (head.x >= cols) head.x = 0
        if (head.y < 0) head.y = rows - 1
        if (head.y >= rows) head.y = 0

        // self collision -> reset
        for (let i = 0; i < prev.length; i++) {
          if (prev[i].x === head.x && prev[i].y === head.y) {
            // game over
            setRunning(false)
            return prev
          }
        }

        const newSnake = [head, ...prev]

        // eat food?
        if (head.x === food.x && head.y === food.y) {
          setScore(s => s + 1)
          setFood(randomCoord())
          // optional: speed up slightly
          setSpeed(s => Math.max(40, s - 2))
          // keep tail (grows)
        } else {
          newSnake.pop()
        }

        return newSnake
      })
    }, speed)

    return () => clearInterval(tickRef.current)
  }, [dir, running, food, speed])

  function reset() {
    setSnake([{ x: Math.floor(cols/2), y: Math.floor(rows/2) }])
    setDir({ x: 1, y: 0 })
    setFood(randomCoord())
    setScore(0)
    setSpeed(INITIAL_SPEED)
    setRunning(true)
  }

  return {
    snake, food, running, score, speed,
    setRunning, reset, setFood
  }
}

