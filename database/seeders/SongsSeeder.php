<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\DB;

class SongsSeeder extends Seeder
{
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('songs')->truncate();
        DB::table('song_titles')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $jsonFile = database_path('seeders/songs.json');
        $songsData = json_decode(File::get($jsonFile), true);

        foreach ($songsData as $songData) {
            $lyricsString = is_array($songData['lyrics']) ? implode("\n", $songData['lyrics']) : $songData['lyrics'];
            $translationString = is_array($songData['translation']) ? implode("\n", $songData['translation']) : $songData['translation'];

            $songId = DB::table('songs')->insertGetId([
                'translation' => $translationString,
                'lyrics' => $lyricsString,
                'group_id' => $songData['group'],
                'beat' => $songData['beat'],
                'type_id' => $songData['type'],
                'created_at' => now(),
                'updated_at' => now(),
                'author' => ''
            ]);

            foreach ($songData['titles'] as $title) {
                DB::table('song_titles')->insert([
                    'song_id' => $songId,
                    'title' => $title,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            foreach ($songData['links'] as $link) {
                DB::table('song_links')->insert([
                    'song_id' => $songId,
                    'url' => $link['url'],
                    'start_time' => $link['start_time'] ?? null,
                    'end_time' => $link['end_time'] ?? null,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
