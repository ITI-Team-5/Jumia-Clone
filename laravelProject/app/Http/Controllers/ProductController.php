<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductsRequest;
use App\Models\Product;
use App\Models\User;
use App\Models\Order;
use App\Models\Product_Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{

    public function index(){
        return Product::orderBy('id', 'desc')->paginate(12);
    }

    public function show($productId){

        return Product::find($productId); // Check this later

    }

    public function discounts(){
         return Product::where('discount','!=','0')->get();
    }

    public function store(ProductsRequest $request)
    {
        $request->validated();
        if ($image = $request->file('image'))
         {
            $profileImage = date('YmdHis') . "." . $image->getClientOriginalExtension();
            $path = $request->file('image')->storeAs('public/images', $profileImage);
            $request->image = "$profileImage";
            $data = $request->all();
            return Product::create
            ([
                'title' => $data['title'],
                'SKU' => $data['SKU'],
                'details' => $data['details'],
                'image' =>$profileImage,
                'price' => $data['price'],
                'discount'=>$data['discount'],
                'cat_id'=>$data['cat_id']
            ]);
        }
        else{
            $data = $request->all();
            return Product::create
            ([
                'title' => $data['title'],
                'SKU' => $data['SKU'],
                'details' => $data['details'],
                // 'image' =>$profileImage,
                'price' => $data['price'],
                'discount'=>$data['discount'],
                'cat_id'=>$data['cat_id']

            ]);
        }

    }

    public function edit($id){

        return $editProduct = Product::find($id);

    }

    public function update(Request $request,$id )
    {
        $product = Product::find($id);
        $request->validate([
            'title' =>['required'],
            'SKU' =>['required','unique:products,SKU,'.$id],
            'details' =>['required'],
            'price' =>['required'],
        ]);

        if ($image = $request->file('image'))
         {
            Storage::delete('public/images/' . $product->image);
            $profileImage = date('YmdHis') . "." . $image->getClientOriginalExtension();
            $path = $request->file('image')->storeAs('public/images', $profileImage);
            // $request->image = "$profileImage";


        return  $product->update([
            'title' => $request->title,
            'SKU' => $request->SKU,
            'details' => $request->details,
            'image' => $profileImage,
            'price' => $request->price,
            'discount'=>$request->discount,
            'cat_id'=>$request->cat_id


        ]);

         }
        else{
            return  $product->update([
                'title' => $request->title,
                'SKU' => $request->SKU,
                'details' => $request->details,
                'price' => $request->price,
                'discount'=>$request->discount,
                'cat_id'=>$request->cat_id

        ]);
        //  return dd($request);
        }


}
    public function destroy($postId){
    $product = Product::find($postId);
    // Post::destroy($postId);
    Storage::delete('public/images/' . $product->image);

    return $product->delete();
}
}