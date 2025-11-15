<?php

namespace App\Policies;

use App\Models\Songbook;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class SongbookPolicy
{
    public function viewAny(User $user)
    {
        return true;
    }

    public function view(User $user, Songbook $songbook)
    {
        return $songbook->user_id === $user->id;
    }

    public function update(User $user, Songbook $songbook)
    {
        return $songbook->user_id === $user->id;
    }

    public function delete(User $user, Songbook $songbook)
    {
        return $songbook->user_id === $user->id;
    }

    public function create(User $user)
    {
        return true;
    }
}
