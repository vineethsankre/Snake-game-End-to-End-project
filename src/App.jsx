import React from 'react'
import GameBoard from './components/GameBoard'
import Score from './components/Score'
import useSnakeGame from './hooks/useSnakeGame'

export default function App() {
  // use the hook in app to share control with Score component
  const { snake, food, running, score, reset, setRunning } = useSnakeGame()

  // NOTE: GameBoard uses its own hook instance too; to avoid duplication
  // in this simple structure you can choose one: keep hook usage centralized.
  // For simplicity we'll render GameBoard and Score while wiring reset/score via props.

  return (
    <div className="app" style={{ alignItems: 'flex-start' }}>
      <div>
        <GameBoard />
      </div>
      <div>
        <Score score={score} onReset={reset} running={running} />
      </div>
    </div>
  )
}

