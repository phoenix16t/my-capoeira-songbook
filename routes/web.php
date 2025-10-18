<?php

use App\Http\Controllers\FakeLoginController;
use App\Http\Controllers\GoogleAuthController;
use App\Http\Controllers\SongController;
use App\Http\Controllers\SongbookController;
use App\Http\Controllers\SongbookSongController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/auth/google/redirect', [GoogleAuthController::class, 'redirect'])->name('auth.google.redirect');
Route::get('/auth/google/callback', [GoogleAuthController::class, 'callback'])->name('auth.google.callback');
Route::get('/fake-login/{id?}', [FakeLoginController::class, 'loginAsUser']);

Route::get('/', [SongController::class, 'index'])->name('songs.index');
Route::redirect('/songs', '/');
Route::get('/songs/{id}', [SongController::class, 'show'])->name('songs.show');

Route::middleware(['web', 'auth'])->group(function () {
    Route::post('/logout', [GoogleAuthController::class, 'logout'])->name('logout');
    Route::get('/songbooks', [SongbookController::class, 'index'])->name('songbooks.index');
    Route::get('/songbooks/{id}', [SongbookController::class, 'show'])->name('songbooks.show');
    Route::post('/songbooks', [SongbookController::class, 'store'])->name('songbooks.store');
    // Route::post('/songbooks/{songbook}/songs/{song}', [SongbookSongController::class, 'store'])->name('songbooks.songs.store');
    // Route::delete('/songbooks/{songbook}/songs/{song}', [SongbookSongController::class, 'destroy'])->name('songbooks.songs.destroy');
    Route::post('/songbooks_songs', [SongbookSongController::class, 'store'])->name('songbooks.songs.store');
    Route::delete('/songbooks_songs', [SongbookSongController::class, 'destroy'])->name('songbooks.songs.destroy');

});

Route::get('/hello', function () {
    return Inertia::render('Hello');
});

// Route::get('/hello2', function () {
//     return Inertia::render('Hello2');
// });


// Route::get('/', function () {
//     return "Hello from Laravel!";
// });

