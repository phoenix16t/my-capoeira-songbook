<?php

namespace Database\Seeders;

use App\Models\SongType;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class TypesSeederPostgres extends Seeder
{
    public function run()
    {
        DB::table('song_types')->truncate(); 

        $jsonPath = database_path('seeders/data/types.json');
        $jsonData = json_decode(File::get($jsonPath), true);

        foreach ($jsonData as $type) {
            SongType::create([
                'name' => $type['name'],
            ]);
        }
    }
}
