@extends('user.form')

@section('title', 'Editar Usuário')
@section('action', route('user.update', [$user]))
