import { createApp } from 'vue'
import App from './App.vue'


// import router from './router/index'
// import store from './store/index'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'


// createApp(App).mount('#app')
// createApp(App).use(router).mount('#app')
// createApp(App).use(store).mount('#app')
createApp(App).use(ElementPlus).mount('#app')




