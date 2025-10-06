<?php

namespace App\Http\Controllers;

use App\Models\Song;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SongController extends Controller
{
    public function index()
    {
        $songs = Song::with('titles')->get();

        return Inertia::render('songs/Index', [
            'songs' => $songs,
        ]);
    }

    public function show(string $id)
    {
        $song = Song::with('titles', 'group', 'type')->findOrFail($id);

        return Inertia::render('songs/Show', [
            'song' => $song,
        ]);
    }
}
