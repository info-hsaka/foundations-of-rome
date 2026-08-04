/** @import { Game, Move } from "boardgame.io" */
import { TurnOrder } from "boardgame.io/core"
import { INVALID_MOVE } from "boardgame.io/core"
/** @type {Game} */
export const Game = {
  setup: ({ random, ctx }) => {
    let deck = []
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        deck.push([x, y])
      }
    }
    deck = random.Shuffle(deck)
    let marktplatz = []
    for (let i = 0; i < 6; i++) {
      marktplatz.push(deck.shift())
    }
    console.log(marktplatz)

    let spieler = []
    let spielfeld = [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ]
    for (let s = 0; s < 3; s++) {
      let grundstücke = []
      for (let i = 0; i < 6; i++) {
        spielfeld[deck[0][0]][deck[0][1]] = s
        grundstücke.push(deck.shift())
      }
      spieler.push({
        geld: 5 + s,
        bevölkerung: 0,
        sp: 0,
        grundstücke: grundstücke,
        gebauteGebäude: [],
        gebäude: [
          //1x1 Gebäude
          {
            koordinaten: [985, 240],
            funktion: "geld",
            form: [[1]],
            gebaut: false,
            wert: 1,
            id: 0,
            grafik: [],
          },
          {
            koordinaten: [1040, 240],
            funktion: "geld",
            form: [[1]],
            gebaut: false,
            wert: 1,
            id: 1,
            grafik: [],
          },
          {
            koordinaten: [650, 240],
            funktion: "pops",
            form: [[1]],
            gebaut: false,
            wert: 1,
            id: 2,
            grafik: [],
          },
          {
            koordinaten: [705, 240],
            funktion: "pops",
            form: [[1]],
            gebaut: false,
            wert: 1,
            id: 3,
            grafik: [],
          },
          //2x1 Gebäude
          {
            koordinaten: [880, 180],
            funktion: "geld",
            form: [[1, 1]],
            gebaut: false,
            wert: 1,
            id: 4,
            sp: 2,
            grafik: [],
          },
          {
            koordinaten: [880, 240],
            funktion: "geld",
            form: [[1, 1]],
            gebaut: false,
            wert: 1,
            id: 5,
            sp: 2,
            grafik: [],
          },
          {
            koordinaten: [760, 180],
            funktion: "pops",
            form: [[1, 1]],
            gebaut: false,
            wert: 2,
            id: 6,
            grafik: [],
          },
          {
            koordinaten: [760, 240],
            funktion: "pops",
            form: [[1, 1]],
            gebaut: false,
            wert: 2,
            id: 7,
            grafik: [],
          },
          //L-Gebäude
          {
            koordinaten: [990, 130],
            funktion: "geld",
            form: [
              [0, 1],
              [1, 1],
            ],
            gebaut: false,
            wert: 2,
            id: 8,
            sp: 3,
            grafik: [],
          },
          {
            koordinaten: [650, 130],
            funktion: "pops",
            form: [
              [1, 0],
              [1, 1],
            ],
            gebaut: false,
            wert: 4,
            id: 9,
            grafik: [],
          },
          //3x1 Gebäude
          {
            koordinaten: [880, 120],
            funktion: "geld",
            form: [[1, 1, 1]],
            gebaut: false,
            wert: 2,
            id: 10,
            sp: 3,
            grafik: [],
          },
          {
            koordinaten: [710, 120],
            funktion: "pops",
            form: [[1, 1, 1]],
            gebaut: false,
            wert: 4,
            id: 11,
            grafik: [],
          },
          //2x2 Gebäude
          {
            koordinaten: [650, 0],
            funktion: "pops",
            form: [
              [1, 1],
              [1, 1],
            ],
            gebaut: false,
            wert: 6,
            id: 12,
            grafik: [],
          },
          {
            koordinaten: [990, 0],
            funktion: "geld",
            form: [
              [1, 1],
              [1, 1],
            ],
            gebaut: false,
            wert: 4,
            id: 13,
            sp: 5,
            grafik: [],
          },
          //4x1 Gebäude
          {
            koordinaten: [775, 60],
            funktion: "pops",
            form: [[1, 1, 1, 1]],
            gebaut: false,
            wert: 6,
            id: 14,
            grafik: [],
          },
          {
            koordinaten: [775, 0],
            funktion: "geld",
            form: [[1, 1, 1, 1]],
            gebaut: false,
            wert: 3,
            id: 15,
            sp: 5,
            grafik: [],
          },
        ],
      })
    }
    console.log(spieler)

    return {
      spielfeld: spielfeld,
      deck: deck,
      spieler: spieler,
      marktplatz: marktplatz,
    }
  },

  moves: {
    /** @type {Move} */
    geldNehmen: function geldNehmen(move) {
      let extraGeld = 0
      for (const gebäude of move.G.spieler[move.playerID].gebäude) {
        if (gebäude.funktion == "geld" && gebäude.gebaut == true) {
          extraGeld += gebäude.wert
        }
      }
      move.G.spieler[move.playerID].geld += 5 + extraGeld // noch nicht in Praxis versucht
    },
    grundstückKaufen: function grundstückKaufen(move, grundstückPos) {
      let preisliste = [2, 3, 4, 6, 8, 10]
      let preis = preisliste[grundstückPos]
      console.log("preis: " + preis)

      if (move.G.spieler[move.playerID].geld >= preis) {
        move.G.spieler[move.playerID].grundstücke.push(
          move.G.marktplatz[grundstückPos],
        ) // eslint-disable-line
        move.G.spielfeld[move.G.marktplatz[grundstückPos][0]][
          move.G.marktplatz[grundstückPos][1]
        ] = move.playerID
        move.G.spieler[move.playerID].geld -= preis

        move.G.marktplatz.splice(grundstückPos, 1)
        if (move.G.deck.length != 0) {
          move.G.marktplatz.push(move.G.deck.shift())
        }
      } else {
        return INVALID_MOVE
      }
    },
    //noch nicht fertig
    gebäudeBauen: function gebäudeBauen(move, gebäude, pos) {
      console.log(gebäude, pos)
      for (let zeile = 0; zeile < gebäude.form.length; zeile++) {
        for (let spalte = 0; spalte < gebäude.form[0].length; spalte++) {
          if (gebäude.form[zeile][spalte] == 1) {
            if (
              move.G.spielfeld[pos[0] + spalte][pos[1] + zeile] == move.playerID
            ) {
              console.log("ananas")
              //nochmal drüberschaun bitte
            } else {
              return INVALID_MOVE
            }
          }
        }
      }

      for (let i = 0; i < move.G.spieler[move.playerID].gebäude.length; i++) {
        let element = move.G.spieler[move.playerID].gebäude[i]
        if (element.id == gebäude.id) {
          element.koordinaten = pos
          move.G.spieler[move.playerID].gebauteGebäude.push(element)
          move.G.spieler[move.playerID].gebäude.splice(i, 1)
          if (element.funktion == "pops") {
            move.G.spieler[move.playerID].bevölkerung += element.wert
          }
        }
      }
    },
  },

  //seed: "random-see1d",

  turn: {
    order: TurnOrder.DEFAULT,

    onBegin: ({ G, ctx, events, random }) => {},
    onEnd: ({ G, ctx, events, random }) => {},

    minMoves: 1,
    maxMoves: 1,
  },

  minPlayers: 2,
  maxPlayers: 3,

  disableUndo: true,

  endIf: ({ G, ctx, random }) => {},
}
