<?php

use App\Http\Controllers\SongController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [SongController::class, 'index'])->name('songs.index');
Route::redirect('/songs', '/');
Route::get('/songs/{id}', [SongController::class, 'show'])->name('songs.show');
