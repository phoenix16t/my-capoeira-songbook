<?php

namespace App\Models;

use App\Models\Group;
use App\Models\Songbook;
use App\Models\SongLink;
use App\Models\SongTitle;
use App\Models\SongType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    use HasFactory;

    protected $fillable = [
        'translation',
        'lyrics',
        'group_id',
        'count',
        'type_id',
        'author'
    ];

    protected $guarded = [
        'id',
        'created_at',
        'updated_at'
    ];

    public function titles()
    {
        return $this->hasMany(SongTitle::class, 'song_id');
    }

    public function songbooks()
    {
        return $this->belongsToMany(Songbook::class, 'songbook_songs');
    }

    public function group()
    {
        return $this->belongsTo(Group::class);
    }

    public function type()
    {
        return $this->belongsTo(SongType::class);
    }

    public function links()
    {
        return $this->hasMany(SongLink::class);
    }
}
