<?php

namespace App\Http\Controllers;

use App\Models\Songbook;
use Illuminate\Http\Request;
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
}
