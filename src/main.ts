import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import  'ant-design-vue/dist/antd.css'
import '@/utils/permisstion'

createApp(App).use(store).use(router).use(Antd).mount('#app')
