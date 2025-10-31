<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_permissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->integer('song_list_columns_number')->default(1);
            $table->boolean('song_list_show_full_songs')->default(false);
            $table->boolean('song_show_translation')->default(false);
            $table->boolean('song_show_details')->default(false);
            $table->boolean('song_show_songbooks')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_permissions');
    }
};
