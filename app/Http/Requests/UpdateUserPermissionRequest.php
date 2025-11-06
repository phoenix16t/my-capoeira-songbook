<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserPermissionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'song_list_columns_number' => 'integer|min:1|max:10',
            'song_list_show_full_songs' => 'boolean',
            'song_show_translation' => 'boolean',
            'translation_type' => 'string|in:inline,side',
            'song_show_details' => 'boolean',
            'song_show_songbooks' => 'boolean',
            'songlist_show_songbooks' => 'boolean',
        ];
    }
}
