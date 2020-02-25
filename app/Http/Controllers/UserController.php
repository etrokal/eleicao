<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserController extends Controller
{
    public function index() {
        // TODO: Somente administradores podem fazer isso

        return view('user.index');
    }

    public function store(Request $request) {
        $campos = $request->all();
        $campos['password'] = Hash::make($campos['password']);

        $user = User::create($campos);
        return response()->json($user);
    }



    // VERIFICACOES
    // Retorna TRUE se o CPF for único e FALSE se for repetido
    public function verificaCpfUnico(Request $request) {
        $cpf = $request->input('cpf');
        $id = $request->input('id');

        $cpfLimpo = preg_replace('/\D/', '', $cpf);

        if(!empty($id)) {
            $qtdUser = User::where('cpf', $cpfLimpo)
                ->where('id', '<>', $id)->count();
        } else {
            $qtdUser = User::where('cpf', $cpfLimpo)
                ->count();
        }

        $resposta = [
            'unico' => $qtdUser == 0
        ];

        return response()->json($resposta);
    }

    // Retorna TRUE se o E-mail for único e FALSE se for repetido
    public function verificaEmailUnico(Request $request) {
        $email = $request->input('email');
        $id = $request->input('id');

        if(!empty($id)) {
            $qtdUser = User::where('email', $email)
                ->where('id', '<>', $id)->count();
        } else {
            $qtdUser = User::where('email', $email)
                ->count();
        }

        $resposta = [
            'unico' => $qtdUser == 0
        ];

        return response()->json($resposta);
    }
}
