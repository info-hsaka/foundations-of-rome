/** @import { Client } from "boardgame.io/client/src" */

/** @type {Client(state: ClientState) => {}}  */
export function draw(state) {
  const canvas = document.getElementById("canvas")
  const ctx = canvas.getContext("2d")
  let feldGröße = 50

  for (let zeile = 0; zeile < 8; zeile++) {
    for (let spalte = 0; spalte < 8; spalte++) {
      let x = spalte * feldGröße
      let y = zeile * feldGröße
      ctx.strokeRect(x, y, feldGröße, feldGröße)
      /*onClick(x, y, feldGröße, feldGröße, () => {
        console.log("angeklickt")
        state.G.moves.geldNehmen()
      })*/
    }
  }
  // draw here
}
