import { BidModel } from '@/shared/models/bid.model.ts';
import { CardModel } from '@/shared/models/card.model.ts';
import { PlayerModel } from '@/shared/models/player.model.ts';
import type { BidLocation, BidSuit, BidValue, CardSuit, CardValue } from '@/shared/types/five-hundred-card-game.types.ts';
import { defineStore } from 'pinia';

export const use500CardGameStore = defineStore('500-card-game', {
  state: (): {
    player1BidUI: BidModel | null;
    player1: PlayerModel | undefined;
    player2: PlayerModel | undefined;
    player3: PlayerModel | undefined;
    player4: PlayerModel | undefined;
    blind: CardModel[];
  } => ({
    player1BidUI: null,
    player1: undefined,
    player2: undefined,
    player3: undefined,
    player4: undefined,
    blind: [],
  }),
  getters: {
    players(): PlayerModel[] {
      if (this.player1 && this.player2 && this.player3 && this.player4) {
        return [this.player1, this.player2, this.player3, this.player4];
      }
      return [];
    },
    currentBid(): BidModel | undefined {
      let bid: BidModel | undefined = undefined;
      this.players.forEach(player => {
        const playerBid: BidModel | null = player.bid;
        if (playerBid !== null && playerBid.pointValue > (bid?.pointValue ?? 0)) {
          bid = playerBid;
        }
      });

      return bid;
    },
    allPossibleBids(): BidModel[] {
      const allPossibleBids: BidModel[] = [new BidModel({
        suit: 'pass',
        value: 'pass',
      })];
      const bidValues: BidValue[] = [6, 7, 8, 9, 10];
      bidValues.forEach(bidValue => {
        allPossibleBids.push(new BidModel({ suit: 'spades', value: bidValue }));
        allPossibleBids.push(new BidModel({ suit: 'clubs', value: bidValue }));
        allPossibleBids.push(new BidModel({ suit: 'diamonds', value: bidValue }));
        allPossibleBids.push(new BidModel({ suit: 'hearts', value: bidValue }));
      });

      return allPossibleBids;
    },
    allowedBids(): BidModel[] {
      const currentBid = this.currentBid;
      const allPossibleBids = this.allPossibleBids;

      if (currentBid !== undefined) {
        return allPossibleBids.filter(x => x.pointValue > currentBid.pointValue);
      } else {
        return allPossibleBids;
      }
    },
  },
  actions: {
    startOrRestartGame() {
      // Setup the deck
      const suits: CardSuit[] = [
        'spades',
        'clubs',
        'diamonds',
        'hearts',
      ];
      const cardValues: CardValue[] = [
        4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
      ];

      let deck: CardModel[] = [];
      suits.forEach(suit => {
        cardValues.forEach(value => {
          deck.push(new CardModel({ suit, value }));
        });
      });

      // Add joker
      deck.push(new CardModel({ suit: 'joker', value: 17 }));

      const getRandomCardFromDeck = (): CardModel => {
        const cardIndex = Math.floor(Math.random() * deck.length);
        const card = deck[cardIndex];
        deck.splice(cardIndex, 1);
        return card;
      }

      const player1Cards: CardModel[] = [];
      const player2Cards: CardModel[] = [];
      const player3Cards: CardModel[] = [];
      const player4Cards: CardModel[] = [];
      const blindCards: CardModel[] = [];

      // "Shuffle" by randomly distributing the cards
      // Deal 3 cards to player2, player3, player4, player1, blind
      player1Cards.push(getRandomCardFromDeck(), getRandomCardFromDeck(), getRandomCardFromDeck());
      player2Cards.push(getRandomCardFromDeck(), getRandomCardFromDeck(), getRandomCardFromDeck());
      player3Cards.push(getRandomCardFromDeck(), getRandomCardFromDeck(), getRandomCardFromDeck());
      player4Cards.push(getRandomCardFromDeck(), getRandomCardFromDeck(), getRandomCardFromDeck());
      blindCards.push(getRandomCardFromDeck(), getRandomCardFromDeck(), getRandomCardFromDeck());

      // Deal 4 cards to player2, player3, player4, player1
      player1Cards.push(getRandomCardFromDeck(), getRandomCardFromDeck(), getRandomCardFromDeck(), getRandomCardFromDeck());
      player2Cards.push(getRandomCardFromDeck(), getRandomCardFromDeck(), getRandomCardFromDeck(), getRandomCardFromDeck());
      player3Cards.push(getRandomCardFromDeck(), getRandomCardFromDeck(), getRandomCardFromDeck(), getRandomCardFromDeck());
      player4Cards.push(getRandomCardFromDeck(), getRandomCardFromDeck(), getRandomCardFromDeck(), getRandomCardFromDeck());

      // Deal 2 cards to blind
      blindCards.push(getRandomCardFromDeck(), getRandomCardFromDeck());

      // Deal 3 cards to player2, player3, player4, player1
      player1Cards.push(getRandomCardFromDeck(), getRandomCardFromDeck(), getRandomCardFromDeck());
      player2Cards.push(getRandomCardFromDeck(), getRandomCardFromDeck(), getRandomCardFromDeck());
      player3Cards.push(getRandomCardFromDeck(), getRandomCardFromDeck(), getRandomCardFromDeck());
      player4Cards.push(getRandomCardFromDeck(), getRandomCardFromDeck(), getRandomCardFromDeck());

      this.player1 = new PlayerModel({
        cards: player1Cards,
        bidLocation: 1,
      });

      this.player2 = new PlayerModel({
        cards: player2Cards,
        bidLocation: 2,
      });

      this.player3 = new PlayerModel({
        cards: player3Cards,
        bidLocation: 3,
      });

      this.player4 = new PlayerModel({
        cards: player4Cards,
        bidLocation: 4,
      });

      this.blind = blindCards;
    },
    placeBid(params: {
      bidLocation: BidLocation,
      bid: BidModel | null,
    }) {
      console.log('Placing bid', params.bid);

      // Allow the bid if it is higher than our current bid
      if (params.bid) {
        const playerAtBidPosition = this.players.find(x => x.bidLocation === params.bidLocation);
        if (playerAtBidPosition) {
          if (params.bid.pointValue > (this.currentBid?.pointValue ?? 0)) {
              playerAtBidPosition.bid = params.bid;
              console.log('bid updated');
          } else {
            if (params.bid.value === 'pass') {
              playerAtBidPosition.bid = params.bid;
            } else {
              console.error('invalid bid');
            }
          }
        } else {
          console.log('player not found');
        }
      }

    }
  },
});
