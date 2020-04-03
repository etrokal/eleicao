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
Route::get('/usuario/create', 'UserController@create')->name('user.create');
Route::post('/usuario', 'UserController@store')->name('user.store');
Route::get('/usuario/{user}/edit', 'UserController@edit')->name('user.edit');
Route::put('/usuario/{user}', 'UserController@update')->name('user.update');
Route::get('/usuario/{user}', 'UserController@show')->name('user.show');
Route::delete('/usuario/{user}', 'UserController@destroy')->name('user.destroy');
Route::post('/validate/user/{attribute}', 'UserController@validateAjax')->name('validate.user');

Route::get('/usuario/{user}/password', 'UserController@passwordForm')->name('user.password.form');
Route::post('/usuario/{user}/password', 'UserController@password')->name('user.password.save');
Route::post('/validate/user/password/change', 'UserController@validatePasswordAjax')->name('validate.user.password');




Route::get('/verificacoes/usuario/email', 'UserController@verificaEmailUnico');
Route::get('/verificacoes/usuario/cpf', 'UserController@verificaCpfUnico');
