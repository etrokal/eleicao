<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index() {
        // TODO: Somente administradores podem fazer isso

        return view('user.index');
    }
}
