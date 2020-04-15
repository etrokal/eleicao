<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeys extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('candidato', function (Blueprint $table) {
            $table->unsignedBigInteger('eleicao_id');
            $table->foreign('eleicao_id')->references('id')->on('eleicao');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('candidato', function (Blueprint $table) {
            $table->dropForeign(['eleicao_id']);
            $table->dropColumn(['eleicao_id']);
        });
    }
}
