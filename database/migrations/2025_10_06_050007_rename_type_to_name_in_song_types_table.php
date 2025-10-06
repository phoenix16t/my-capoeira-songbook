<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('song_types', function (Blueprint $table) {
            $table->renameColumn('type', 'name');
        });
    }

    public function down(): void
    {
        Schema::table('song_types', function (Blueprint $table) {
            $table->renameColumn('name', 'type');
        });
    }
};
