<?php

namespace App\Http\Controllers;

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Order;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Models\Product_Order;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use App\Http\Requests\ProductsRequest;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{

    public function allcategories()
    {
        $category = Category::all();
        $api_url = 'https://dummyjson.com/products/categories';
        $res = Http::get($api_url)->body();
        $data = json_decode($res);
        foreach ($data as $cat) {
            // echo '<pre>';
            //     print_r($cat);
            Category::updateOrCreate([
                'name' => $cat
            ]);
        }
        $category = Category::all();
        return $category;
    }
    public function showcategory($catname)
    {

        $category = DB::table('products')->join('categories', 'products.category', '=', 'categories.name')->select('title', 'category', 'price', 'discount', 'image')->where('category', $catname)->get();
        return $category;
    }
}
