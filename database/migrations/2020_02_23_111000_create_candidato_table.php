<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCandidatoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('candidato', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->string('nome');
            $table->string('nome_fantasia');
            $table->string('numero');
            $table->binary('foto')->nullable();
            $table->string('mime_foto')->nullable();

            $table->timestampsTz();
            $table->softDeletesTz();

            $table->unique(['nome_fantasia', 'deleted_at']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('candidato');
    }
}
