import { computed, ref } from 'vue';
import { Player } from './player.model';
import { Card } from './card.model.ts';
import { Bid } from './bid.model';

export class FiveHundredCardGame {
  readonly player1: Ref<Player>;
  readonly player2: Ref<Player>;
  readonly player3: Ref<Player>;
  readonly player4: Ref<Player>;

  readonly players = computed<Player[]>(() => {
    return [this.player1.value, this.player2.value, this.player3.value, this.player4.value];
  });

  readonly blind: Ref<Card[]>;

  readonly currentBid = computed<Bid | undefined>(() => {
    let bid: Bid | undefined = undefined;
    this.players.value.forEach(player => {
      const playerBid: Bid | null = player.bid;
      if (playerBid !== null && playerBid.pointVaue > (bid?.pointValue ?? 0)) {
        bid = playerBid;
      }
    });

    return bid;
  });

  readonly allBids = computed<Bid[]>(() => {
    const allBids: Bid[] = [];
    for (let bidValue: BidValue = 6; bidValue <= 10; bidValue++) {
      allBids.push(new Bid({ suit: 'spades', value: bidValue }));
      allBids.push(new Bid({ suit: 'clubs', value: bidValue }));
      allBids.push(new Bid({ suit: 'diamonds', value: bidValue }));
      allBids.push(new Bid({ suit: 'hearts', value: bidValue }));
    }
    return allBids;
  });

  readonly allowedBids = computed<Bid[]>(() => {
    const currentBid = this.currentBid.value;
    const allBids = this.allBids.value;

    if (currentBid !== undefined) {
      return allBids.filter(x => x.pointValue > currentBid.pointValue);
    } else {
      return allBids;
    }
  });

  constructor() {
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

    let deck: Card[] = [];
    suits.forEach(suit => {
      cardValues.forEach(value => {
        deck.push(new Card({ suit, value }));
      });
    });

    // Add joker
    deck.push(new Card({ suit: 'joker', value: 17 }));

    const getRandomCardFromDeck = (): Card => {
      const cardIndex = Math.floor(Math.random() * deck.length);
      const card = deck[cardIndex];
      deck.splice(cardIndex, 1);
      return card;
    }

    const player1Cards: Card[] = [];
    const player2Cards: Card[] = [];
    const player3Cards: Card[] = [];
    const player4Cards: Card[] = [];
    const blindCards: Card[] = [];

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

    this.player1 = ref(new Player({
      cards: player1Cards,
      bidLocation: 1,
    }));

    this.player2 = ref(new Player({
      cards: player2Cards,
      bidLocation: 2,
    }));

    this.player3 = ref(new Player({
      cards: player3Cards,
      bidLocation: 3,
    }));

    this.player4 = ref(new Player({
      cards: player4Cards,
      bidLocation: 4,
    }));

    this.blind = ref(blindCards);
  }

  placeBid(params: {
    bidLocation: BidLocation,
    suit: BidSuit,
    value: BidValue,
  }) {
    const bid: Bid = new Bid({
      suit: params.suit,
      value: params.value,
    });

    // see if the bid is actually valid
    let currentBidValue = 0;
    let currentBidderLocation: undefined | BidLocation = undefined;
    this.players.forEach(player => {
      if (player.bid.value !== null && player.bid.value > currentBidValue) {
        currentBidValue = player.bid.value;
        currentBidderLocation = player.bidLocation.value;
      }
    });

    if (bid.pointValue > currentBidValue) {

    }
  }
}
