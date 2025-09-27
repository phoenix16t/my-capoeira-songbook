<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MakeGroupIdAndTypeIdNullableInSongsTable extends Migration
{
    public function up()
    {
        Schema::table('songs', function (Blueprint $table) {
            $table->dropForeign(['group_id']);
            $table->dropForeign(['type_id']);
        });

        Schema::table('songs', function (Blueprint $table) {
            $table->unsignedBigInteger('group_id')->nullable()->change();
            $table->unsignedBigInteger('type_id')->nullable()->change();
        });

        Schema::table('songs', function (Blueprint $table) {
            $table->foreign('group_id')->references('id')->on('groups')->onDelete('cascade');
            $table->foreign('type_id')->references('id')->on('song_types')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::table('songs', function (Blueprint $table) {
            $table->dropForeign(['group_id']);
            $table->dropForeign(['type_id']);
        });

        Schema::table('songs', function (Blueprint $table) {
            $table->unsignedBigInteger('group_id')->nullable(false)->change();
            $table->unsignedBigInteger('type_id')->nullable(false)->change();
        });

        Schema::table('songs', function (Blueprint $table) {
            $table->foreign('group_id')->references('id')->on('groups')->onDelete('cascade');
            $table->foreign('type_id')->references('id')->on('song_types')->onDelete('cascade');
        });
    }
}
