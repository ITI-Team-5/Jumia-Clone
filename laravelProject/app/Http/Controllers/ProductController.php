<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Models\Product_Order;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use App\Http\Requests\ProductsRequest;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        $api_url = 'https://dummyjson.com/products';
        $res = Http::get($api_url)->body();
        // echo '<pre>';
        // print_r ($res);
        $data = json_decode($res)->products;
        // print_r ($data->products);
        foreach ($data as $prod) {

            // print_r($prod);
            // die;
            $prod = (array)$prod;
            Product::updateOrCreate(
                ['id' => $prod['id']],
                [
                    'id' => $prod['id'],
                    'title' => $prod['title'],
                    'details' => $prod['description'],
                    'price' => $prod['price'],
                    'quantity' => $prod['stock'],
                    'category' => $prod['category'],
                    'discount' => $prod['discountPercentage'],
                    'image' => $prod['thumbnail']
                ]
            );
        }
        // dd('datastored');

        // return DB::table('products as p')->join('categories as c', 'p.cat_id', '=', 'c.id')->select('p.title as product_title', 'c.cat_title as cat_title', 'image', 'price', 'details', 'p.id as id', 'discount')->orderBy('p.id', 'desc')->paginate(12);

        return DB::table('products')->select('title', 'category', 'image', 'price', 'details', 'id', 'discount', 'quantity')->orderBy('id', 'desc')->paginate(12);


    }

    public function show($productId)
    {

        return Product::find($productId); // Check this later

    }

    public function discounts()
    {
        return Product::where('discount', '!=', '0')->get();
    }

    public function search($title)
    {
        return Product::where('title', 'like', '%' . $title . '%')->get();
    }

    public function store(ProductsRequest $request)
    {
        $request->validated();
        if ($image = $request->file('image')) {
            $profileImage = date('YmdHis') . "." . $image->getClientOriginalExtension();
            $path = $request->file('image')->storeAs('public/images', $profileImage);
            $request->image = "$profileImage";
            $data = $request->all();
            return Product::create([
                    'title' => $data['title'],
                    'details' => $data['details'],
                    'image' => $data['image'],
                    'price' => $data['price'],
                    'discount' => $data['discount'],
                    'category' => $data['category']
                ]);
        } else {
            $data = $request->all();
            return Product::create([
                    'title' => $data['title'],
                    'details' => $data['details'],
                    'image' => $data['image'],
                    'price' => $data['price'],
                    'discount' => $data['discount'],
                    'category' => $data['category']

                ]);
        }
    }

    public function edit($id)
    {

        return $editProduct = Product::find($id);
    }

    public function update(Request $request, $id)
    {
        $product = Product::find($id);
        $request->validate([
            'title' => ['required'],
            'details' => ['required'],
            'price' => ['required'],
        ]);

        if ($image = $request->file('image')) {
            Storage::delete('public/images/' . $product->image);
            $profileImage = date('YmdHis') . "." . $image->getClientOriginalExtension();
            $path = $request->file('image')->storeAs('public/images', $profileImage);
            // $request->image = "$profileImage";


            return  $product->update([
                'title' => $request->title,
                'details' => $request->details,
                'image' => $request->image,
                'price' => $request->price,
                'discount' => $request->discount,
                'category' => $request->category


            ]);
        } else {
            return  $product->update([
                'title' => $request->title,
                'image' => $request->image,
                'details' => $request->details,
                'price' => $request->price,
                'discount' => $request->discount,
                'category' => $request->category

            ]);
            //  return dd($request);
        }
    }
    public function destroy($postId)
    {
        $product = Product::find($postId);
        // Post::destroy($postId);
        Storage::delete('public/images/' . $product->image);

        return $product->delete();
    }
}
