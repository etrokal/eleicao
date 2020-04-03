@component('components.form.textfield', [
'name' => 'email',
'label' => 'E-mail',
'value' => old('email', $user->email ?? ''),
'errorMsg' => ($errors->has('email') ? $errors->first('email') : ''),
'type' => 'email',
'validationUrl' => route('validate.user', ['email']),
])
@endcomponent
