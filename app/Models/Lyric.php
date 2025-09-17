<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lyric extends Model
{
    use HasFactory;

    protected $fillable = ['body'];

    /**
     * Get the titles for this song.
     */
    public function titles()
    {
        return $this->hasMany(\App\Models\Title::class, 'lyric_id');
    }
}
