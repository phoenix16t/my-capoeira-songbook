<?php

use App\Http\Controllers\FakeLoginController;
use App\Http\Controllers\GoogleAuthController;
use App\Http\Controllers\SongController;
use App\Http\Controllers\SongbookController;
use App\Http\Controllers\SongbookSongController;
use App\Http\Controllers\UserSettingController;
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
    Route::post('/songbooks', [SongbookController::class, 'store'])->name('songbooks.store');
    Route::get('/songbooks/{id}', [SongbookController::class, 'show'])->name('songbooks.show');
    Route::post('/songbooks/{id}', [SongbookController::class, 'update'])->name('songbooks.update');
    Route::delete('/songbooks/{id}', [SongbookController::class, 'destroy'])->name('songbooks.destroy');

    Route::post('/songbooks_songs', [SongbookSongController::class, 'store'])->name('songbooks_songs.store');
    Route::delete('/songbooks/{songbook}/songs/{song}', [SongbookSongController::class, 'destroy'])->name('songbooks_songs.destroy');

    Route::post('/user-settings', [UserSettingController::class, 'update'])->name('settings.update');
});
