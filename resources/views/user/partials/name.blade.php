@component('components.form.textfield', [
'name' => 'name',
'label' => 'Nome',
'value' => old('name', $user->name ?? ''),
'errorMsg' => ($errors->has('name') ? $errors->first('name') : ''),
'validationUrl' => route('validate.user', ['name']),
])
@endcomponent
