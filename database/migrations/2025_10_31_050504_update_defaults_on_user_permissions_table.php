<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   public function up()
    {
        Schema::table('user_permissions', function (Blueprint $table) {
            $table->boolean('song_show_details')->default(true)->change();
            $table->boolean('song_show_songbooks')->default(true)->change();
        });
    }

    public function down()
    {
        Schema::table('user_permissions', function (Blueprint $table) {
            $table->boolean('song_show_details')->default(false)->change();
            $table->boolean('song_show_songbooks')->default(false)->change();
        });
    }
};
