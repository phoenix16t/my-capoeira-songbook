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

        return Inertia::render('songs/index/Index', [
            'songs' => $songs,
        ]);
    }

    public function show(string $id)
    {
        $song = Song::with('titles', 'group', 'type', 'links')->findOrFail($id);

        return Inertia::render('songs/show/Index', [
            'song' => $song,
        ]);
    }
}
