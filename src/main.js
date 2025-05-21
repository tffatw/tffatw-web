import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

// 創建Vue應用實例並掛載
createApp(App)
  .use(router)
  .mount('#app')
