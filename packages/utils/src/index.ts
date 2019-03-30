export const random = (x: number, y: number): number => Math.round((Math.random() * (y - x)) + x)

export const hexRgb = (hex: number) => {
  var r = (hex >> 16) & 255;
  var g = (hex >> 8) & 255;
  var b = hex & 255;

  return [
    r,
    g,
    b,
  ]
}

export const rgbHex = (r: number, g: number, b: number) => b | (g << 8) | (r << 16)

export const darker = (hex: number, coeff = 0.75) => {
  const [r, g, b] = hexRgb(hex)
  return rgbHex(
    r * coeff,
    g * coeff,
    b * coeff,
  )
}

export const getTint = (player: string) => {
  switch (player) {
    case 'player1': return 0xe64a4a
    case 'player2': return 0x5975ff
    case 'player3': return 0xd6c81f
    case 'player4': return 0xfea6f8
    default: return 0xffffff
  }
}

// source: https://gist.github.com/gre/1650294
export const easing = {
  // no easing, no acceleration
  linear: function (t: number) { return t },
  // accelerating from zero velocity
  easeInQuad: function (t: number) { return t * t },
  // decelerating to zero velocity
  easeOutQuad: function (t: number) { return t * (2 - t) },
  // acceleration until halfway, then deceleration
  easeInOutQuad: function (t: number) { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t },
  // accelerating from zero velocity
  easeInCubic: function (t: number) { return t * t * t },
  // decelerating to zero velocity
  easeOutCubic: function (t: number) { return (--t) * t * t + 1 },
  // acceleration until halfway, then deceleration
  easeInOutCubic: function (t: number) { return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1 },
  // accelerating from zero velocity
  easeInQuart: function (t: number) { return t * t * t * t },
  // decelerating to zero velocity
  easeOutQuart: function (t: number) { return 1 - (--t) * t * t * t },
  // acceleration until halfway, then deceleration
  easeInOutQuart: function (t: number) { return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t },
  // accelerating from zero velocity
  easeInQuint: function (t: number) { return t * t * t * t * t },
  // decelerating to zero velocity
  easeOutQuint: function (t: number) { return 1 + (--t) * t * t * t * t },
  // acceleration until halfway, then deceleration
  easeInOutQuint: function (t: number) { return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t },
  // elastic bounce effect at the beginning
  easeInElastic: function (t: number) { return (.04 - .04 / t) * Math.sin(25 * t) + 1 },
  // elastic bounce effect at the end
  easeOutElastic: function (t: number) { return .04 * t / (--t) * Math.sin(25 * t) },
  // elastic bounce effect at the beginning and end
  easeInOutElastic: function (t: number) { return (t -= .5) < 0 ? (.02 + .01 / t) * Math.sin(90 * t) : (.02 - .01 / t) * Math.sin(90 * t) + 1 },
  easeInSin: function (t: number) { return 1 + Math.sin(Math.PI / 2 * t - Math.PI / 2); },
  easeOutSin: function (t: number) { return Math.sin(Math.PI / 2 * t); },
  easeInOutSin: function (t: number) { return (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2; },
}
