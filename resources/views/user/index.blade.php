@extends('layouts.app')

@section('content')
<div id="user-datatable">
    @component('components.datatable.datatable', [
    'header' => [
    'id' => 'Id',
    'name' => 'Nome',
    'email' => 'E-mail',
    'cpf' => 'CPF',
    'admin' => 'Administrador?'
    ],

    'params' => $params,
    'total' => $total,
    'rowCount' => $rowCount,
    'records' => $users,

    'addActionColumn' => true,
    'actionColumnCaption' => 'Ações',
    'srcUrl' => route('user.index'),
    ])

    @forelse ($users as $u)
    <tr>
        <th>{{$u->id}}</th>
        <td>{{$u->name}}</td>
        <td>{{$u->email}}</td>
        <td>{{$u->getCpfFormatado()}}</td>
        <td>{{$u->admin ? 'Sim' : 'Não'}}</td>
        <td>
            <a href="{{route('user.show', [$u->id])}}" class="btn btn-primary triggerUserModal"
                up-modal="div.user-form">
                Ver
            </a>
            <a href="{{route('user.destroy', [$u->id])}}" class="btn btn-danger ml-2 delete-link">
                Excluir
            </a>
        </td>
    </tr>
    @empty
    <tr>
        <td colspan="6">Não há usuários.</td>
    </tr>
    @endforelse
    @endcomponent
</div>

{{-- BOOTSTRAP MODALS --}}

<a href="{{route('user.create')}}" class="btn btn-primary mt-3 triggerUserFormModal" up-modal="div.user-form">Novo
    Usuário</a>

<div class="modal fade" id="userShowModal" tabindex="-1" role="dialog" aria-labelledby="userShowModal"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <p class="lead">
                    <i class="fas fa-spinner fa-spin"></i> Carregando
                </p>
            </div>
        </div>
    </div>
</div>
@endsection
