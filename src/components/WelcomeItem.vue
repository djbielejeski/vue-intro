<template tagName="">
  <div class="item">
    <i>
      <slot name="icon"></slot>
    </i>
    <div class="details">
      <h3>
        <slot name="heading"></slot>
      </h3>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.item {
  display: flex;
  flex-direction: row;
  align-items: start;
  gap: 8px;

  i {
    display: flex;
    place-items: center;
    place-content: center;
    width: 32px;
    height: 32px;

    color: var(--color-text);
  }

  .details {
    flex: 1;
    margin-left: 1rem;

    h3 {
      font-size: 1.2rem;
      font-weight: 500;
      margin-bottom: 0.4rem;
      color: var(--color-heading);
    }
  }
}






</style>
