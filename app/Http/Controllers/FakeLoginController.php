<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class FakeLoginController extends Controller
{
    public function loginAsUser($id = 1)
    {
        $user = User::find($id);
        if ($user) {
            Auth::login($user);
            return redirect('/');
        }
        return 'User not found';
    }
}
