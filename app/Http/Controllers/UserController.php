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

    public function list(Request $request) {
        $offset = $request->input('offset') ? $request->input('offset') : 0;
        $limit = $request->input('limit') ? $request->input('limit') : 15;
        $orderBy = $request->input('orderBy') ? preg_replace('/\W/', '', $request->input('orderBy')) : 'id';
        $orderAsc = $request->input('orderAsc') === FALSE ? 'desc' : 'asc';
        $filter = $request->input('filter');

        $usersQuery = User::skip($offset)->take($limit);
        $usersQuery->orderBy($orderBy, $orderAsc);

        if(!empty($filter)) {
            $usersQuery
                ->where('name', 'like', '%' . $filter . '%')
                ->orWhere('email', 'like', '%' . $filter . '%')
                ->orWhere('cpf', 'like', '%' . $filter . '%');
        }

        $users = $usersQuery->get();
        $qtdTotal = User::count();

        $resultado = [
            'users' => $users,
            'qtdTotal' => $qtdTotal
        ];

        return response()->json($resultado);
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
