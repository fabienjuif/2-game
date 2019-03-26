# 2-game

Just for fun and to try react-pixi from inlet.

- beta16: https://fabienjuif.github.io/2-game/beta16/
  * move game engine in its own package, preparing online mode
  * add grave tile
  * trees spawn randomly around an already spawn tree
  * general UX improvements

- beta15: https://fabienjuif.github.io/2-game/beta15/
  * game is generated until player 1 and 2 has same number of tiles
  * starting gold is set back to 10
  * improve UI so players have a feedback

- beta14: https://fabienjuif.github.io/2-game/beta14/
  * player can play its unit only once a turn
  * units can protect their surrounding

- beta13: https://fabienjuif.github.io/2-game/beta13/
  * bunnies are using tint instead of alpha to appear/disappear
  * unit movements are unbugued

- beta12: https://fabienjuif.github.io/2-game/beta12/
  * rework highlight to use alpha
  * use some memo and optimise context
  * new unit: king, new balances & pries
  * better UI, better showing whos playing
  * gold is processed after the player turn

- beta11: https://fabienjuif.github.io/2-game/beta11/
  * general style improvement
  * cells that are playable are highlighted at the turn begins
    - it uses a generated texture + blend mode to do so
  * light is gone since the highlighted cells are using same principe

- beta10: https://fabienjuif.github.io/2-game/beta10/
  * trees spawn each turn
  * unit can be moved
  * ui is better and shows balance

- beta9: https://fabienjuif.github.io/2-game/beta9/
  * first assets
  * first rules
  * gold

- beta8: https://fabienjuif.github.io/2-game/beta8/
  * click on tile to own it
  * each player can click on 2 tiles
  * add "player turn"

- beta7: https://fabienjuif.github.io/2-game/beta7/
  * light
  * it uses a texture processed on the fly that draw a white circle in the black (with alpha) background
  * then this texture is used with a blendmode

- beta6: https://fabienjuif.github.io/2-game/beta6/
  * fix canvas & UI on mobile

- beta5: https://fabienjuif.github.io/2-game/beta5/
  * "next turn" button to trigger the next tiles turn
  * uses a service (React Context)
  * uses React DOM to build the UI

- beta4: https://fabienjuif.github.io/2-game/beta4/
  * camera
  * bunnies are behind the scene and not in the camera action
  * you can zoom in / zoom out
  * you can move the tiles
  * works on phone

- beta3: https://fabienjuif.github.io/2-game/beta3/
  * beta2 optimisation

- beta2: https://fabienjuif.github.io/2-game/beta2/
  * Trying to add tiles, and add a color transition for each
  * This works not that great, I have to batch modifications I guess

- beta1: https://fabienjuif.github.io/2-game/beta1/
  * Trying to see the limit of sprites that I can have (here 100 bunnys seems fine)
  * Trying some ease function
  * Moving taking `delta` and calculating frames so every devices will move at same speed (but some will have smooth animation, and others not)
