<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Title>
 */
class TitleFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'lyric_id' => \App\Models\Lyric::factory(),
            'title' => $this->faker->sentence(3),
        ];
    }
}
