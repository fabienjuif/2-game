import { useLayoutEffect, useState } from 'react'

const useBalances = (state) => {
  const [balances, setBalances] = useState({})

  useLayoutEffect(
    () => {
      const balances = state.players.reduce((acc, { name }) => ({ ...acc, [name]: 0 }), {})
      state.tiles.forEach(line => line.forEach((tile) => {
        if (!tile.player) return
        if (tile.empty) return

        balances[tile.player] += tile.gold
      }))

      setBalances(balances)
    },
    [state]
  )

  return balances
}

export default useBalances
