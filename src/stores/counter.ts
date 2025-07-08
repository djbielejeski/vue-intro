import { ref, computed } from 'vue';
import { mande } from 'mande';
import { defineStore } from 'pinia';

const api = mande('/src/assets/counter-data.json');

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    countData: [],
  }),
  getters: {
    hasCount: (state) => state.count > 0,
    disabled: (state) => state.count <= 0,
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count = this.count.value > 0 ? this.count.value - 1 : 0;
    },
    async getData() {
      if (this.countData.length > 0) {
        return this.countData;
      } else {
        try {
          const countData = await api.get();
          console.log(countData);

          this.countData = countData.map(x => new CountDataViewModel(x));
        } catch (error) {
          console.error(error);
          return error;
        }
      }
    },
    clearData() {
      this.countData = [];
    }
  },
});

export class CountDataViewModel {
  readonly ageRef: Ref<number>;
  age_formatted_as_currency = computed(() => {
    const valueAsNumber = Number(this.ageRef.value * 1000.1111);
    const valueWithDecimals = valueAsNumber.toFixed(2);

    const decimalCount = valueAsNumber.toString().length - valueAsNumber.toString().length;

    const formattedValue = new Intl.NumberFormat().format(valueWithDecimals);

    console.log('Generating age formatted as currency', valueAsNumber, valueWithDecimals, decimalCount, formattedValue);

    return ref(`$${formattedValue}`);
  });


  constructor(item: any) {
    Object.assign(this, item);

    this.ageRef = ref(item.age);
  }
}
