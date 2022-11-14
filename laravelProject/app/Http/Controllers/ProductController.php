<?php

namespace App\Http\Controllers;
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

    public function store(Request $request)
    {
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
            ]);
        }

    }

    public function edit($slug){

        return $editProduct = Product::where('SKU', $slug)->get()->first();

    }

    public function update(Request $request,$sku )
    {

        $product = Product::where('SKU', $sku)->get()->first();

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
            'price' => $request->price
        ]);

         }
        else{
            return  $product->update([
                'title' => $request->title,
                'SKU' => $request->SKU,
                'details' => $request->details,
                'price' => $request->price
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
