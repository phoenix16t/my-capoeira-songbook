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
        $songbook = Songbook::with('songs.titles')->findOrFail($id);

        return Inertia::render('songbooks/Show', [
            'songbook' => $songbook,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => ['required', 'string', 'max:255'],
        ]);

        Songbook::create([
            'title' => $request->input('title'),
            'user_id' => Auth::id(),
        ]);

        return redirect()->back()->with('success', 'Songbook created successfully.');
    }
}
