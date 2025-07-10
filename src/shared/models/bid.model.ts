import type { BidSuit, BidValue } from '../types/five-hundred-card-game.types.ts';

export class BidModel {
  readonly suit: BidSuit;
  readonly value: BidValue;

  get pointValue(): number {
    let baseValue = 0;
    switch(this.suit) {
      case 'spades': {
        baseValue = 40;
        break;
      }
      case 'clubs': {
        baseValue = 60;
        break;
      }
      case 'diamonds': {
        baseValue = 80;
        break;
      }
      case 'hearts': {
        baseValue = 100;
        break;
      }
    }

    let valueAdd = 0;
    switch (this.value) {
      case 6: {
        valueAdd += 0;
        break;
      }
      case 7: {
        valueAdd += 100;
        break;
      }
      case 8: {
        valueAdd += 200;
        break;
      }
      case 9: {
        valueAdd += 300;
        break;
      }
      case 10: {
        valueAdd += 400;
        break;
      }
    }


    return baseValue + valueAdd;
  };

  // Note: It does fire whenever the store updates.
  // - TODO - Figure out a pattern to make this reactive.
  // Maybe move this to constructor - but thats gross.
  get bidName(): string {
    const value = this.value;
    const suit = this.suit;

    if (value === 'pass') {
      return 'pass';
    } else {
      const uppercaseSuit = suit.charAt(0).toUpperCase() + suit.slice(1);
      return `${ value } of ${ uppercaseSuit }`;
    }
  };

  constructor(params: {
    suit: BidSuit;
    value: BidValue;
  }) {
    this.suit = params.suit;
    this.value = params.value;
  }
}
