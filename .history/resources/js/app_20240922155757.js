// resources/js/app.js
import { createApp } from 'vue';
import App from './components/App.vue';
import router from './router'; // 导入 router

// 创建 Vue 实例并使用路由器
createApp(App)
    .use(router) // 使用 Vue Router
    .mount('#app');
