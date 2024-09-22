import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';  // 如果使用 React，使用 '@vitejs/plugin-react'
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.js', 'resources/css/app.css'],
            refresh: true,
        }),
        vue(),  // 如果使用 React，改为 react()
    ],
});
