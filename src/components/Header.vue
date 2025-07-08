<script setup lang="ts">

import { RouterLink } from 'vue-router';
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/" class="logo-link">
        <img
          alt="Vue logo"
          class="logo"
          src="@/assets/logo.svg"
          width="18"
          height="18"/>
      </RouterLink>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>
</template>

<style scoped lang="scss">
header {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-grow: 0;

  nav {
    width: 100%;
    font-size: 12px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;

    a {
      &.logo-link {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0 4px 0 8px;

        .logo {
        }
      }

      &:not(.logo-link) {
        padding: 4px 8px;
      }

      &.router-link-exact-active {
        &:not(.logo-link) {
          color: var(--color-text);
          box-shadow: 0 2px 0 var(--color-text);
        }
      }

      &.router-link-exact-active:hover {
        background-color: transparent;
      }
    }
  }
}
</style>
