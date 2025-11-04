<?php

namespace App\Http\Controllers;

use App\Models\Song;
use App\Models\Songbook;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SongController extends Controller
{
    public function index()
    {
        $songs = Song::with('titles', 'group', 'type', 'songbooks')->get();
        $songbooks = auth()->user()?->songbooks()->get();

        return Inertia::render('songs/index/Index', [
            'songs' => $songs,
            'songbooks' => $songbooks,
        ]);
    }

    public function show(string $id)
    {
        $song = Song::with('titles', 'group', 'type', 'links', 'songbooks')->findOrFail($id);
        $songbooks = auth()->user()?->songbooks()->get();

        return Inertia::render('songs/show/Index', [
            'song' => $song,
            'songbooks' => $songbooks,
        ]);
    }
}
