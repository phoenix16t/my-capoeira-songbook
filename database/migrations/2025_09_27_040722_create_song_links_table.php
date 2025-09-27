<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('song_links', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('song_id');
            $table->string('url', 2048);
            $table->string('start_time')->nullable();
            $table->string('end_time')->nullable();
            $table->timestamps();

            $table->foreign('song_id')->references('id')->on('songs')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('song_links');
    }
};
