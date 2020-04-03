@component('components.form.textfield', [
'name' => 'cpf',
'label' => 'CPF',
'value' => old('cpf', $user->cpf ?? ''),
'errorMsg' => ($errors->has('cpf') ? $errors->first('cpf') : ''),
'validationUrl' => route('validate.user', ['cpf'])
])
@endcomponent
