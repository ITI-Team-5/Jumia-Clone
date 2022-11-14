<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'status',
        'user_id',
        'total'
    ];

    public function user(){
       return $this->belongsTo(User::class);
    }

    public function productorder(){
       return $this->hasMany(Product_Order::class);
    }
}
