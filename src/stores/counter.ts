import { mande } from 'mande';
import { defineStore } from 'pinia';

const api = mande('/src/assets/counter-data.json');

export const useCounterStore = defineStore('counter', {
  state: (): {
    count: number,
    apiData: CountDataViewModel[],
  } => ({
    count: 0,
    apiData: [],
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
      this.count = this.count > 0 ? this.count - 1 : 0;
    },
    async getData() {
      if (this.apiData.length > 0) {
        return this.apiData;
      } else {
        try {
          const countApiData: any[] = await api.get();
          console.log(countApiData);
          this.apiData = countApiData.map(x => new CountDataViewModel(x));
        } catch (error) {
          console.error(error);
          return error;
        }
      }
    },
    clearData() {
      this.apiData = [];
    }
  },
});

export class CountDataViewModel {
  guid: string = '';
  isActive: boolean = false;
  age: number = 0;

  get age_formatted_as_currency() {
    const valueAsNumber = Number(this.age * 1000.1111);
    const valueWithDecimals = Number(valueAsNumber.toFixed(2));

    const decimalCount = valueAsNumber.toString().length - valueAsNumber.toString().length;

    const formattedValue = new Intl.NumberFormat().format(valueWithDecimals);

    console.log('Generating age formatted as currency', valueAsNumber, valueWithDecimals, decimalCount, formattedValue);

    return `$${formattedValue}`;
  };

  constructor(item: any) {
    Object.assign(this, item);
  }
}
