<?php

namespace App\Http\Controllers;

namespace App\Http\Controllers;

use App\Http\Requests\ProductsRequest;
use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use App\Models\Order;
use App\Models\Product_Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    public function allcategories(){
        $api_url = 'https://dummyjson.com/products/categories';
        $res = Http::get($api_url)->body();
        $data = json_decode($res);
        return $data;
    }
    public function showcategory($catId){
        //SELECT p.title,cat_id,price,discount,c.title from products p join categories c on c.id = p.cat_id;

        $category =DB::table('products')->join('categories','products.cat_id', '=' , 'categories.id')->select('title','cat_title','price','discount','image')->where('cat_id',$catId)->get();
        return $category;
    }
}
