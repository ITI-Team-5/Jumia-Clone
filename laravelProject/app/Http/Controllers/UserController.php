<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use  App\Http\Requests\StoreUserRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
    public function registerNewUser(StoreUserRequest  $request)
    {

          $request->validated();
        $newUser = User::create([
            'name' => request()->name,
            'email' => request()->email,
            'password' => Hash::make($request->password),
            'phone' =>  request()->phone,
            'address' =>  request()->address,
            'accept' => request()->accept,
            'role' => 'user',
        ]);
        return $newUser;

    }
    public function RegisterByGoogle(Request  $request)
    {
        //   $request->validated();
            $user = User::UpdateOrCreate([
            'name' => request()->name,
            'email' => request()->email,
            // 'remember_token' => request()->idToken,
        ]);
        
         return (['token' => $user->createToken($request->email)->plainTextToken,'name' =>$user->name,'role' => $user->role,"UserId"=>$user->id]);


    }


    //login
    public function login(Request $request){

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

        return (['token' => $user->createToken($request->email)->plainTextToken,'name' =>$user->name,'role' => $user->role,"UserId"=>$user->id]);


        // if (! $user || ! Hash::check($request->password, $user->password)) {
        //     return response()->json ([
        //         'content' => 'The provided credentials are incorrect.',
        //     ],404);
        // }
        // else{

        //     if($request->email == 'admin@gmail.com' && /*Hash::check*/ $request->password == 'Admin@123'){
        //         $userType = 'admin';
        //         return response()->json
        //         (['token' => $user->createToken($request->email)->plainTextToken,
        //         'data'=> $user,
        //         'userType' => $userType
        //          ]);
        //     }
        //    $userType = 'user';
        //    return response()->json
        //    (['token' => $user->createToken($request->email)->plainTextToken,
        //    'data'=> $user,
        //     'userType' => $userType,
        //    ]);


        // }

    }
    public function logout(Request $request){
    $request -> user()-> tokens()-> delete();
    return response()->json(
        [
            'message' => 'user logged out'
        ],200
    );

    }

    public function getDataUser(){
        $user = User::all();
    }

    public function getDataUserId($Id){
        $user = User::find($Id);
    }


}
