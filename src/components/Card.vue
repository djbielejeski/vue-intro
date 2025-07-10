<script setup lang="ts">
import { CardModel } from '../shared/models/card.model.ts';
const { card, canHover = false } = defineProps<{
  card: CardModel;
  canHover?: boolean;
}>();
</script>

<template>
  <div class="card-container"
        :class="{ 'can-hover': canHover }">
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
    border-radius: 8px;
    overflow: hidden;
    position: relative;

    $container-height: 110px;
    width: 72px;
    height: $container-height;

    .card-image {

      box-shadow: 2px 2px 4px var(--color-border);
    }

    $hover-height: 28px;
    &.can-hover {
      height: calc($container-height + $hover-height);

      .card-image {
        transition: bottom 250ms ease-in;
        position: absolute;
        bottom: 0;
      }

      // Trigger the hover on the parent container
      &:hover {
        .card-image {
          transition: bottom 100ms ease-out;
          bottom: $hover-height;
        }
      }
    }
  }
</style>
