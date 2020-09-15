<?php

use CodeShopping\ProductPhoto;
use CodeShopping\Products;
use Illuminate\Database\Seeder;

class ProductPhotosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $products = Products::all();
        $this->deleteAllPhotosInProductsPath();
        $self = $this;
        $products->each(function($product) use($self){
            $self->createPhotoDir($product);
            $self->createPhotosModels($product);
        });
    }

    private function deleteAllPhotosInProductsPath()
    {
        $path = ProductPhoto::PRODUCTS_PATH;
        \File::deleteDirectory(storage_path($path), true);
    }

    private function createPhotoDir(Products $products)
    {
        $path = ProductPhoto::photosPath($products->id);
        \File::makeDirectory($path, 0777, true);
    }

    private function createPhotosModels(Products $products)
    {
        foreach(range(1,5) as $v){
            $this->createPhotoModel($products);
        }
    }

    private function createPhotoModel(Products $products)
    {
        ProductPhoto::create([
            'product_id'    => $products->id,
            'file_name'     => 'imagem.jpg'
        ]);
    }
}
