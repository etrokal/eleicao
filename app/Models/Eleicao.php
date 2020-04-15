<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Eleicao extends Model
{
    protected $table = "eleicao";

    protected $fillable = ['nome', 'data_inicio', 'data_fim'];

    protected $casts = [
        'created_at' => 'datetime:Y-m-d\TH:i:s',
        'updated_at' => 'datetime:Y-m-d\TH:i:s',
        'data_inicio' => 'datetime:Y-m-d\TH:i:s',
        'data_fim' => 'datetime:Y-m-d\TH:i:s',
    ];

    public function setDataInicioAttribute($value)
    {
        $valArr = explode('T', $value);
        $implodedData =  implode(' ', $valArr);
        $this->attributes['data_inicio'] = implode(' ', $valArr) . ':00';
    }

    public function setDataFimAttribute($value)
    {
        $valArr = explode('T', $value);
        $this->attributes['data_fim'] = implode(' ', $valArr) . ':00';
    }
}
