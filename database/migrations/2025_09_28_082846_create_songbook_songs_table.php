<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('songbook_songs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('songbook_id')->constrained()->onDelete('cascade');
            $table->foreignId('song_id')->constrained()->onDelete('cascade');
            $table->timestamps();

            $table->unique(['songbook_id', 'song_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('songbook_songs');
    }
};
