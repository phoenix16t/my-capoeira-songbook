<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('user_permissions', function (Blueprint $table) {
            $table->string('translation_type')->default('inline')->after('song_show_translation');
        });
    }

    public function down()
    {
        Schema::table('user_permissions', function (Blueprint $table) {
            $table->dropColumn('translation_type');
        });
    }
};
