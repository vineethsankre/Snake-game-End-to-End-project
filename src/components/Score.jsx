import React from 'react'

export default function Score({ score, onReset, running }) {
  return (
    <div className="panel sidebar">
      <div className="header">
        <div className="h1">🐍 Snake</div>
      </div>

      <div className="score">{score}</div>
      <div className="info">Use Arrow keys or WASD to play. Space/Enter to pause.</div>

      <div className="controls">
        <button className="primary" onClick={onReset}>Restart</button>
        <button onClick={() => window.location.reload()}>Reload Page</button>
      </div>

      <div className="small" style={{ marginTop: 12 }}>
        Status: <span className="badge">{running ? 'Running' : 'Stopped'}</span>
      </div>
    </div>
  )
}

