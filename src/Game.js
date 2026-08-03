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
        grundstücke: grundstücke,
        gebäude: [
          {
            koordinaten: [650, 0],
            funktion: "geld",
            form: [[1]],
            gebaut: false,
            wert: 1,
            id: 0,
            angeclickt: false,
          },
          {
            koordinaten: [650, 75],
            funktion: "pops",
            form: [[1]],
            gebaut: false,
            wert: 1,
            id: 1,
            angeclickt: false,
          },
          {
            koordinaten: [725, 0],
            funktion: "geld",
            form: [[1, 1]],
            gebaut: false,
            wert: 1,
            id: 2,
            angeclickt: false,
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
      for (let zeile = 0; zeile < gebäude.form.length; zeile++) {
        for (let spalte = 0; spalte < gebäude[0].length; spalte++) {
          if (gebäude.form[zeile][spalte] == 1) {
            for (const grundstück of move.G.spieler[move.playerID]
              .grundstücke) {
              if (
                grundstück[0] == pos[0] + zeile &&
                grundstück[1] == pos[1] + spalte
              ) {
              } else {
                return INVALID_MOVE
              }
            }
          }
        }
      }
      console.log(hatGrundstück)

      for (const element of move.G.spieler[move.playerID].gebäude) {
        if (element.id == gebäude.id) {
          element.koordinaten = pos
          element.gebaut = true
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
