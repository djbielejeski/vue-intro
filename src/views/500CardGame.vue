<script setup lang="ts">
import Card from '@/components/Card.vue';
import { use500CardGameStore } from '@/stores/five-hundred-card-game.ts';
import { storeToRefs } from 'pinia';

const gameStore = use500CardGameStore();
const { player1, player1BidUI, player2, player3, player4, blind, players,  currentBid, allPossibleBids, allowedBids } = storeToRefs(gameStore);
const { startOrRestartGame, placeBid } = gameStore;

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
    <div class="game-container" v-if="player1 && player2 && player3 && player4">
      <div></div>
      <div class="h-cards top player-3">
        <Card class="card" v-for="card of player3.cards" :key="`${card.suit}-${card.value}`" :card="card" />
      </div>
      <div></div>
      <div class="v-cards player-2">
        <Card class="card" v-for="card of player2.cards" :key="`${card.suit}-${card.value}`" :card="card" />
      </div>
      <div class="play-area">
        <div class="blind">
          <Card class="card" v-for="card of blind" :key="`${card.suit}-${card.value}`" :card="card" />
        </div>
      </div>
      <div class="v-cards player-4">
        <Card class="card" v-for="card of player4.cards" :key="`${card.suit}-${card.value}`" :card="card" />
      </div>
      <div></div>
      <div class="player-1">
        <div class="h-cards bottom">
          <Card class="card" v-for="card of player1.cards" :key="`${card.suit}-${card.value}`" :card="card" :can-hover="true"/>
        </div>
        <div class="player-actions">
          <template v-if="player1.bid === null">
            <select v-model="player1BidUI">
              <option disabled value="null">Please select bid</option>
              <option v-for="bid of allPossibleBids"
                      :value="bid"
                      :key="`${bid.pointValue}`"
                      :disabled="!allowedBids.includes(bid)">
                <template v-if="bid.value === 'pass'">
                  Pass
                </template>
                <template v-else>
                  {{ bid.bidName }} ({{ bid.pointValue}})
                </template>
              </option>
            </select>

            <!--   -->
            <button
              type="button"
              :disabled="!player1BidUI"
              @click="placeBid({
                bidLocation: player1.bidLocation,
                bid: player1BidUI,
              })">
              Place bid
            </button>
          </template>
          <div v-else>
            You {{ player1.bid?.value === 'pass' ? 'passed' : 'bid ' + player1.bid?.bidName }}
          </div>
        </div>

        <div class="debug-log">
<code>
<pre>
Debug log
---------------------------
<template v-if="player1BidUI">player1BidUI: {{ player1BidUI.bidName }} ({{ player1BidUI.pointValue}})</template>
<template v-if="currentBid">currentBid: {{ currentBid.bidName }} ({{ currentBid.pointValue}})</template>
</pre>
</code>
        </div>
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

    .h-cards {
      justify-self: center;
      display: flex;
      flex-direction: row;
      gap: 8px;

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

    .player-1 {
      .player-actions {
        margin-top: 24px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 4px;

        select {
          height: 25px;
          border-color: var(--color-border);
        }
      }
    }
  }
}

</style>
