<?php

use App\Http\Controllers\CategoryController;
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
Route::post('/sanctum/token', [UserController::class,'login']);

// google api
Route::post("/signupWithGoogle", [UserController::class, 'RegisterByGoogle']);


//products
Route::get("products",[ProductController::class,'index']);
Route::get("products/discounts",[ProductController::class,'discounts']);
Route::get("products/{product}",[ProductController::class,'show']);
Route::post("products",[ProductController::class,'store']);
// Route::post("products",[ProductController::class,'store']);
Route::get('/products/{product}/edit',[ProductController::class,'edit']);
Route::post('/products/{product}',[ProductController::class,'update']);
Route::delete('/products/{product}',[ProductController::class,'destroy']);

//categories

Route::get("categories",[CategoryController::class,'allcategories']);
Route::get("categories/{category}",[CategoryController::class,'showcategory']);

Route::get("searches/{search}",[ProductController::class,'search']);



//Profile
// Route::get("checkout/profiles/{profile}",[ProfileController::class,'show']);
Route::get("profiles/{profile}",[ProfileController::class,'show']);
Route::get("profiles/{profile}/edit",[ProfileController::class,'edit']);
Route::post("profiles/{profile}",[ProfileController::class,'update']);
Route::delete("profiles/{profile}",[ProfileController::class,'destroy']);



