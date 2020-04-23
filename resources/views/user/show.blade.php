@extends('layouts.app')

@section('content')
<div class="user-data">
    <div class="modal-header">
        <h5 class="modal-title">Dados do Usuário</h5>
    </div>

    <div class="modal-body">
        <dl class="row">
            <dt class="col-sm-3">Id</dt>
            <dd class="col-sm-9">{{$user->id}}</dd>
        </dl>

        <dl class="row">
            <dt class="col-sm-3">Nome</dt>
            <dd class="col-sm-9">{{$user->name}}</dd>
        </dl>

        <dl class="row">
            <dt class="col-sm-3">E-mail</dt>
            <dd class="col-sm-9">{{$user->email}}</dd>
        </dl>

        <dl class="row">
            <dt class="col-sm-3">CPF</dt>
            <dd class="col-sm-9">
                {{$user->getCpfFormatado()}}
            </dd>
        </dl>

        <dl class="row">
            <dt class="col-sm-3">RG</dt>
            <dd class="col-sm-9">{{$user->rg}}</dd>
        </dl>

        <dl class="row">
            <dt class="col-sm-3">É Admin?</dt>
            <dd class="col-sm-9">
                {{$user->admin ? "Sim" : "Não"}}
            </dd>
        </dl>

        <dl class="row">
            <dt class="col-sm-3">Criado em</dt>
            <dd class="col-sm-9">
                {{$user->created_at->format('d/m/Y h:i')}}
            </dd>
        </dl>

        <dl class="row">
            <dt class="col-sm-3">Editado em</dt>
            <dd class="col-sm-9">
                {{$user->updated_at->format('d/m/Y h:i')}}
            </dd>
        </dl>
    </div>

    <div class="modal-footer">
        <a href="{{route('user.edit', [$user])}}" class="btn btn-primary" up-modal="div.user-form">
            Editar
        </a>
        <a href="{{route('user.password.form', [$user])}}" class="btn btn-secondary" up-dash="div.user-password-form">
            Alterar Senha
        </a>
        <a href="{{route('user.index')}}" class="btn btn-secondary" up-close>
            Fechar
        </a>
    </div>

</div>
@endsection
