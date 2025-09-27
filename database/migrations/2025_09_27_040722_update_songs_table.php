<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('songs', function (Blueprint $table) {
            $table->text('translation')->nullable();
            $table->unsignedBigInteger('group_id');
            $table->char('count', 1)->nullable();
            $table->unsignedBigInteger('type_id');

            $table->foreign('group_id')->references('id')->on('groups')->onDelete('cascade');
            $table->foreign('type_id')->references('id')->on('song_types')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::table('songs', function (Blueprint $table) {
            $table->dropForeign(['group_id']);
            $table->dropForeign(['type_id']);
            $table->dropColumn(['translation', 'group_id', 'count', 'type_id']);
        });
    }
};
