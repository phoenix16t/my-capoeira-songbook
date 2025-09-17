<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return view('welcome');
// });
Route::get('/', function () {
    return Inertia::render('Users/Index'); // This loads resources/js/Pages/Index.vue
});
Route::get('/users', [UserController::class, 'index'])->name('users.index');
