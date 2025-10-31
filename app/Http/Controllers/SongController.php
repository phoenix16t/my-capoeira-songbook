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
        $permissions = auth()->user()?->permission;
        $songs = Song::with('titles', 'songbooks')->get();
        $songbooks = Songbook::all();

        return Inertia::render('songs/index/Index', [
            'permissions' => $permissions,
            'songbooks' => $songbooks,
            'songs' => $songs,
        ]);
    }

    public function show(string $id)
    {
        $song = Song::with('titles', 'group', 'type', 'links', 'songbooks')->findOrFail($id);
        $songbooks = Songbook::all();

        return Inertia::render('songs/show/Index', [
            'song' => $song,
            'songbooks' => $songbooks,
        ]);
    }
}
