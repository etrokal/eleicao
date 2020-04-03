@if(session()->has('message'))
<div class="alert alert-primary text-center mt-3 mb-3 ml-5 mr-5" ic-remove-after="3s">
    <span>{{ session()->get('message') }}</span>
</div>
@endif

@if(session()->has('warning'))
<div class="alert alert-warning text-center mt-3 mb-3 ml-5 mr-5" ic-remove-after="3s">
    <span>{{ session()->get('warning') }}</span>
</div>
@endif

@if(session()->has('success'))
<div class="alert alert-success text-center mt-3 mb-3 ml-5 mr-5" ic-remove-after="3s">
    <span>{{ session()->get('success') }}</span>
</div>
@endif

@if(session()->has('error'))
<div class="alert alert-danger text-center mt-3 mb-3 ml-5 mr-5" ic-remove-after="3s">
    <span>{{ session()->get('error') }}</span>
</div>
@endif
