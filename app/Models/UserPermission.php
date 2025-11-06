<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class UserPermission extends Model
{
    protected $fillable = [
        'user_id',
        'song_list_columns_number',
        'song_list_show_full_songs',
        'song_show_translation',
        'translation_type',
        'song_show_details',
        'song_show_songbooks',
        'songlist_show_songbooks'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
