<?php

namespace App\Http\Controllers;

use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\User;

class GoogleAuthController extends Controller
{
    public function redirect() {
        return Socialite::driver('google')->redirect();
    }

    public function callback()
    {
        $googleUser = Socialite::driver('google')->stateless()->user();

        $user = User::where('google_id', $googleUser->id)->first();
        if (!$user) {
            $user = User::where('email', $googleUser->email)->first();
            if ($user) {
                $user->google_id = $googleUser->id;
            } else {
                $user = new User();
                $user->email = $googleUser->email;
                $user->password = bcrypt(Str::random(16));
            }
        }

        $user->name = $googleUser->name;

        $url = $googleUser->avatar_original ?? $googleUser->avatar;
        $contents = Http::get($url)->body();
        $filename = 'avatars/' . $user->id . '.jpg';
        Storage::disk('public')->put($filename, $contents);
        $user->avatar = '/storage/' . $filename;

        $user->save();

        Auth::login($user);
        return redirect('/?welcome=1');
    }

    public function logout()
    {
        Auth::logout();
        request()->session()->invalidate();
        request()->session()->regenerateToken();
        return redirect('/')->with('message', 'logout');
    }
}
