@component('components.form.textfield', [
'name' => 'rg',
'label' => 'RG',
'value' => old('rg', $user->rg ?? ''),
'errorMsg' => ($errors->has('rg') ? $errors->first('rg') : ''),
'validationUrl' => route('validate.user', ['rg']),
])
@endcomponent
