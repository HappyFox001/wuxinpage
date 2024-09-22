// resources/js/app.js
import { createApp } from 'vue';
import App from './components/App.vue';
import router from './router'; // 导入 router
import store from './store'; // 引入 Vuex store
import './style.css';

// 创建 Vue 实例并使用路由器
createApp(App)
    .use(router) // 使用 Vue Router
    .mount('#app');