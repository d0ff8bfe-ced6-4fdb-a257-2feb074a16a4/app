<?php

use App\Http\Controllers\FileVersionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FileController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/upload', [FileVersionController::class, 'upload']);
Route::get('/versions/{projectId}/{fileName}', [FileVersionController::class, 'versions']);
Route::get('/project/{projectId}/files', [FileVersionController::class, 'projectFiles']);
Route::get('/files/last-versions', [FileController::class, 'getLastVersions']);
Route::get('/files/download/{prj_id}/{file_name}', [FileController::class, 'downloadFile'])->name('file:download');

