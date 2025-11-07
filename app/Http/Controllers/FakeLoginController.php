<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
