<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Models\Order;
use App\Models\User;
use App\Models\Order_Product;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rules\Password;

class ProfileController extends Controller
{
    public function show($profileId){
        //SELECT o.id,name,email,phone,address,status,totaleach,total,qty,title from users join orders o on users.id = o.user_id join order_product ON o.id = order_product.order_id JOIN products ON products.id=order_product.product_id;
         $orderProduct =DB::table('users as u')->leftJoin('orders as o','o.user_id', '=' , 'u.id')->leftJoin('order_product','o.id', '=' , 'order_product.order_id')->leftJoin('products','products.id', '=' , 'order_product.product_id')->select('order_id','price','total','qty','title')->where('u.id',$profileId)->get();
        $profiles = User::find($profileId);
        $ProfileOrder = Order::where('user_id',$profileId)->get();

        return ['users' => $profiles,'orders'=>$ProfileOrder,'productsorders'=> $orderProduct] ;
    }

    public function edit($profileId){
        return  User::find($profileId);
    }

    public function update(Request $request,$profileId){
        $Profile = User::find($profileId);

        $request->validate([
            'name' => ['required','min:3'],
            'email' => ['required','unique:users,email,'.$profileId],
            'password' => ['required',Password::min(8)->letters()->mixedCase()->symbols()->numbers()],
            'address' =>['required'],
            'phone' =>['required','min:10'],
        ]);
      return  $Profile->update([
            'name' =>$request->name,
            'email' =>$request->email,
            'phone' =>$request->phone,
            'address' =>$request->address,
            'password' =>$request->password,
        ]);
    }


    public function destroy(Request $request,$orderId){
        $ProductOrder = Order_Product::where('order_id',$orderId)->get();
         //dd($Order);
        $order = Order::find($orderId);
                if ($order->status =="pending") {
                    foreach ($ProductOrder as $o) {
                        $o->delete();
                    }
                    return $order->delete();
                }

    }
}
