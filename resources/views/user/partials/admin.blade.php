@component('components.form.checkbox', [
'name' => 'admin',
'label' => 'Administrador',
'value' => '1',
'checked' => !!$user->admin
])
@endcomponent
