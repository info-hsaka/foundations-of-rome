/** @import { ClientState } from "boardgame.io/src/client/client" */
/** @import { Game } from "./Game" */

import { INVALID_MOVE } from "boardgame.io/src/core/constants"
import { onClick } from "./canvas"

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const feldGröße = 50
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

function gebäudeMarkieren(gebäude) {
  //durchsichtiger machen
  console.log("blubb")
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
  let x = gebäude.koordinaten[0]
  let y = gebäude.koordinaten[1]
  for (let zeile = 0; zeile < gebäude.form.length; zeile++) {
    for (let spalte = 0; spalte < gebäude.form[0].length; spalte++) {
      if (gebäude.form[zeile][spalte] == 1) {
        ctx.fillRect(spalte * 50 + x, zeile * 50 + y, 50, 50)
      }
    }
  }
}

function lagerMalen(state, moves) {
  for (const gebäude of state.G.spieler[state.ctx.currentPlayer].gebäude) {
    let x = gebäude.koordinaten[0]
    let y = gebäude.koordinaten[1]
    if (gebäude.funktion == "geld") {
      ctx.fillStyle = "green"
    } else if (gebäude.funktion == "pops") {
      ctx.fillStyle = "yellow"
    }
    for (let zeile = 0; zeile < gebäude.form.length; zeile++) {
      for (let spalte = 0; spalte < gebäude.form[0].length; spalte++) {
        if (gebäude.form[zeile][spalte] == 1) {
          ctx.fillRect(spalte * 50 + x, zeile * 50 + y, 50, 50)
          onClick(spalte * 50 + x, zeile * 50 + y, 50, 50, () => {
            gebäudeMarkieren(gebäude)
            gebäudeBauenPrüfen(state, moves, gebäude)
          })
        }
      }
    }
    //ctx.fillRect(x, y, gebäude.form[0].length * 50, gebäude.form.length * 50)
    //onClick(x, y, gebäude.form[0].length * 50, gebäude.form.length * 50, () => {
    //gebäude.angeclickt = true
  }
}
function gebäudeAnzeigen(state) {
  for (const spieler of state.G.spieler) {
    for (const gebäude of spieler.gebauteGebäude) {
      ctx.fillStyle = "red"
      let x = gebäude.koordinaten[0]
      let y = gebäude.koordinaten[1]
      for (let zeile = 0; zeile < gebäude.form.length; zeile++) {
        for (let spalte = 0; spalte < gebäude.form[0].length; spalte++) {
          if (gebäude.form[zeile][spalte] == 1) {
            ctx.fillRect(spalte * 50 + x * 50, zeile * 50 + y * 50, 50, 50)
          }
        }
      }
    }
  }
}

function gebäudeBauenPrüfen(state, moves, gebäude) {
  for (const grundstück of state.G.spieler[state.ctx.currentPlayer]
    .grundstücke) {
    let x = grundstück[0] * feldGröße
    let y = grundstück[1] * feldGröße
    let pos = [grundstück[0], grundstück[1]]
    onClick(x, y, feldGröße, feldGröße, () => {
      moves.gebäudeBauen(gebäude, pos)
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

  for (let i = 0; i < state.G.marktplatz.length; i++) {
    let text =
      buchstabe[state.G.marktplatz[i][0]] + (state.G.marktplatz[i][1] + 1)
    let xpos = 35 + i * 66
    ctx.fillText(text, xpos, 475)
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
  lagerMalen(state, moves)
  felderMalen(state)
  gebäudeAnzeigen(state)

  for (let zeile = 0; zeile < 8; zeile++) {
    for (let spalte = 0; spalte < 8; spalte++) {
      let x = spalte * feldGröße
      let y = zeile * feldGröße
      ctx.fillStyle = "black"
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
            //felderMalen(state)

            console.log("angeklickt")
            //marktplatzMalen(state)
          })
        }
      }
      //felderMalen(state)
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
  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, 20000, 2000)
}
