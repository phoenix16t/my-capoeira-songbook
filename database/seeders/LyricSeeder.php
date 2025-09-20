<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SongSeeder extends Seeder
{
    public function run(): void
    {
        \App\Models\Song::factory()
            ->count(10)
            ->hasTitles(3)
            ->create();
    }
}
