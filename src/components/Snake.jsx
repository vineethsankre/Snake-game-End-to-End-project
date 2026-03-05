// Snake renderer helper (not a React component — simple draw helper)
import { TILE } from '../config'

export default function Snake(ctx, snakeParts = []) {
  if (!ctx) return
  for (let i = 0; i < snakeParts.length; i++) {
    const p = snakeParts[i]
    ctx.fillStyle = i === 0 ? '#10b981' : '#059669'
    ctx.fillRect(p.x * TILE + 1, p.y * TILE + 1, TILE - 2, TILE - 2)

    // small highlight for head
    if (i === 0) {
      ctx.fillStyle = 'rgba(255,255,255,0.12)'
      ctx.fillRect(p.x * TILE + 4, p.y * TILE + 4, TILE - 8, TILE - 8)
    }
  }
}

