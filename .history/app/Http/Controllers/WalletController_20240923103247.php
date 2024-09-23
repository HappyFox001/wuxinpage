<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB; // 导入DB类，用于数据库操作
use Illuminate\Support\Facades\Log; // 导入Log类，用于日志记录
use Carbon\Carbon; // 用于处理时间

class WalletController extends Controller
{
    public function store(Request $request)
    {
        // 记录日志，打印请求是否送达
        Log::info('请求送达');

        // 获取请求的 JSON 数据
        $data = $request->json()->all();
        $walletAddress = $data['wallet_address'] ?? null; // 提取钱包地址

        // 如果钱包地址存在
        if ($walletAddress) {
            // 获取当前时间
            $currentTime = Carbon::now();
            Log::info('接收到的钱包地址为: ' . $walletAddress);
            Log::info('当前时间为: ' . $currentTime);

            // 数据库插入操作
            try {
                DB::table('wallet_connections')->insert([
                    'wallet_address' => $walletAddress,
                    'connection_time' => $currentTime,
                ]);

                // 返回成功响应
                return response()->json([
                    'message' => 'Wallet connected successfully!'
                ], 200);
            } catch (\Exception $e) {
                // 记录数据库插入异常
                Log::error('数据库插入错误: ' . $e->getMessage());
                return response()->json([
                    'message' => 'Error connecting wallet',
                    'error' => $e->getMessage(),
                ], 500);
            }
        } else {
            // 返回无效钱包地址的响应
            return response()->json([
                'message' => 'Invalid wallet address'
            ], 400);
        }
    }
}
