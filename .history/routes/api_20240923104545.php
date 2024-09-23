<?php
// 在 routes/api.php 中添加测试路由
use Illuminate\Support\Facades\Route;

Route::get('/test', function () {
    return response()->json(['message' => 'API route is working']);
});
