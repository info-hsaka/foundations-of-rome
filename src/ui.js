/** @import { ClientState } from "boardgame.io/src/client/client" */
/** @import { Game } from "./Game" */

import { INVALID_MOVE } from "boardgame.io/src/core/constants"
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
  let i = 0
  for (let zeile = 0; zeile < 8; zeile++) {
    for (let spalte = 0; spalte < 8; spalte++) {
      let x = spalte * feldGröße
      let y = zeile * feldGröße
      ctx.fillStyle = "grey"
      ctx.font = "20px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      let buchstabe = ["A", "B", "C", "D", "E", "F", "G", "H"]
      let text = buchstabe[zeile] + (spalte + 1)
      ctx.fillText(text, x + 25, y + 25)
      for (let i = 0; i < 6; i++) {
        if (
          spalte == state.G.marktplatz[i][0] &&
          zeile == state.G.marktplatz[i][1]
        ) {
          //Karten im Marktplatz markieren
          ctx.strokeStyle = "orange"
          ctx.lineWidth = "6"
          ctx.strokeRect(x + 4, y + 4, feldGröße - 8, feldGröße - 8)

          let xpos = 35 + i * 66
          ctx.fillText(text, xpos, 475) // Einträge Marktplatz
        } else {
          ctx.lineWidth = "1"
          ctx.strokeStyle = "black"
          ctx.strokeRect(x, y, feldGröße, feldGröße)
        }
      }
      for (let i = 0; i < 6; i++) {
        if (
          spalte == state.G.marktplatz[i][0] &&
          zeile == state.G.marktplatz[i][1]
        ) {
          onClick(x, y, feldGröße, feldGröße, () => {
            console.log("angeklickt")
            moves.grundstückKaufen(i)

            for (let zeile = 0; zeile < 8; zeile++) {
              for (let spalte = 0; spalte < 8; spalte++) {
                if (state.G.spielfeld[spalte][zeile] == "0") {
                  ctx.fillStyle = "rgb(255, 182, 36)"
                  let x = spalte * feldGröße
                  let y = zeile * feldGröße
                  ctx.fillRect(x, y, feldGröße, feldGröße)
                } else if (state.G.spielfeld[spalte][zeile] == "1") {
                  ctx.fillStyle = "rgb(107, 133, 74)"
                  let x = spalte * feldGröße
                  let y = zeile * feldGröße
                  ctx.fillRect(x, y, feldGröße, feldGröße)
                } else if (state.G.spielfeld[spalte][zeile] == "2") {
                  ctx.fillStyle = "rgb(89, 80, 130)"
                  let x = spalte * feldGröße
                  let y = zeile * feldGröße
                  ctx.fillRect(x, y, feldGröße, feldGröße)
                } else if (state.G.spielfeld[spalte][zeile] == "3") {
                  ctx.fillStyle = "rgb(111, 169, 187)"
                  let x = spalte * feldGröße
                  let y = zeile * feldGröße
                  ctx.fillRect(x, y, feldGröße, feldGröße)
                }
              }
            }
            ctx.fillStyle = "white"
            ctx.fillRect(15, 465, 370, 70)
          })
        }
      }
      for (let zeile = 0; zeile < 8; zeile++) {
        for (let spalte = 0; spalte < 8; spalte++) {
          if (state.G.spielfeld[spalte][zeile] == "0") {
            ctx.fillStyle = "yellow"
            let x = spalte * feldGröße
            let y = zeile * feldGröße
            ctx.fillRect(x, y, feldGröße, feldGröße)
          } else if (state.G.spielfeld[spalte][zeile] == "1") {
            ctx.fillStyle = "green"
            let x = spalte * feldGröße
            let y = zeile * feldGröße
            ctx.fillRect(x, y, feldGröße, feldGröße)
          } else if (state.G.spielfeld[spalte][zeile] == "2") {
            ctx.fillStyle = "purple"
            let x = spalte * feldGröße
            let y = zeile * feldGröße
            ctx.fillRect(x, y, feldGröße, feldGröße)
          }
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

  ctx.fillStyle = "black"
  ctx.font = "20px Arial"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText("2€", 35, 425)
  ctx.fillText("3€", 101, 425)
  ctx.fillText("4€", 167, 425)
  ctx.fillText("6€", 233, 425)
  ctx.fillText("8€", 299, 425)
  ctx.fillText("10€", 365, 425)
}
