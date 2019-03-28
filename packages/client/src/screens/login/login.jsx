import React, { useEffect } from 'react'
import { navigate } from 'hookrouter'

const Login = () => {
  useEffect(() => {
    window.sessionStorage.removeItem('id')
    window.localStorage.removeItem('id')
  })

  return (
    <div className="screen">
      <button
        onClick={() => navigate('/game')}
      >
        Play offline
      </button>
      <form
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
          Go online
        </button>
      </form>
    </div>
  )
}

export default Login
