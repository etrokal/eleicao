<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Eleicao;
use App\Http\Requests\StoreEleicaoRequest;

class EleicaoController extends Controller
{
    public function index()
    {
        return view('eleicao.index');
    }

    public function list(Request $request)
    {
        $offset = $request->input('offset') ? $request->input('offset') : 0;
        $limit = $request->input('limit') ? $request->input('limit') : 15;
        $orderBy = $request->input('orderBy') ? preg_replace('/\W/', '', $request->input('orderBy')) : 'id';
        $orderAsc = $request->input('orderAsc') === 'true';
        $dbOrderAsc = (!!$orderAsc ? 'asc' : 'desc');
        $filter = $request->input('filter');

        $query = Eleicao::query();
        $query->orderBy($orderBy, $dbOrderAsc);

        if (!empty($filter)) {
            // Verifica se é data
            $dataArr = explode('/', $filter);
            if (count($dataArr) === 3) {
                $query
                    ->where('data_inicio', '<=', $dataArr[2] . '-' . $dataArr[1] . '-' . $dataArr[0])
                    ->orWhere('data_fim', '>=', $dataArr[2] . '-' . $dataArr[1] . '-' . $dataArr[0]);
            } else {
                $query
                    ->where('nome', 'like', '%' . $filter . '%');
            }
        }


        $totalResults = $query->count();

        $query->skip($offset)->take($limit);
        $eleicoes = $query->get();

        $qtdTotal = Eleicao::count();

        $resultado = [
            'records' => $eleicoes,
            'totalNumRecords' => $qtdTotal,
            'totalResults' => $totalResults
        ];

        return response()->json($resultado);
    }

    public function store(StoreEleicaoRequest $request)
    {
        $eleicao = Eleicao::create($request->all());
        return response()->json($eleicao);
    }
}
