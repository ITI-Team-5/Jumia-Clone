<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use  App\Http\Requests\StoreUserRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function registerNewUser(StoreUserRequest  $request)
    {

        // echo "hello";
        $newUser = User::create([
            'name' => request()->name,
            'email' => request()->email,
            'password' => request()->password ,
            'phone' =>  request()->phone,
            'address' =>  request()->address,
        ]);
        return $newUser;

    }
    public function login(Request $request){

        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

            if($request->email == 'admin@gmail.com' &&  $request->password == '123456789'){
                $userType = 'admin';
                return response()->json
                (['token' => $user->createToken($request->email)->plainTextToken,
                'data'=> $user,
                'userType' => $userType
                 ]);
            }
           $userType = 'user';
           return response()->json
           (['token' => $user->createToken($request->email)->plainTextToken,
           'data'=> $user,
            'userType' => $userType,
           ]);

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
