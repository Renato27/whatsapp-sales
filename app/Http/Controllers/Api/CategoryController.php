<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Filters\CategoryFilter;
use CodeShopping\Category;
use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Requests\CategoryRequest;
use CodeShopping\Http\Resources\CategoryResource;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $filter = app(CategoryFilter::class);
        $filterQuery = Category::filtered($filter);
        $categories = $request->has('all') ? $filterQuery->get() : $filterQuery->paginate(5);
        return CategoryResource::collection($categories);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CategoryRequest $request)
    {
        $category = Category::create($request->all());
        $category->refresh();
        return new CategoryResource($category);
    }

    /**
     * Display the specified resource.
     *
     * @param  \CodeShopping\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
        return new CategoryResource($category);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \CodeShopping\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(CategoryRequest $request, Category $category)
    {
        $category->fill($request->all());
        $category->save();

        return new CategoryResource($category);

        //return response([],204);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \CodeShopping\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        $category->delete();

        return response()->json([],204);
    }
}
