<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/chats', function () {
    return view('chat');
})->name('chats');

Route::get('/chat/{id}', function (int $id) {
    return view('chat-view', compact('id'));
})->name('chat.view');

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name('dashboard');
});
