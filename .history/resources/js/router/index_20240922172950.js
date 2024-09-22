import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Predict from '../views/Predict.vue'
import Contact from '../views/Contact.vue'
const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/predict',
        name: 'predict',
        component: Predict
    },
    {
        path: '/wuxingpage/contact',
        name: 'contact',
        component: Contact
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
