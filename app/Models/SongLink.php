<?php

namespace App\Models;

use App\Models\Song;
use Illuminate\Database\Eloquent\Model;

class SongLink extends Model
{
    protected $guarded = [
        'id',
        'song_id',
        'url',
        'start_time',
        'end_time',
        'created_at',
        'updated_at'
    ];

    public function song()
    {
        return $this->belongsTo(Song::class);
    }
}
