import React, { useEffect } from 'react'
import { navigate } from 'hookrouter'
import './login.css'

const Login = () => {
  useEffect(() => {
    window.sessionStorage.removeItem('id')
    window.localStorage.removeItem('id')
  })

  return (
    <div className="screen login">
      <h1>2-game</h1>

      <form
        className="online"
        onSubmit={(e) => {
          e.preventDefault()
          navigate(`/rooms?name=${e.target[0].value}`)
        }}
      >
        <input
          name="pseudo"
          type="text"
          required
          placeholder="pseudo"
        />
        <button
          type="submit"
        >
          Play
        </button>
      </form>

      <button
        className="offline"
        onClick={() => navigate('/game')}
      >
        Play offline
      </button>
    </div>
  )
}

export default Login
