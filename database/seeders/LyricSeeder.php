<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LyricSeeder extends Seeder
{
    public function run(): void
    {
        \App\Models\Lyric::factory()
            ->count(10)
            ->hasTitles(3)
            ->create();
    }
}
