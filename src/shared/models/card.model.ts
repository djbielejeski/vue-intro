import { computed, ref } from 'vue';
import type { CardSuit, CardValue } from '../types/five-hundred-card-game.types.ts';

export class Card {
  readonly suit: Ref<CardSuit>;
  readonly value: Ref<CardValue>;

  readonly cardName = computed<string>(() => {
    const value = this.value.value;
    const suit = this.suit.value;

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
  });

  readonly imageName = computed<string>(() => {
    const value = this.value.value;
    const suit = this.suit.value;

    if (value) {
      if (value === 17) {
        return '17-joker-black.png';
      } else {
        return `${ value.toString().padStart(2, '0') }-${ suit }.png`;
      }
    } else {
      return '';
    }
  })

  constructor(params: {
    suit: CardSuit;
    value: CardValue;
  }) {
    this.suit = ref(params.suit);
    this.value = ref(params.value);
  }

  convertToTrumpSuit(trumpSuit: CardSuit) {
    // Check for joker
    if (this.value === 17) {
      this.suit.value = trumpSuit;
    }


    if (this.value === 11) {

      // Check for the right bauer (jack)
      if (this.suit.value === trumpSuit) {
        this.value.value = 16;
      }

      // check for the left bauer (jack)
      if ((trumpSuit === 'spades' && this.suit.value === 'clubs') ||
        (trumpSuit === 'clubs' && this.suit.value === 'spades') ||
        (trumpSuit === 'diamonds' && this.suit.value === 'hearts') ||
        (trumpSuit === 'hearts' && this.suit.value === 'diamonds')) {
        this.value.value = 15;
        this.suit.value = trumpSuit;
      }
    }
  }
}
