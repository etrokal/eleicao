<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/usuario', 'UserController@index')->name('user.index');
Route::post('/usuario', 'UserController@store');
Route::get('/usuario/list', 'UserController@list');
Route::put('/usuario/{user}', 'UserController@update');
Route::delete('/usuario/{user}', 'UserController@destroy');
Route::put('/usuario/password/{user}', 'UserController@password');

Route::get('/verificacoes/usuario/email', 'UserController@verificaEmailUnico');
Route::get('/verificacoes/usuario/cpf', 'UserController@verificaCpfUnico');

Route::get('/eleicao', 'EleicaoController@index')->name('eleicao.index');
Route::get('/eleicao/list', 'EleicaoController@list');
Route::post('/eleicao', 'EleicaoController@store');



