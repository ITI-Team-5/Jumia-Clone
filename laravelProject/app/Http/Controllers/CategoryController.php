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

        if (count($category) == 0) {
            $api_url = 'https://dummyjson.com/products/categories';
            $res = Http::get($api_url)->body();
            $data = json_decode($res);
            foreach ($data as $cat) {
                Category::updateOrCreate([
                    'name' => $cat
                ]);
            }
            $category = Category::all();
            return $category;
        }

            return $category;

    }

    public function showcategory($catname)
    {

        $category = DB::table('products as p')->join('categories', 'p.category', '=', 'categories.name')->select('p.title as title', 'category', 'price', 'discount', 'image','p.id as id')->where('category', $catname)->get();
        return $category;
    }
}
