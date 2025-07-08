<script setup lang="ts">
import { Card } from '../shared/models/card.model.ts';
const { card } = defineProps({
  card: Card,
});
</script>

<template>
  <div class="card-container">
    <img class="card-image"
         v-bind:src="`/src/assets/cards/${card.imageName}`"
         v-bind:alt="card.cardName"
         v-bind:title="card.cardName"
         width="72"
         height="110"
    />
  </div>
</template>

<style scoped lang="scss">
  /*
    width: 249
    height: 382
    width / height = 0.6518324607329843;
    height / width = 1.534136546184739;
  */
  .card-container {
    width: 72px;
    height: 110px;
  }
</style>
