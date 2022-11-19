<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;

class Product extends Model
{
    use HasFactory;
    use Sluggable;

    protected $fillable = [
        'id',
        'title',
        'SKU',
        'details',
        'quantity',
        'image',
        'price',
        'discount',
        'category'
    ];
    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'SKU'
            ]
        ];
    }
    public function productorder(){
        return $this->hasMany(Product_Order::class);
    }
    public function categories(){
        return  $this->belongsTo(Category::class);
      }
}
