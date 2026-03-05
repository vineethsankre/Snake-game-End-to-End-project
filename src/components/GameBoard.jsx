import React, { useEffect, useRef } from 'react'
import useSnakeGame from '../hooks/useSnakeGame'
import { CANVAS_SIZE, TILE } from '../config'
import Snake from './Snake'
import Food from './Food'

export default function GameBoard() {
  const canvasRef = useRef(null)
  const { snake, food, running } = useSnakeGame() // uses its own state
  // Note: we use the hook again here to control rendering too.
  // draw loop: re-draw whenever snake or food changes
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    // clear
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)

    // grid background
    ctx.fillStyle = '#031018'
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)

    // faint grid lines
    ctx.strokeStyle = 'rgba(255,255,255,0.02)'
    for (let x = 0; x < CANVAS_SIZE; x += TILE) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, CANVAS_SIZE); ctx.stroke()
    }
    for (let y = 0; y < CANVAS_SIZE; y += TILE) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(CANVAS_SIZE, y); ctx.stroke()
    }

    // draw snake + food via components helpers
    Snake(ctx, snake)
    Food(ctx, food)

    // overlay when paused
    if (!running) {
      ctx.fillStyle = 'rgba(2,6,23,0.5)'
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
      ctx.fillStyle = '#fff'
      ctx.font = '24px Inter, Arial'
      ctx.fillText('Paused / Game Over', 20, CANVAS_SIZE / 2)
    }

  }, [snake, food, running])

  return (
    <div className="game-area panel">
      <canvas id="gameCanvas" ref={canvasRef} width={CANVAS_SIZE} height={CANVAS_SIZE} />
      <div className="small">Use Arrow keys or WASD • Space/Enter to pause</div>
    </div>
  )
}

