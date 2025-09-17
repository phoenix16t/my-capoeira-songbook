<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        // $users = User::all();
        // return Inertia::render('Users/Index', ['users' => $users]);
        return Inertia::render('Users/Index');
    }

    // public function create()
    // {
    //     return Inertia::render('Users/Create');
    // }

    // public function store(Request $request)
    // {
    //     $request->validate([
    //         'name' => 'required',
    //         'email' => 'required|email|unique:users',
    //         // add more validation rules as needed
    //     ]);
    //     User::create($request->all());
    //     return redirect()->route('users.index');
    // }

    // public function edit(User $user)
    // {
    //     return Inertia::render('Users/Edit', ['user' => $user]);
    // }

    // public function update(Request $request, User $user)
    // {
    //     $user->update($request->all());
    //     return redirect()->route('users.index');
    // }

    // public function destroy(User $user)
    // {
    //     $user->delete();
    //     return redirect()->route('users.index');
    // }
}
