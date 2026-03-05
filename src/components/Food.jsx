import { TILE } from '../config'

export default function Food(ctx, foodPos) {
  if (!ctx || !foodPos) return
  const x = foodPos.x * TILE
  const y = foodPos.y * TILE
  // outer glow
  ctx.fillStyle = 'rgba(239,68,68,0.2)'
  ctx.fillRect(x - 2, y - 2, TILE + 4, TILE + 4)
  // center
  ctx.fillStyle = '#ef4444'
  ctx.fillRect(x + 2, y + 2, TILE - 4, TILE - 4)
}

