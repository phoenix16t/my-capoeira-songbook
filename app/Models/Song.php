<?php

namespace App\Models;

use App\Models\Title;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    use HasFactory;

    protected $fillable = ['lyrics'];

    /**
     * Get the titles for this song.
     */
    public function titles()
    {
        return $this->hasMany(Title::class, 'song_id');
    }
}
