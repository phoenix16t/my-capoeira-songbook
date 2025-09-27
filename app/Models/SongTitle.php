<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SongTitle extends Model
{
    use HasFactory;

    protected $fillable = [
        'song_id',
        'title',
    ];

    /**
     * Get the song that owns this title.
     */
    public function song()
    {
        return $this->belongsTo(Song::class, 'song_id');
    }
}
