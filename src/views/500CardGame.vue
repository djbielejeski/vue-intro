<script setup lang="ts">
import Card from '@/components/Card.vue';
import { use500CardGameStore } from '@/stores/five-hundred-card-game.ts';
import { storeToRefs } from 'pinia';

const gameStore = use500CardGameStore();
const { game, isStarted } = storeToRefs(gameStore);
const { startOrRestartGame } = gameStore;
</script>

<template>
  <div class="card-game">
    <div class="header">
      <h1>
        500 Card Game
      </h1>
      <button type="button"
              @click="startOrRestartGame()">
        Start
      </button>
    </div>
    <div class="game-container" v-if="game !== null">
      <div></div>
      <div class="h-cards top player-3">
        <Card class="card" v-for="card of game.player3.cards" :key="`${card.suit}-${card.value}`" :card="card" />
      </div>
      <div></div>
      <div class="v-cards player-2">
        <Card class="card" v-for="card of game.player2.cards" :key="`${card.suit}-${card.value}`" :card="card" />
      </div>
      <div class="play-area">
        <div class="blind">
          <Card class="card" v-for="card of game.blind" :key="`${card.suit}-${card.value}`" :card="card" />
        </div>
      </div>
      <div class="v-cards player-4">
        <Card class="card" v-for="card of game.player4.cards" :key="`${card.suit}-${card.value}`" :card="card" />
      </div>
      <div></div>
      <div class="h-cards bottom player-1">
        <Card class="card" v-for="card of game.player1.cards" :key="`${card.suit}-${card.value}`" :card="card" />
      </div>
      <div></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-game {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  gap: 2px 0px;
  grid-template-areas:
    "."
    ".";

  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  button {
    padding: 4px 16px;
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: 2px;

    &:not(:disabled) {
      cursor: pointer;

      &:hover {
        background-color: var(--color-background-mute);
        border-color: var(--color-border-hover);
      }

      &:active {
        background-color: var(--color-background-soft);
      }
    }
  }

  .game-container {
    display: grid;
    grid-template-columns: max-content 1fr max-content;
    grid-template-rows: max-content 1fr max-content;
    gap: 0px 0px;
    grid-template-areas:
    ". . ."
    ". . ."
    ". . .";
    padding: 16px;

    // Temp - Remove after cards get overlayed correctly
    overflow-y: auto;

    .card {
      box-shadow: 1px 1px 4px var(--color-border);
      transition: margin 250ms ease-in-out;
    }

    .h-cards {
      justify-self: center;
      display: flex;
      flex-direction: row;
      gap: 8px;

      &.bottom {
        .card:hover {
          margin-top: -55px;
        }
      }


      .card:not(:first-child) {
        margin-left: -36px;
      }
    }

    .v-cards {
      .card:not(:first-child) {
        margin-top: -55px;
      }
    }

    .play-area {
      justify-self: center;
      align-self: center;

      .blind {
        display: flex;
        flex-direction: row;
        gap: 8px;
      }
    }
  }
}

</style>
