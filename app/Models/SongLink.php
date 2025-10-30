<?php

namespace App\Models;

use App\Models\Song;
use Illuminate\Database\Eloquent\Model;

class SongLink extends Model
{
    protected $fillable = [
        'song_id',
        'url',
        'start_time',
        'end_time',
    ];

    public function song()
    {
        return $this->belongsTo(Song::class);
    }
}
