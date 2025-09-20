<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
   public function up(): void
    {
        Schema::rename('lyrics', 'songs');

        Schema::table('titles', function (Blueprint $table) {
            $table->dropForeign(['lyric_id']);
            $table->renameColumn('lyric_id', 'song_id');
            $table->foreign('song_id')->references('id')->on('songs')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::rename('songs', 'lyrics');

        Schema::table('titles', function (Blueprint $table) {
            $table->dropForeign(['song_id']);
            $table->renameColumn('song_id', 'lyric_id');
            $table->foreign('lyric_id')->references('id')->on('lyrics')->onDelete('cascade');
        });
    }
};
