<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEleitorTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('eleitor', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->unsignedBigInteger('eleicao_id');
            $table->unsignedBigInteger('user_id')->comment('Eleitor');
            $table->unsignedBigInteger('cadastrado_por')->comment('Usuário que cadastrou o eleitor');

            $table->softDeletesTz();
            $table->timestampsTz();

            $table->foreign('user_id')->references('id')->on('users');
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
        Schema::dropIfExists('eleitor');
    }
}
