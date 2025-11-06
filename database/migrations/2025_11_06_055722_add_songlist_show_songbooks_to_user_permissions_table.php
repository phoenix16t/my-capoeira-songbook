<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('user_permissions', function (Blueprint $table) {
            $table->boolean('songlist_show_songbooks')->default(false);
        });
    }

    public function down()
    {
        Schema::table('user_permissions', function (Blueprint $table) {
            $table->dropColumn('songlist_show_songbooks');
        });
    }
};
