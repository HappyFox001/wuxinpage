use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WalletController;

Route::post('/connect_wallet', [WalletController::class, 'store']);
