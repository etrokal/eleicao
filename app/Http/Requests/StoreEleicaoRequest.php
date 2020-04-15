<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEleicaoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'nome' => 'required|max:191',
            'data_inicio' => 'required|dateformat:Y-m-d\TH:i',
            'data_fim' => 'required|dateformat:Y-m-d\TH:i'
        ];
    }
}
