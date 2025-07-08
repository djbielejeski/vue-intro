import { ref } from 'vue';
import type { BidLocation, CardSuit } from '../types/five-hundred-card-game.types.ts';
import { Bid } from './bid.model';
import { Card } from './card.model.ts';

export class Player {
  readonly bidLocation: Ref<BidLocation>;
  readonly cards: Ref<Card[]>;
  readonly bid = ref<Bid | null>(null);

  constructor(params: {
    bidLocation: BidLocation;
    cards: Card[];
  }) {
    this.bidLocation = ref(params.bidLocation);
    this.cards = ref(params.cards);

    // TODO
    // this.sortCards();
  }

  sortCards() {
    // Check how many suits we have
    const uniqueSuits = new Set<CardSuit>();

    this.cards.value.forEach(card => {
      uniqueSuits.add(card.suit);
    });
    const blackSuitsCount = (uniqueSuits.has('spades') ? 1 : 0) + (uniqueSuits.has('clubs') ? 1 : 0);
    const redSuitsCount = (uniqueSuits.has('diamonds') ? 1 : 0) + (uniqueSuits.has('hearts') ? 1 : 0);

    // If we have 2 or 4 suits, go black - red - black - red
    if (uniqueSuits.size === 2 || uniqueSuits === 4) {
      // TODO
    }

    // If we have 3 suits, go X - Y - X
    // TODO

    // If 1 suit, go lowest to highest
    // TODO
  }
}
