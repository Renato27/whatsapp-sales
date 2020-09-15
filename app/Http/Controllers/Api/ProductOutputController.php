<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\ProductOutput;
use Illuminate\Http\Request;
use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Requests\ProductOutputRequest;
use CodeShopping\Http\Resources\ProductOutputResource;

class ProductOutputController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $outputs = ProductOutput::with('product')->paginate(); //eager loading | lazy loading

        return ProductOutputResource::collection($outputs);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductOutputRequest $request)
    {
        $output = ProductOutput::create($request->all());
            
        return new ProductOutputResource($output);
    }

    /**
     * Display the specified resource.
     *
     * @param  \CodeShopping\ProductOutput  $productOutput
     * @return \Illuminate\Http\Response
     */
    public function show(ProductOutput $output)
    {
        return  new ProductOutputResource($output);
    }

}
   