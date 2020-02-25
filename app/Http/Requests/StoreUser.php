<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUser extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|max:191',
            'email' => 'required|email|unique:App\Models\User,email,NULL,id,deleted_at,NULL',
            'cpf' => 'required|cpf|unique:App\Models\User,cpf,NULL,id,deleted_at,NULL',
            'rg' => 'required',
            'checkbox' => 'in:0,1',
            'password' => 'required|min:6|max:64|confirmed',
        ];
    }
}
