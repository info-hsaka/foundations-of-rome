/** @import { ClientState } from "boardgame.io/src/client/client" */
/** @import { Game } from "./Game" */

import { onClick } from "./canvas"

export function draw(
  /** @type {ClientState<[ReturnType<Game["setup"]>]>} */
  state,
  /** @type{Record<string, (...args: any[]) => void>} */
  moves,
) {
  const canvas = document.getElementById("canvas")
  const ctx = canvas.getContext("2d")
  let feldGröße = 50

  for (let zeile = 0; zeile < 8; zeile++) {
    for (let spalte = 0; spalte < 8; spalte++) {
      let x = spalte * feldGröße
      let y = zeile * feldGröße
      console.log(state.G.marktplatz)
      for (const karte of state.G.marktplatz) {
        if (x == karte[0] && y == karte[1]) {
          ctx.strokeStyle = "orangered"
        } else {
          ctx.strokeStyle = "black"
        }
      }

      ctx.strokeRect(x, y, feldGröße, feldGröße)
      onClick(x, y, feldGröße, feldGröße, () => {
        console.log("angeklickt")
        // moves.geldNehmen() // nachdem Felder markiert wurden, Sachen vom Marktplatz kaufen
      })
    }
  }
  // draw here
  ctx.fillStyle = "black"
  ctx.fillRect(425, 0, 200, 75)
  ctx.fillStyle = "white"
  ctx.font = "20px Arial"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText("Geld nehmen", 525, 38)
  onClick(425, 0, 200, 75, () => {
    moves.geldNehmen()
  })
}
