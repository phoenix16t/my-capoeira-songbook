<?php

use App\Http\Controllers\SongController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [SongController::class, 'index'])->name('songs.index');
