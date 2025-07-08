import { computed, ref } from 'vue';
import type { BidSuit, BidValue } from '../types/five-hundred-card-game.types.ts';

export class Bid {
  readonly suit: Ref<BidSuit>;
  readonly value: Ref<BidValue>;

  readonly pointValue = computed(() => {
    let baseValue = 0;
    switch(this.suit.value) {
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
    switch (this.value.value) {
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
  });

  constructor(params: {
    suit: BidSuit;
    value: BidValue;
  }) {
    this.suit = ref(params.suit);
    this.value = ref(params.value);
  }
}
