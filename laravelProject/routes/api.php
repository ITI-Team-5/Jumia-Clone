<?php

use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Laravel\Socialite\Facades\Socialite;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
//orders
Route::get("orders",[OrderController::class,'order']);
Route::get("orders/{order}",[OrderController::class,'orderview']);
Route::post("orders/{order}",[OrderController::class,'updatestatus']);
Route::post("orders",[OrderController::class,'store']);

//auth
Route::post("/signup", [UserController::class, 'registerNewUser']);
Route::post("/login", [UserController::class, 'login']);
// Route::get("/logout", [UserController::class, 'logout']);
Route::get("/signup", [UserController::class, 'getDataUser']);
Route::get("/signup/{id}", [UserController::class, 'getDataUserId']);
Route::group(['middleware' => ['auth:sanctum']], function() {
    Route::delete('logout',   [UserController::class, 'logout']);
  });

//products
Route::get("products",[ProductController::class,'index']);
Route::get("products/{product}",[ProductController::class,'show']);
Route::post("products",[ProductController::class,'store']);
// Route::post("products",[ProductController::class,'store']);
Route::get('/products/{product}/edit',[ProductController::class,'edit']);
Route::post('/products/{product}',[ProductController::class,'update']);
Route::delete('/products/{product}',[ProductController::class,'destroy']);


//Profile
// Route::get("checkout/profiles/{profile}",[ProfileController::class,'show']);
Route::get("profiles/{profile}",[ProfileController::class,'show']);
Route::get("profiles/{profile}/edit",[ProfileController::class,'edit']);
Route::post("profiles/{profile}",[ProfileController::class,'update']);
Route::delete("profiles/{profile}",[ProfileController::class,'destroy']);


Route::post('/sanctum/token', function (Request $request) {
$request->validate([
    'email' => 'required|email',
    'password' => 'required',
]);

$user = User::where('email', $request->email)->first();

if (! $user || ! Hash::check($request->password, $user->password)) {
    throw ValidationException::withMessages([
        'email' => ['The provided credentials are incorrect.'],
    ]);
}

return (['token' => $user->createToken($request->email)->plainTextToken,]);
});


Route::get('google/auth/redirect', function () {
    return Socialite::driver('google')->redirect();
});

Route::get('google/auth/callback', function () {
    $githubUser = Socialite::driver('google')->stateless()->user();

    $user = User::updateOrCreate([
        'email' => $githubUser->email,
    ], [
        'name' => $githubUser->name,
        'email' => $githubUser->email,
        'github_token' => $githubUser->token,
        'github_refresh_token' => $githubUser->refreshToken,
    ]);

    Auth::login($user);

    return $user;
});


