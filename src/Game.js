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
        gebäude: [],
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
    playCard: ({ G, ctx, playerID, events, random }, cardIndex) => {},
    drawCard(ctx) {},
    geldNehmen: function geldNehmen(move) {
      move.G.spieler[move.playerID].geld += 5 //+ Geld Gebäude
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
        move.G.marktplatz.push(move.G.deck.shift())
      } else {
        return INVALID_MOVE
      }
    },
    gebäudeBauen: function gebäudeBauen(move, feld) {
      let hatGrundstück = false
      for (const grundstück of move.G.spieler[move.playerID].grundstücke) {
        if (grundstück[0] == feld[0] && grundstück[1] == feld[1]) {
          hatGrundstück = true
        }
      }
      console.log(hatGrundstück)

      if (hatGrundstück) {
        move.G.spieler[move.playerID].gebäude.push(feld)
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
