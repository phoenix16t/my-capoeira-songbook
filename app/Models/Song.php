<?php

namespace App\Models;

use App\Models\SongTitle;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    use HasFactory;

    protected $fillable = ['lyrics'];

    public function titles()
    {
        return $this->hasMany(SongTitle::class, 'song_id');
    }

    public function songbooks()
    {
        return $this->belongsToMany(Songbook::class, 'songbook_songs');
    }
}
