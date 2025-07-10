import type { BidLocation, CardSuit } from '../types/five-hundred-card-game.types.ts';
import { BidModel } from './bid.model';
import { CardModel } from './card.model.ts';

export class PlayerModel {
  readonly bidLocation: BidLocation;
  readonly cards: CardModel[];
  bid: BidModel | null = null;

  constructor(params: {
    bidLocation: BidLocation;
    cards: CardModel[];
  }) {
    this.bidLocation = params.bidLocation;
    this.cards = params.cards;

    // TODO
    // this.sortCards();
  }

  sortCards() {
    // Check how many suits we have
    const uniqueSuits = new Set<CardSuit>();

    this.cards.forEach(card => {
      uniqueSuits.add(card.suit);
    });
    const blackSuitsCount = (uniqueSuits.has('spades') ? 1 : 0) + (uniqueSuits.has('clubs') ? 1 : 0);
    const redSuitsCount = (uniqueSuits.has('diamonds') ? 1 : 0) + (uniqueSuits.has('hearts') ? 1 : 0);

    // If we have 2 or 4 suits, go black - red - black - red
    if (uniqueSuits.size === 2 || uniqueSuits.size === 4) {
      // TODO
    }

    // If we have 3 suits, go X - Y - X
    // TODO

    // If 1 suit, go lowest to highest
    // TODO
  }
}
