/** @import { ClientState } from "boardgame.io/src/client/client" */
/** @import { Game } from "./Game" */

import { INVALID_MOVE } from "boardgame.io/src/core/constants"
import { onClick } from "./canvas"

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
let feldGröße = 50
function felderMalen(state) {
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
        ctx.fillStyle = "rgb(102, 60, 121)"
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
}

function lagerMalen(state) {
  console.log(state)

  for (const gebäude of state.G.spieler[state.ctx.currentPlayer].gebäude) {
    let x = gebäude.koordinaten[0]
    let y = gebäude.koordinaten[1]
    console.log(x, y)
    if (gebäude.funktion == "geld") {
      ctx.fillStyle = "green"
    } else if (gebäude.funktion == "pops") {
      ctx.fillStyle = "yellow"
    }
    ctx.fillRect(x, y, gebäude.form[0].length * 50, gebäude.form.length * 50)
    onClick(x, y, gebäude.form[0].length * 50, gebäude.form.length * 50, () => {
      gebäude.angeclickt = true
    })
  }
}

//Einträge Marktplatz Funktion

function marktplatzMalen(state) {
  ctx.fillStyle = "grey"
  ctx.font = "20px Arial"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"

  let buchstabe = ["A", "B", "C", "D", "E", "F", "G", "H"]

  console.log(state.G.marktplatz)
  for (let i = 0; i < state.G.marktplatz.length; i++) {
    let text =
      buchstabe[state.G.marktplatz[i][0]] + (state.G.marktplatz[i][1] + 1)
    let xpos = 35 + i * 66
    ctx.fillText(text, xpos, 475)
    console.log(text)
  }
}

export function draw(
  /** @type {ClientState<[ReturnType<Game["setup"]>]>} */
  state,
  /** @type{Record<string, (...args: any[]) => void>} */
  moves,
) {
  const canvas = document.getElementById("canvas")
  const ctx = canvas.getContext("2d")
  let feldGröße = 50
  //ctx.clearRect(0, 0, canvas.width, canvas.height)
  marktplatzMalen(state)
  lagerMalen(state)

  for (let zeile = 0; zeile < 8; zeile++) {
    for (let spalte = 0; spalte < 8; spalte++) {
      let x = spalte * feldGröße
      let y = zeile * feldGröße
      ctx.fillStyle = "grey"
      ctx.font = "20px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      let buchstabe = ["A", "B", "C", "D", "E", "F", "G", "H"]
      let text = buchstabe[spalte] + (zeile + 1)
      ctx.fillText(text, x + 25, y + 25)
      for (let i = 0; i < state.G.marktplatz.length; i++) {
        if (
          spalte == state.G.marktplatz[i][0] &&
          zeile == state.G.marktplatz[i][1]
        ) {
          //Karten im Marktplatz markieren
          ctx.strokeStyle = "orange"
          ctx.lineWidth = "6"
          ctx.strokeRect(x + 4, y + 4, feldGröße - 8, feldGröße - 8)

          // Einträge Marktplatz
        } else {
          ctx.lineWidth = "1"
          ctx.strokeStyle = "black"
          ctx.strokeRect(x, y, feldGröße, feldGröße)
        }
      }
      for (let i = 0; i < state.G.marktplatz.length; i++) {
        if (
          spalte == state.G.marktplatz[i][0] &&
          zeile == state.G.marktplatz[i][1]
        ) {
          onClick(x, y, feldGröße, feldGröße, () => {
            moves.grundstückKaufen(i)
            felderMalen(state)

            console.log("angeklickt")
            //marktplatzMalen(state)
          })
        }
      }
      felderMalen(state)
    }
  }
  // draw here
  //Geld nehmen Knopf
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

  //Geld UI
  //ctx.strokeStyle = "black"
  //ctx.lineWidth = "3"
  //ctx.strokeRect(425, 100, 88, 50)
  if (state.ctx.currentPlayer == "0") {
    ctx.fillStyle = "rgb(255, 182, 36)"
    ctx.fillRect(425, 100, 88, 50)
  } else if (state.ctx.currentPlayer == "1") {
    ctx.fillStyle = "rgb(107, 133, 74)"
    ctx.fillRect(425, 100, 88, 50)
  } else if (state.ctx.currentPlayer == "2") {
    ctx.fillStyle = "rgb(102, 60, 121)"
    ctx.fillRect(425, 100, 88, 50)
  } else if (state.ctx.currentPlayer == "3") {
    ctx.fillStyle = "rgb(111, 169, 187)"
    ctx.fillRect(425, 100, 88, 50)
  }

  ctx.fillStyle = "black"
  ctx.font = "20px Arial"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText(
    "" + state.G.spieler[state.ctx.currentPlayer].geld + "€",
    469,
    125,
  )

  //Pops UI
  //ctx.strokeStyle = "black"
  //ctx.lineWidth = "3"
  //ctx.strokeRect(425, 100, 88, 50)
  if (state.ctx.currentPlayer == "0") {
    ctx.fillStyle = "rgb(255, 182, 36)"
    ctx.fillRect(538, 100, 88, 50)
  } else if (state.ctx.currentPlayer == "1") {
    ctx.fillStyle = "rgb(107, 133, 74)"
    ctx.fillRect(538, 100, 88, 50)
  } else if (state.ctx.currentPlayer == "2") {
    ctx.fillStyle = "rgb(102, 60, 121)"
    ctx.fillRect(538, 100, 88, 50)
  } else if (state.ctx.currentPlayer == "3") {
    ctx.fillStyle = "rgb(111, 169, 187)"
    ctx.fillRect(538, 100, 88, 50)
  }

  ctx.fillStyle = "black"
  ctx.font = "20px Arial"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText(
    "" + state.G.spieler[state.ctx.currentPlayer].bevölkerung + " Pops",
    582,
    125,
  )

  //angeclickte Gebäude umranden

  for (const gebäude of state.G.spieler[state.ctx.currentPlayer].gebäude) {
    //rot umranden
    if (gebäude.angeclickt == true) {
      ctx.strokeStyle = "Red"
      ctx.lineWidth = "3"
      ctx.strokeRect(
        gebäude.koordinaten[0],
        gebäude.koordinaten[1],
        gebäude.form[0].length * 50,
        gebäude.form.length * 50,
      )
    }
  }
}
