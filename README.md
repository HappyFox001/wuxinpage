# Laravel+Vite 全栈框架

### **部署流程总结**

1、安装并配置 PHP、MySQL、Nginx、Node.js。

2、安装 Laravel 项目并集成 Vue 3。

3、配置 Nginx，确保它指向 Laravel 项目的 `public` 目录。

4、使用 Vite 打包前端资源，并通过 `npm run dev` 进行开发，`npm run build` 进行生产打包。

5、配置 Laravel 与 MySQL 数据库的连接，完成数据库迁移。

6、确保文件权限设置正确，服务器可以访问 Laravel 项目所需的文件和目录。`

### 一、**服务器环境准备**

基本的开发环境包括 PHP、Composer、Node.js、MySQL、Nginx 等。

#### 1、更新系统并安装基础工具
```bash
sudo apt update && sudo apt upgrade
sudo apt install curl git unzip
```

#### 2、安装 PHP 和相关扩展
Laravel 需要 PHP 7.3 或更高版本。安装 PHP 和相关扩展：
```bash
sudo apt install php php-cli php-fpm php-mbstring php-xml php-bcmath php-curl php-mysql php-zip
```

#### 3、安装 Composer
Composer 是 PHP 的依赖管理工具，用于安装 Laravel 和其他 PHP 依赖项：
```bash
sudo apt install composer
```

#### 4、安装 Node.js 和 NPM
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

#### 5、安装 MySQL
```bash
sudo apt install mysql-server
sudo mysql_secure_installation
```

### 二、**安装 Laravel 和 Vue 3**

#### 1、创建 Laravel 项目

```bash
composer create-project --prefer-dist laravel/laravel myapp
cd myapp
```

#### 2、安装 NPM 依赖

Laravel 默认从 9.x 版本开始使用 Vite，前端的依赖管理通过 npm 进行。

进入 Laravel 项目根目录并安装 Node.js 依赖：
```bash
npm install
```

#### 3、安装 Vue 3 和 Vite 插件

安装 Vue 3 以及 Vite 用于处理 Vue 的插件：
```bash
npm install vue@next @vitejs/plugin-vue
```

修改 `vite.config.js` 来确保 Vue 插件被加载。编辑文件 `vite.config.js`：

```javascript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.js', 'resources/css/app.css'],
            refresh: true,
        }),
        vue(),
    ],
});
```

#### 4、配置 Vue 组件

在 `resources/js` 目录下的 `app.js` 文件中引入 Vue：

```javascript
import { createApp } from 'vue';
import App from './components/App.vue';

createApp(App).mount('#app');
```

创建 Vue 组件 `resources/js/components/App.vue`：

```vue
<template>
  <div>
    <h1>Hello from Vue 3!</h1>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>
```

然后在 `resources/views/welcome.blade.php` 文件中为 Vue 准备一个挂载点：

```html
<div id="app"></div>
@vite('resources/js/app.js')
```

#### 5、启动开发服务器

使用以下命令来启动 Vite 开发服务器：
```bash
npm run dev

php artisan serve
与vite不同，一般访问 http://127.0.0.1:8000/
```

此时你可以访问 Laravel 的首页 `http://localhost:8000`，查看 Vue 组件是否成功渲染。

### 三、**MySQL 数据库配置**

#### 1、创建数据库

进入 MySQL：
```bash
sudo mysql -u root -p
```

创建一个新数据库：
```sql
CREATE DATABASE myapp_db;
GRANT ALL ON myapp_db.* TO 'myapp_user'@'localhost' IDENTIFIED BY 'password';
FLUSH PRIVILEGES;
EXIT;
```

#### 2、配置 Laravel 数据库连接

在 Laravel 的 `.env` 文件中配置数据库连接信息：
```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=myapp_db
DB_USERNAME=myapp_user
DB_PASSWORD=password

修改配置信息后运行
php artisan config:cache
```

#### 3、 数据迁移

运行数据库迁移命令来创建 Laravel 默认的表：
```bash
php artisan migrate
```

### 四、**Nginx 配置**

#### 1、安装 Nginx

首先安装 Nginx：
```bash
sudo apt install nginx
```

#### 2、配置 Nginx

创建一个新的 Nginx 虚拟主机配置文件：

```bash
sudo nano /etc/nginx/sites-available/myapp
```

在文件中添加以下内容：

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/myapp/public;

    index index.php index.html index.htm;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;  # 根据你的 PHP 版本调整
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.ht {
        deny all;
    }

    location /build/ {
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
```

注意：
- **root**：指向 Laravel 项目的 `public` 目录。
- **fastcgi_pass**：确保使用的 PHP 版本正确，例如 `php7.4-fpm.sock`。

#### 3、启用站点并重启 Nginx

启用该站点：
```bash
sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/
```

测试 Nginx 配置是否正确：
```bash
sudo nginx -t
```

如果没有错误，重新启动 Nginx：
```bash
sudo systemctl restart nginx
```

#### 5、文件权限

确保 Laravel 项目文件的权限设置正确，允许 Nginx 和 PHP 访问项目文件：

```bash
sudo chown -R www-data:www-data /var/www/myapp
sudo chmod -R 775 /var/www/myapp/storage
sudo chmod -R 775 /var/www/myapp/bootstrap/cache
```

### 五、**生产环境打包和优化**

#### 1、构建前端资源

在部署到生产环境时，你需要使用 Vite 打包前端资源：

```bash
npm run build
```

打包后，所有前端资源会放在 `public/build` 目录下。

#### 2、优化 Laravel 项目

执行以下命令来优化 Laravel 项目，以提高npm run dev性能：
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cachenpm run dev
```

