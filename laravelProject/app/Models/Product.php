<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'title',
        'details',
        'quantity',
        'image',
        'price',
        'discount',
        'category'
    ];

    public function productorder(){
        return $this->hasMany(Product_Order::class);
    }
    public function categories(){
        return  $this->belongsTo(Category::class);
      }
}
