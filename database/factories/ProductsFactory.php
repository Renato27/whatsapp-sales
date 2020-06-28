<?php

use Faker\Generator as Faker;

$factory->define(CodeShopping\Products::class, function (Faker $faker) {
    return [
        'name'          => $faker->colorName,
        'description'   => $faker->text(),
        'price'         => $faker->randomNumber(6)
    ];
});
