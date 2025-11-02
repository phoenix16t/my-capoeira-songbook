<?php

namespace App\Models;

use App\Models\Song;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Songbook extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'icon',
        'color'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function songs()
    {
        return $this->belongsToMany(Song::class, 'songbook_songs');
    }
}
