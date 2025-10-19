<?php

namespace App\Http\Controllers;

use App\Models\Song;
use App\Models\Songbook;
use Illuminate\Http\Request;

use Inertia\Inertia;

class SongbookSongController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'songbook_id' => ['required', 'exists:songbooks,id'],
            'song_id' => ['required', 'exists:songs,id'],
        ]);

        $songbook = Songbook::findOrFail($request->songbook_id);
        $songbook->songs()->syncWithoutDetaching([$request->song_id]);

        return redirect()->back()->with('success');
    }

    public function destroy(Request $request)
    {
        $request->validate([
            'songbook_id' => ['required', 'exists:songbooks,id'],
            'song_id' => ['required', 'exists:songs,id'],
        ]);

        $songbook = Songbook::findOrFail($request->songbook_id);
        $songbook->songs()->detach($request->song_id);

        return redirect()->back()->with('success');
    }    
}
