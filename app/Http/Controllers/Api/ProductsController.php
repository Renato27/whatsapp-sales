<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Common\OnlyTrashed;
use Illuminate\Http\Request;
use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Resources\ProductResource;
use CodeShopping\Products;

class ProductsController extends Controller
{
    use OnlyTrashed;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = Products::query();
        $query = $this->onlyTrashedIfRequest($request, $query);
        $product = $query->paginate(10);
        return ProductResource::collection($product);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $product = Products::create($request->all());
        $product->refresh(); //Active
        return new ProductResource($product);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Products $product)
    {
        return new ProductResource($product);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Products $product)
    {
        $product->fill($request->all());
        $product->save();

        return new ProductResource($product);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Products $product)
    {
        $product->delete();

        return response()->json([], 204);
    }

    public function restore(Products $product)
    {
        $product->restore();
        return response()->json([], 204);
    }
}
