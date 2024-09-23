namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Wallet;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log; // 导入 Log 门面
use Carbon\Carbon;

class WalletController extends Controller
{
    public function store(Request $request)
    {
        // 打印请求是否送达
        Log::info('请求送达');

        // 获取请求的 JSON 数据
        $data = $request->json()->all();
        $walletAddress = $data['wallet_address'] ?? null;

        // 打印钱包地址
        Log::info('地址为' . $walletAddress);

        // 验证钱包地址是否存在
        if ($walletAddress) {
            // 获取当前时间
            $currentTime = Carbon::now();
            Log::info('时间为' . $currentTime);

            // 存储到数据库
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
                // 返回错误响应
                return response()->json([
                    'message' => 'Error connecting wallet',
                    'error' => $e->getMessage(),
                ], 500);
            }
        } else {
            // 返回无效钱包地址响应
            return response()->json([
                'message' => 'Invalid wallet address'
            ], 400);
        }
    }
}
