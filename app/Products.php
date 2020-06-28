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
}
