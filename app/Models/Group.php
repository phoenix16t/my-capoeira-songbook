<?php

namespace App\Models;

use App\Models\Song;
use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    protected $guarded = [
        'id',
        'name',
        'created_at',
        'updated_at'
    ];

    public function songs()
    {
        return $this->hasMany(Song::class);
    }
}
