<?php

use App\Http\Controllers\GoogleAuthController;
use App\Http\Controllers\SongController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/auth/google/redirect', [GoogleAuthController::class, 'redirect'])->name('auth.google.redirect');
Route::get('/auth/google/callback', [GoogleAuthController::class, 'callback'])->name('auth.google.callback');

// Route::middleware(['web', 'auth'])->group(function () {
    Route::get('/', [SongController::class, 'index'])->name('songs.index');
    Route::post('/logout', [GoogleAuthController::class, 'logout'])->name('logout');

    Route::redirect('/songs', '/');
    Route::get('/songs/{id}', [SongController::class, 'show'])->name('songs.show');
// });
