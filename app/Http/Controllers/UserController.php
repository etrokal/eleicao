<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use App\Models\User;
use App\Http\Requests\StoreUser;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Requests\AlterPasswordUserRequest;
use App\Services\DatatableService;
use Illuminate\Support\Facades\Validator;



use Debugbar;
use Symfony\Component\HttpKernel\HttpCache\Store;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $offset = $request->input('offset') ? $request->input('offset') : 0;
        $limit = $request->input('limit') ? $request->input('limit') : 15;
        $orderBy = $request->input('orderBy') ? preg_replace('/\W/', '', $request->input('orderBy')) : 'id';
        $orderAsc = $request->input('orderAsc') === null ? true : !!$request->input('orderAsc');
        $filter = $request->input('filter');

        $usersQuery = User::query();

        $service = new DatatableService($usersQuery, function ($query, $filter) {
            $query
                ->where('name', 'like', '%' . $filter . '%')
                ->orWhere('email', 'like', '%' . $filter . '%')
                ->orWhere('cpf', 'like', '%' . $filter . '%');
        });

        $service->setFilter($filter);
        $service->setOrderAsc($orderAsc);
        $service->setOrderBy($orderBy);
        $service->setLimit($limit);
        $service->setOffset($offset);

        $result = $service->getResults();

        $params = compact(
            'offset',
            'limit',
            'orderBy',
            'orderAsc',
            'filter'
        );

        return view(
            'user.index',
            [
                'users' => $result['records'],
                'total' => $result['total'],
                'rowCount' => $result['rowCount'],
                'params' => $params
            ]
        );
    }

    public function create()
    {
        return view('user.create')->with('user', new User());
    }

    public function store(Request $request)
    {
        $validator = $this->getValidator($request->all());

        if ($validator->fails()) {
            $user = new User($request->all());
            return response()->view('user.create', [
                'errors' => $validator->errors(),
                'user' => $user
            ], 400);
        } else {
            $campos = $validator->valid();
            $campos['password'] = Hash::make($campos['password']);
            $user = User::create($campos);
            return redirect()->route('user.index')->with('success', 'Usuário criado com sucesso.');
        }
    }

    public function show(User $user)
    {
        return view('user.show')->with('user', $user);
    }

    public function edit(User $user)
    {
        return view('user.edit')->with('user', $user);
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->all();

        unset($data['password']);
        $user->fill($data);
        $user->save();

        return redirect()->route('user.index');
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('user.index');
    }

    public function passwordForm(User $user)
    {
        $user->password = '';
        return view('user.passwordForm')->with('user', $user);
    }

    public function password(AlterPasswordUserRequest $request, User $user)
    {
        $password = Hash::make($request->input('password'));
        $user->password = $password;
        $user->save();
    }

    public function validatePasswordAjax(Request $request, $attribute = null)
    {
        $data = $request->all();

        $rules = (new AlterPasswordUserRequest())->rules();

        $validator = Validator::make($data, $rules);
        $user = new \stdClass();
        foreach ($data as $k => $v)
            $user->$k = $v;

        $errors = $validator->errors();

        if ($validator->fails()) {
            if ($errors->has($attribute)) {
                return response()->view('user.partials.passwordForm', ['user' => $user, 'errors' => $errors])->header('X-IC-Trigger', 'disableSubmit');;
            } else {
                return response()->view('user.partials.passwordForm', ['user' => $user])->header('X-IC-Trigger', 'disableSubmit');;
            }
        } else {
            return response()
                ->view('user.partials.passwordForm', ['user' => $user])
                ->header('X-IC-Trigger', 'enableSubmit');
        }
    }

    public function validateAjax(Request $request, $attribute = null)
    {
        $data = $request->all();

        if (isset($data['cpf'])) {
            $data['cpf'] = preg_replace('/\D+/', '', $data['cpf']);
        }

        if ($request->input('id')) {
            $rules = (new UpdateUserRequest())->rules();
        } else {
            $rules = (new StoreUser())->rules();
        }

        $validator = Validator::make($data, $rules);
        $user = new \stdClass();
        foreach ($data as $k => $v)
            $user->$k = $v;

        $errors = $validator->errors();

        if ($validator->fails()) {
            if ($errors->has($attribute)) {
                return response()->view('user.partials.' . $attribute, ['user' => $user, 'errors' => $errors])->header('X-IC-Trigger', 'disableSubmit');;
            } else {
                return response()->view('user.partials.' . $attribute, ['user' => $user])->header('X-IC-Trigger', 'disableSubmit');;
            }
        } else {
            return response()
                ->view('user.partials.' . $attribute, ['user' => $user])
                ->header('X-IC-Trigger', 'enableSubmit');
        }
    }

    protected function getValidator($data)
    {

        $data['cpf'] = isset($data['cpf']) ? preg_replace("/[^0-9]/", "", $data['cpf']) : null;
        $id = isset($data['id']) ? $data['id'] : 'null';

        return Validator::make($data, [
            'name' => 'required|max:191',
            'email' => "required|email|unique:App\Models\User,email,{$id},id,deleted_at,NULL",
            'cpf' => "required|cpf|unique:App\Models\User,cpf,{$id},id,deleted_at,NULL",
            'rg' => 'required',
        ], []);
    }
}
