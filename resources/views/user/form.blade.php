@extends('layouts.app')

@section('content')
<div class="user-form">
    <h2 class="modal-title">@yield('title')</h2>
    <form action="@yield('action')" method="POST" class="userForm" up-target="div.datatable">
        @csrf
        @if($user->id)
        @method('PUT')
        <input type="hidden" value="{{$user->id}}" name="id">
        @endif

        @include('user.partials.name')
        @include('user.partials.email')
        @include('user.partials.cpf')
        @include('user.partials.rg')

        @if(!$user->id)
        @include('user.partials.password')
        @endif

        @include('user.partials.admin')

        <div class="form-group mt-3">
            <a href="{{route('user.index')}}" class="btn btn-secondary" up-close up-dash="div.datatable">
                Cancelar
            </a>

            <button type="submit" class="btn btn-primary">
                Salvar
            </button>
        </div>
    </form>
</div>
@endsection
