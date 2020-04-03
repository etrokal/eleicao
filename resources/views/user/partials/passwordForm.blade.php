<div ic-post-to="{{route('validate.user.password')}}" ic-trigger-delay="1000" ic-trigger-on="input" ic-target="this">
    @component('components.form.textfield', [
    'name' => 'password',
    'label' => 'Senha',
    'value' => old('password', $user->password ?? ''),
    'errorMsg' => ($errors->has('password') ? $errors->first('password') : ''),
    'type' => 'password',
    ])
    @endcomponent

    @component('components.form.textfield', [
    'name' => 'password_confirmation',
    'label' => 'Confirmar a senha',
    'value' => old('password_confirmation', $user->password_confirmation ?? ''),
    'errorMsg' => ($errors->has('password') ? $errors->first('password') : ''),
    'type' => 'password',
    ])
    @endcomponent
</div>
