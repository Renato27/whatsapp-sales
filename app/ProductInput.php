<?php

namespace CodeShopping;

use Illuminate\Database\Eloquent\Model;

class ProductInput extends Model
{
    protected $fillable = ['amount', 'product_id'];

    public function product()
    {
        return $this->belongsTo(Products::class, 'product_id', 'id');
    }
}
