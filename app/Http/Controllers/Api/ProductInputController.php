<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\ProductInput;
use Illuminate\Http\Request;
use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Products;

class ProductInputController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request,ProductInput $productInput)
    {
        $productInput->create([
            'amount'        => $request->amount,
            'product_id'    => $request->product_id
        ]);
        
        $product = Products::find($request->product_id);
            
        if(!is_null($product)){
            $product->stock += $request->amount;
            $product->save();
        } 

        return $product;

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \CodeShopping\ProductInput  $productInput
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ProductInput $productInput)
    {
        if($productInput->amount > $request->amount){
           (int)$resto1 = $productInput->amount % $request->amount;
            $product = Products::find($productInput->product_id);
            
            if(!is_null($product)){
                $product->stock += $resto1;
                $product->save();
            } 
        }
            
        if($productInput->amount < $request->amount){
            (int)$resto2 = $request->amount % $productInput->amount;
            $product = Products::find($productInput->product_id);
            
            if(!is_null($product)){
                $product->stock += $resto2;
                $product->save();
            } 
        }

        $productInput->fill($request->all());
        $productInput->save();
        

        return $productInput;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \CodeShopping\ProductInput  $productInput
     * @return \Illuminate\Http\Response
     */
    public function destroy(ProductInput $productInput)
    {
        $product = Products::find($productInput->product_id);
        $product->stock -= $productInput->amount;
        $product->save();
        $productInput->delete();

        return response()->json([],204);
    }
}
