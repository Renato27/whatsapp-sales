<?php

namespace CodeShopping\Rules;

use CodeShopping\Products;
use Illuminate\Contracts\Validation\Rule;

class HasStock implements Rule
{

    private $products;
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct(Products $products)
    {
        $this->products = $products;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return $this->products->stock - $value >= 0;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return "The product {$this->products->name} doesn't have sufficient stock to output";
    }
}
