<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\ProductInput;
use Illuminate\Http\Request;
use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Requests\ProductInputRequest;
use CodeShopping\Http\Resources\ProductInputResource;
use CodeShopping\Products;

class ProductInputController extends Controller
{
    public function index()
    {
        $inputs = ProductInput::with('product')->paginate(); //eager loading | lazy loading

        return ProductInputResource::collection($inputs);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductInputRequest $request)
    {
        $input = ProductInput::create($request->all());
            
        return new ProductInputResource($input);

    }

    public function show(ProductInput $input)
    {
        return new ProductInputResource($input);
    }


}
