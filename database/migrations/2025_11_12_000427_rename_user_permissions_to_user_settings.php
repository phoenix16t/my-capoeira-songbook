<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::rename('user_permissions', 'user_settings');

        Schema::table('user_settings', function (Blueprint $table) {
            $table->renameColumn('created_at', 'old_created_at');
            $table->renameColumn('updated_at', 'old_updated_at');
        });

        Schema::table('user_settings', function (Blueprint $table) {
            $table->timestamp('created_at')->nullable()->after('songlist_show_songbooks');
            $table->timestamp('updated_at')->nullable()->after('created_at');
        });

        DB::statement('UPDATE user_settings SET created_at = old_created_at, updated_at = old_updated_at');

        Schema::table('user_settings', function (Blueprint $table) {
            $table->dropColumn(['old_created_at', 'old_updated_at']);
        });
    }

    public function down()
    {
        Schema::rename('user_settings', 'user_permissions');

        Schema::table('user_permissions', function (Blueprint $table) {
            $table->renameColumn('created_at', 'new_created_at');
            $table->renameColumn('updated_at', 'new_updated_at');
        });

        Schema::table('user_permissions', function (Blueprint $table) {
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
        });

        DB::statement('UPDATE user_permissions SET created_at = new_created_at, updated_at = new_updated_at');

        Schema::table('user_permissions', function (Blueprint $table) {
            $table->dropColumn(['new_created_at', 'new_updated_at']);
        });
    }
};
