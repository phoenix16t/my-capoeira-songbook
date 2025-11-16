<?php

namespace App\Http\Controllers;

use App\Models\Songbook;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SongbookController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Songbook::class, 'songbook');
    }

    public function index()
    {
        $songbooks = auth()->user()?->songbooks()->get();

        return Inertia::render('songbooks/Index', [
            'songbooks' => $songbooks,
        ]);
    }

    public function show(Songbook $songbook)
    {
        $songbook->load('songs.titles', 'songs.songbooks', 'songs.type');
        $songbooks = auth()->user()?->songbooks()->get();

        return Inertia::render('songbooks/Show', [
            'songbook' => $songbook,
            'songbooks' => $songbooks,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'icon' => ['required', 'string', 'max:255'],
            'color' => ['required', 'string', 'max:255'],
        ]);

        Songbook::create([
            'user_id' => Auth::id(),
            'title' => $request->input('title'),
            'icon' => $request->input('icon'),
            'color' => $request->input('color'),
        ]);

        return redirect()->back()->with('success');
    }

    public function update(Request $request, Songbook $songbook)
    {
        $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'icon' => ['required', 'string', 'max:255'],
            'color' => ['required', 'string', 'max:255'],
        ]);

        $songbook->update([
            'title' => $request->input('title'),
            'icon' => $request->input('icon'),
            'color' => $request->input('color'),
        ]);

        return redirect()->back()->with('success');
    }

    public function destroy(Songbook $songbook)
    {
        $songbook->delete();

        return redirect()
            ->route('songbooks.index')
            ->with('success');
    }
}
