import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';  // 如果使用 React，使用 '@vitejs/plugin-react'
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.js', 'resources/css/app.css'],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    // Vue 插件将重写资产 URLs，当被引用
                    // 在单文件组件中，指向 Laravel Web 服务
                    // 设置它为 `null` 允许 Laravel 插件
                    // 去替代重写资产 URLs 指向到 Vite 服务
                    base: null,

                    //  Vue 插件将解析绝对 URLs 
                    // 并把它们看做磁盘上的绝对路径。
                    // 设置它为 `false` 将保留绝对 URLs 
                    // 以便它们可以按照预期直接引用公共资产。
                    includeAbsolute: false,
                },
            },
        }),
    ],
});
