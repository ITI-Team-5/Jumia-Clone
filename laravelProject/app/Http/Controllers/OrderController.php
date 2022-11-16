<?php

namespace App\Http\Controllers;
use App\Models\Product;
use App\Models\User;
use App\Models\Order;
use App\Models\Order_Product;
use Illuminate\Http\Client\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
class OrderController extends Controller
{
    // public function abc($a,$b)
    // {
    //     return $a+$b;
    // }


    public function order(){
        //select DISTINCT title,qty,order_id,email from products,order_product,orders,users where order_product.product_id = products.id AND order_product.order_id = orders.id AND orders.user_id = users.id;
        $order =DB::table('orders as o')->join('users','users.id', '=' , 'o.user_id')->select('o.id','o.created_at','name','email','status')->get();

        return $order;
    }
    //SELECT order_id,p.id,title,qty,price from products p ,order_product where order_product.product_id = p.id and order_id =$orderId;

    public function orderview($orderId){
        $ordered =DB::table('products as p')->join('order_product','order_product.product_id', '=' , 'p.id')
        ->select(DB::raw('SUM(qty * price) as totaled'),'order_id','title','qty','p.id','price')->groupBy('p.id')->where('order_id',$orderId)->get();
//->select(DB::raw("SUM(student_marks) as count"))
        return $ordered;

    }

    public function updatestatus(Request $request,$orderId){
        $omega = Order::find($orderId);
        $omega->update([
            'status' => $request->status,
        ]);

        return $omega;
    }

    public function store(Request $request){
             $data = $request->all();
            //  $mydata =$data['order'][0];
        //     foreach($data['order'] as $item)
        //       {
        //         $mydata =$item['productId'];

        //     }
        //    return $mydata;

             $order = new Order;
             $order->total = $data['finaltotal'];
             $order->user_id =$data['user_id'];
             $order->status ='Pending';
             $order->save();

             $last_id=$order->id;


             foreach($data['order'] as $item)
             {
                $orderdetails = new Order_Product;
                $orderdetails->order_id=$last_id;
                $orderdetails->product_id =$item['productId'];
                $orderdetails->qty =$item['quantity'];
                $orderdetails->totaleach =$item['totalPrice'];
                $orderdetails->save();
             }

            return  $order;

    }
}
