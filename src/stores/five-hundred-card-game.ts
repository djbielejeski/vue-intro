import { defineStore } from 'pinia';
import { FiveHundredCardGame } from '../shared/models/five-hundred-card-game.model';

export const use500CardGameStore = defineStore('500-card-game', {
  state: () => ({
    game: null,
  }),
  getters: {
    isStarted: (state) => state.game !== null,
  },
  actions: {
    startOrRestartGame() {
      this.game = new FiveHundredCardGame();
    },
  },
});
