// resources/js/app.js
import { createApp } from 'vue';
import App from './components/App.vue';
import router from './router'; // 导入 router
import store from './store'; // 引入 Vuex store
import './style.css';

// 创建 Vue 应用实例并使用 router 和 Vuex
const app = createApp(App);

// 使用 Vuex store
app.use(store);

// 使用路由
app.use(router);

// 挂载到指定的 DOM 元素
app.mount('#app');