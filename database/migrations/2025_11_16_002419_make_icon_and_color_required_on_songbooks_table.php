<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        \DB::table('songbooks')
            ->whereNull('icon')
            ->update(['icon' => 'Plus']);
        
        \DB::table('songbooks')
            ->whereNull('color')
            ->update(['color' => '#000000']);

        Schema::table('songbooks', function (Blueprint $table) {
            $table->string('icon')->default('Plus')->change();
            $table->string('color')->default('#000000')->change();
        });
    }

    public function down(): void
    {
        Schema::table('songbooks', function (Blueprint $table) {
            $table->string('icon')->nullable()->change();
            $table->string('color')->nullable()->change();
        });
    }
};
