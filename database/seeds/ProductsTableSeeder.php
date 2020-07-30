<?php

use CodeShopping\Category;
use CodeShopping\Products;
use Illuminate\Database\Seeder;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = Category::all();
        factory(Products::class, 30)
            ->create()
            ->each(function(Products $product)use($categories){
                $categoryId = $categories->random()->id
;                $product->categories()->attach($categoryId);
            });
    }
}
