import Prism from 'prismjs'
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'

// prismjs init
// import 'prismjs/themes/prism-dark.css'
import 'prismjs/themes/prism-okaidia.css'
;(window as any).Prism = Prism || {}
;(window as any).Prism.manual = true

const app = createApp(App)
app.mount('#app')
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
