<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Debugbar;

class UpdateUserRequest extends FormRequest
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
        $id = $this->route('user')->id;
        return [
            'name' => 'required|max:191',
            'email' => "required|email|unique:App\Models\User,email,{$id},id,deleted_at,NULL",
            'cpf' => "required|cpf|unique:App\Models\User,cpf,{$id},id,deleted_at,NULL",
            'rg' => 'required',
        ];
    }
}
