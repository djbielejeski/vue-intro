<script setup lang="ts">
import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';

const counterStore = useCounterStore();
const { count, doubleCount, disabled, hasCount, countData } = storeToRefs(counterStore);
const { increment, decrement, getData, clearData } = counterStore;

</script>

<template>
  <h3>Counter Store</h3>
  <div class="values">
    <div>Current Count is {{ count }}</div>
    <div>Double Count is {{ doubleCount }}</div>
  </div>

  <div class="actions">
    <button type="button"
            :disabled="disabled"
            @click="decrement">
      Decrement Count
    </button>

    <button type="button"
            @click="increment">
      Update Count
    </button>
  </div>

  <h3>Data fetching/display/transforms</h3>

  <div class="actions">
    <button type="button"
            :disabled="countData.length === 0"
            @click="clearData">
      Clear Data
    </button>
    <button type="button"
            @click="getData">
      Fetch Data
    </button>
  </div>

  <div class="counter-values">
    <table>
      <thead>
      <tr>
        <th>Id</th>
        <th>Is Active?</th>
        <th>Value formatted as currency</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="countData.length === 0">
        <td colspan="100">No data loaded</td>
      </tr>
      <tr v-for="item of countData" :key="item.guid">
        <td>
          {{ item.guid }}
        </td>
        <td>
          {{ item.isActive ? 'TRUE' : 'FALSE' }}
        </td>
        <td>
          {{ item.age_formatted_as_currency }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">

h3 {
  font-weight: bold;
  margin-bottom: 16px;
}

.values {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  gap: 16px;
  margin-bottom: 16px;
}

.actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  gap: 16px;
  margin-bottom: 16px;

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
}

.counter-values {
  table {
    border-spacing: 0;
    border-collapse: collapse;
    text-align: left;
    width: 100%;
    max-width: 960px;

    thead {
      th {
        font-weight: bold;
        line-height: 1.5rem;
        padding: 4px 8px;
        border-bottom: 1px solid var(--color-border);
      }
    }

    tbody {
      tr {
        &:nth-child(2n) {
          background-color: var(--color-background-soft);
        }

        td {
          padding: 4px 8px;
          border-bottom: 1px solid var(--color-border);
        }
      }
    }
  }
}
</style>
