<?php

namespace CodeShopping;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    use Sluggable;
    protected $fillable = ['name', 'description', 'price', 'stock', 'active'];

    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'name'
            ]
        ];
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }

    public function productInputs()
    {
        return $this->hasMany(ProductInput::class, 'product_id', 'id');
    }

    public function photos()
    {
        return $this->hasMany(ProductPhoto::class, 'product_id', 'id');
    }
}
