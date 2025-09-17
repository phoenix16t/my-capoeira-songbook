<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Title extends Model
{
    use HasFactory;

    protected $fillable = [
        'lyric_id',
        'title',
    ];

    /**
     * Get the song that owns this title.
     */
    public function lyric()
    {
        return $this->belongsTo(Lyric::class, 'lyric_id');
    }
}
