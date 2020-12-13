<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['namespace' => 'Api', 'as' => 'api.'], function () {
    Route::resource('products', 'ProductsController', ['except' => ['create', 'edit']]);
    Route::resource('categories', 'CategoryController', ['except' => ['create', 'edit']]);
    Route::resource('users',    'UserController');
    Route::resource('products.categories', 'ProductCategoryController', ['only' => ['index', 'store', 'destroy']]);
    Route::resource('products.photos',     'ProductPhotoController',  ['except' => ['create', 'edit']]);
       // gera uma rota igual a products/{product}/categories
    Route::resource('inputs', 'ProductInputController', ['only' => ['store', 'index', 'show']]);
    Route::resource('outputs', 'ProductOutputController', ['only' => ['store', 'index', 'show']]);

});

