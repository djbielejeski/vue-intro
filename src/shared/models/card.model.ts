import type { CardSuit, CardValue } from '../types/five-hundred-card-game.types.ts';

export class CardModel {
  suit: CardSuit;
  value: CardValue;

  get cardName(): string {
    const value = this.value;
    const suit = this.suit;

    if (value && suit) {
      const uppercaseSuit = suit.charAt(0).toUpperCase() + suit.slice(1);

      switch (value) {
        case 11:
        case 15:
        case 16: {
          return `Jack of ${ uppercaseSuit }`;
        }
        case 12: {
          return `Queen of ${ uppercaseSuit }`;
        }
        case 13: {
          return `King of ${ uppercaseSuit }`;
        }
        case 14: {
          return `Ace of ${ uppercaseSuit }`;
        }
        case 17: {
          return 'Joker';
        }
        default: {
          return `${ value } of ${ uppercaseSuit }`;
        }
      }
    } else {
      return '';
    }
  };

  get imageName(): string {
    const value = this.value;
    const suit = this.suit;

    if (value) {
      if (value === 17) {
        return '17-joker-black.png';
      } else {
        return `${ value.toString().padStart(2, '0') }-${ suit }.png`;
      }
    } else {
      return '';
    }
  };

  constructor(params: {
    suit: CardSuit;
    value: CardValue;
  }) {
    this.suit = params.suit;
    this.value = params.value;
  }

  convertToTrumpSuit(trumpSuit: CardSuit) {
    // Check for joker
    if (this.value === 17) {
      this.suit = trumpSuit;
    }


    if (this.value === 11) {

      // Check for the right bauer (jack)
      if (this.suit === trumpSuit) {
        this.value = 16;
      }

      // check for the left bauer (jack)
      if ((trumpSuit === 'spades' && this.suit === 'clubs') ||
        (trumpSuit === 'clubs' && this.suit === 'spades') ||
        (trumpSuit === 'diamonds' && this.suit === 'hearts') ||
        (trumpSuit === 'hearts' && this.suit === 'diamonds')) {
        this.value = 15;
        this.suit = trumpSuit;
      }
    }
  }
}
