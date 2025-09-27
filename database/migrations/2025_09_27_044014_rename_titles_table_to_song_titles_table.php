<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RenameTitlesTableToSongTitlesTable extends Migration
{
    public function up()
    {
        Schema::rename('titles', 'song_titles');
    }

    public function down()
    {
        Schema::rename('song_titles', 'titles');
    }
};
