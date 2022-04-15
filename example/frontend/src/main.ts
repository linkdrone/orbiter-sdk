import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { Transaction, ZksyncTransaction } from '../../../src/transaction'

setTimeout(() => {
  const transaction = new ZksyncTransaction(1, <any>1)
  console.warn('transaction: ', transaction)
}, 2000)

createApp(App).use(router).mount('#app')
