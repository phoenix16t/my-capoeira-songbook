<?php

namespace App\Models;

use App\Models\Song;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SongTitle extends Model
{
    use HasFactory;

    protected $fillable = [
        'song_id',
        'title',
    ];

    public function song()
    {
        return $this->belongsTo(Song::class);
    }
}
