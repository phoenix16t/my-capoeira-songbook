<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Songbook extends Model
{
    protected $fillable = ['title', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function songs()
    {
        return $this->belongsToMany(Song::class, 'songbook_songs');
    }
}
