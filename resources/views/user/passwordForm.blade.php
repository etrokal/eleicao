@extends('layouts.app')

@section('content')
<div class="user-password-form">
    <div class="modal-header">
        <h5 class="modal-title">Alterar senha do usuário</h5>
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

        {{-- <div ic-post-to={{route('user.password.save', [$user])}} ic-target="find form"
        ic-select-from-response="form"
        ic-trigger-on="submit"> --}}
        <form action="{{route('user.password.save', [$user])}}" method="POST" class="passwordForm">
            @csrf

            <input type="hidden" value="{{$user->id}}" name="id">

            @include('user.partials.passwordForm')

            <div class="form-group mt-3">
                <a href="{{route('user.index')}}" class="btn btn-secondary" data-dismiss="modal">
                    Cancelar
                </a>

                <input type="submit" class="btn btn-primary" name="submit" value="Salvar">
            </div>
        </form>
        {{-- </div> --}}
    </div>
</div>
@endsection
