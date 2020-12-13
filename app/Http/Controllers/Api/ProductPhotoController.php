<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Requests\ProductphotoRequest;
use CodeShopping\Http\Resources\ProductPhotoCollection;
use CodeShopping\Http\Resources\ProductPhotoResource;
use CodeShopping\ProductPhoto;
use CodeShopping\Products;
use Illuminate\Http\Request;

class ProductPhotoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Products $product)
    {
        return new ProductPhotoCollection($product->photos, $product);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductphotoRequest $request, Products $product)
    {
       $photos = ProductPhoto::createWithPhotosFiles($product->id, $request->photos);
       return response()->json(new ProductPhotoCollection($photos, $product), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \CodeShopping\ProducPhoto  $producPhoto
     * @return \Illuminate\Http\Response
     */
    public function show(Products $product, ProductPhoto $photo)
    {
        $this->hasProductPhoto($photo, $product);
        return new ProductPhotoResource($photo);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \CodeShopping\ProducPhoto  $producPhoto
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Products $product, ProductPhoto $photo)
    {
        $this->hasProductPhoto($photo, $product);
        $photo = $photo->updatePhotoModel($request->photo);
        return new ProductPhotoResource($photo);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \CodeShopping\ProducPhoto  $producPhoto
     * @return \Illuminate\Http\Response
     */
    public function destroy(Products $product, ProductPhoto $photo)
    {
        $this->hasProductPhoto($photo, $product);
        $photo->deleteWithPhoto();

        return response()->json([], 204);
    }

    private function hasProductPhoto(ProductPhoto $photo, Products $product)
    {
        if($photo->product_id != $product->id){
            abort(404);
        }
    }
}
