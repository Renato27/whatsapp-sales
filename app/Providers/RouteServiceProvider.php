<?php

namespace CodeShopping\Providers;

use CodeShopping\Category;
use CodeShopping\Common\OnlyTrashed;
use CodeShopping\Products;
use CodeShopping\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;

class RouteServiceProvider extends ServiceProvider
{

    use OnlyTrashed;
    /**
     * This namespace is applied to your controller routes.
     *
     * In addition, it is set as the URL generator's root namespace.
     *
     * @var string
     */
    protected $namespace = 'CodeShopping\Http\Controllers';

    /**
     * Define your route model bindings, pattern filters, etc.
     *
     * @return void
     */
    public function boot()
    {
        //

        parent::boot();

        Route::bind('category', function($value){
            /**
             * @var Collection $colletion
             */
            $colletion =  Category::whereId($value)->orWhere('slug', $value)->get();
            return $colletion->first();
        });

        Route::bind('product', function($value){
            /**
             * @var Collection $colletion
             */
            $query = Products::query();
            $request = app(Request::class);
            $query = $this->onlyTrashedIfRequest($request, $query);
            $colletion =  $query->whereId($value)->orWhere('slug', $value)->get();
            return $colletion->first();
        });

        Route::bind('user', function($value){
            /**
             * @var Collection $colletion
             */
            $query = User::query();
            $request = app(Request::class);
            $query = $this->onlyTrashedIfRequest($request, $query);
            return $query->find($value);
        });
    }

    /**
     * Define the routes for the application.
     *
     * @return void
     */
    public function map()
    {
        $this->mapApiRoutes();

        $this->mapWebRoutes();

        //
    }

    /**
     * Define the "web" routes for the application.
     *
     * These routes all receive session state, CSRF protection, etc.
     *
     * @return void
     */
    protected function mapWebRoutes()
    {
        Route::middleware('web')
             ->namespace($this->namespace)
             ->group(base_path('routes/web.php'));
    }

    /**
     * Define the "api" routes for the application.
     *
     * These routes are typically stateless.
     *
     * @return void
     */
    protected function mapApiRoutes()
    {
        Route::prefix('api')
             ->middleware('api')
             ->namespace($this->namespace)
             ->group(base_path('routes/api.php'));
    }
}
