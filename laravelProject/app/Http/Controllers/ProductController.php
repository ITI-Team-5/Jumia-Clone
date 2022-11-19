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
        $products = Product::orderBy('id', 'desc')->paginate(12);

        if (count($products) == 0) {
            $api_url = 'https://dummyjson.com/products?limit=100';
            $res = Http::get($api_url)->body();
            $data = json_decode($res)->products;
            foreach ($data as $prod) {
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
            $products = Product::orderBy('id', 'desc')->paginate(12);
            return $products;
        }
        return $products;
        // return DB::table('products as p')->select('p.title as product_title', 'p.category as cat_title', 'image', 'price', 'details', 'p.id as id', 'discount', 'quantity')->orderBy('p.id', 'desc')->paginate(12);


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
