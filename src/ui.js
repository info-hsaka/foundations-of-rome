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
      for (const karte of state.G.marktplatz) {
        ctx.fillStyle = "grey"
        ctx.font = "20px Arial"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        let buchstabe = ["A", "B", "C", "D", "E", "F", "G", "H"]
        let text = buchstabe[zeile] + (spalte + 1)
        ctx.fillText(text, x + 25, y + 25)
        if (spalte == karte[0] && zeile == karte[1]) {
          ctx.strokeStyle = "orange"
          ctx.lineWidth = "6"
          ctx.strokeRect(x + 4, y + 4, feldGröße - 8, feldGröße - 8)
        } else {
          ctx.lineWidth = "1"
          ctx.strokeStyle = "black"
          ctx.strokeRect(x, y, feldGröße, feldGröße)
        }

        for (let i = 0; i < 6; i++) {
          if (
            spalte == state.G.marktplatz[i][0] &&
            zeile == state.G.marktplatz[i][1]
          ) {
            onClick(x, y, feldGröße, feldGröße, () => {
              console.log("angeklickt")
              moves.grundstückKaufen(i)
              ctx.clearRect(x + 1, y + 1, feldGröße - 2, feldGröße - 2)
            })
          }
        }
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
}
