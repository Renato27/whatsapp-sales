<?php

namespace CodeShopping\Http\Requests;

use CodeShopping\Products;
use CodeShopping\Rules\HasStock;
use Illuminate\Foundation\Http\FormRequest;

class ProductOutputRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $product = Products::findOrfail($this->product_id);

        return [
            'amount'        => ['required','integer','min:1', new HasStock($product)],
        ];
    }
}
