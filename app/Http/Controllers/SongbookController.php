<?php

namespace App\Http\Controllers;

use App\Models\Songbook;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SongbookController extends Controller
{
    public function index()
    {
        $songbooks = Songbook::all();

        return Inertia::render('songbooks/Index', [
            'songbooks' => $songbooks,
        ]);
    }

    public function show(string $id)
    {
        $songbook = Songbook::with('songs.titles', 'songs.songbooks')->findOrFail($id);
        $songbooks = Songbook::all();

        return Inertia::render('songbooks/Show', [
            'songbook' => $songbook,
            'songbooks' => $songbooks,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'icon' => ['nullable', 'string', 'max:255'],
            'color' => ['nullable', 'string', 'max:255'],
        ]);

        Songbook::create([
            'user_id' => Auth::id(),
            'title' => $request->input('title'),
            'icon' => $request->input('icon'),
            'color' => $request->input('color'),
        ]);

        return redirect()->back()->with('success');
    }
}
