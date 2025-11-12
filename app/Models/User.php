<?php

namespace App\Models;

use App\Models\Songbook;
use App\Models\UserSetting;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'google_id',
        'email_verified_at'
    ];

    protected $hidden = [
        'password',
        'remember_token'
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function songbooks()
    {
        return $this->hasMany(Songbook::class);
    }

    public function settings()
    {
        return $this->hasOne(UserSetting::class);
    }
}
