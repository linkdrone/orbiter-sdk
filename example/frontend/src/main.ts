import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { Transaction } from '../../../src/transaction'

setTimeout(() => {
  const transaction = new Transaction()
  console.warn('transaction: ', transaction)
}, 2000)

createApp(App).use(router).mount('#app')
