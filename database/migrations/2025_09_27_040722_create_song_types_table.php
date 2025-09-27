<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('song_types', function (Blueprint $table) {
            $table->id();
            $table->string('type', 15);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('song_types');
    }
};
