<?php

declare(strict_types=1);
namespace CodeShopping;

use DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;

class ProductPhoto extends Model
{
    const BASE_PATH    = 'app/public';
    const DIR_PRODUCTS = 'products';
    const PRODUCTS_PATH = self::BASE_PATH .'/'. self::DIR_PRODUCTS;

    protected $fillable = ['file_name', 'product_id'];

    public static function photosPath($productId)
    {
        $path = self::PRODUCTS_PATH;
        return storage_path("{$path}/{$productId}");
    }

    public static function createWithPhotosFiles(int $productId, array $files) : Collection
    {
        try {
            self::uploadFiles($productId, $files);
            \DB::beginTransaction();
            $photos = self::createPhotosModels($productId, $files);
            \DB::commit();
            return new Collection($photos);
        } catch (\Throwable $th) {
            \DB::rollBack();
            self::deleteFiles($productId, $files);
            throw $th;
        }

    }

    private static function deleteFiles(int $productId, array $files)
    {

        foreach($files as $file){
            $path = self::photosPath($productId);
            $photoPath = "{$path}/{$file->hashName()}";
            if(file_exists($photoPath)){
                \File::delete($photoPath);
            }
        }
    }

    public function updatePhotoModel(UploadedFile $file) : ?ProductPhoto
    {
        try {
            self::uploadFiles($this->product_id, [$file]);
            \DB::beginTransaction();
            $this->deletePhotoModel($this->file_name);
            $this->file_name = $file->hashName();
            $this->save();
            \DB::commit();
            return $this;
        } catch (\Throwable $th) {
            self::deleteFiles($this->product_id, [$file]);
            \DB::rollBack();
            throw $th;
        }
    }

    public function deleteWithPhoto() : bool
    {
        try {
            \DB::beginTransaction();
            $this->deletePhotoModel($this->file_name);
            $resultado = $this->delete();
            \DB::commit();
            return $resultado;
        } catch (\Throwable $th) {
            \DB::rollBack();
            throw $th;
        }
    }

    public function deletePhotoModel($filename)
    {
         $dir = self::photosDir($this->product_id);
         \Storage::disk('public')->delete("{$dir}/{$filename}");
    }


    public static function uploadFiles(int $productId, array $files)
    {
        $dir = self::photosDir($productId);
        /**
         * @var UploadFile $file
         */
        foreach($files as $file){
            $file->store($dir, ['disk' => 'public']);
        }
    }

    private static function createPhotosModels(int $productId, array $files) : array
    {
        $photos = [];

        foreach($files as $file){
            $photos[] = self::create([
                'file_name'  => $file->hashName(),
                'product_id' => $productId
            ]);
        }

        return $photos;
    }

    public function getPhotoUrlAttribute()
    {
        $path = self::photosDir($this->product_id);
        return asset("storage/{$path}/{$this->file_name}");
    }

    public static function photosDir($productId)
    {
        $dir = self::DIR_PRODUCTS;
        return "{$dir}/{$productId}";
    }

    public function product()
    {
        return $this->belongsTo(Products::class, 'product_id')->withTrashed();
    }
}
