/** @import { Game, Move } from "boardgame.io" */
import { TurnOrder } from "boardgame.io/core"

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

    for (let i = 0; i < 3; i++) {
      let grundstücke = []
      for (let i = 0; i < 6; i++) {
        grundstücke.push(deck.shift())
      }
    spieler.push({
        geld : 5 + i,
        bevölkerung : 0,
        grundstücke: grundstücke
      });
    }
    console.log(spieler)

    return {
      spielfeld: [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      deck: deck,
      spieler : spieler,
      marktplatz: marktplatz
    }
  },

  moves: {
    /** @type {Move} */
    playCard: ({ G, ctx, playerID, events, random }, cardIndex) => {},
    drawCard(ctx) {},
    geldNehmen: function geldNehmen(move) {
      move.G.spieler[move.playerID].geld += 5 //+ Geld Gebäude
    },
    grundstückKaufen: function grundstückKaufen(move, grundstück) {
      //den karten auf dem marktplatz preise zuordnen
      let preisliste = [2, 3, 4, 6, 8, 10]
      
      if (condition) {//überprüfen ob genug geld da ist

      }
      move.G.spieler[move.playerID].grundstücke.push(grundstück)
      //grundstück von dem marktplatz löschen
    }
  },

  //seed: "random-see1d",

  turn: {
    order: TurnOrder.DEFAULT,

    onBegin: ({ G, ctx, events, random }) => {},
    onEnd: ({ G, ctx, events, random }) => {},

    minMoves: 1,
    maxMoves: 1,
  },

  minPlayers: 3,
  maxPlayers: 3,

  disableUndo: true,

  endIf: ({ G, ctx, random }) => {},
}
