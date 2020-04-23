@php
$type = $type ?? 'text'
@endphp

<div class="form-group" up-fieldset>
    <label for="{{$name}}">{{$label ?? $name}}</label>
    <input type="{{$type}}" id="{{$name}}"
        class="form-control @if(!empty($errorMsg ?? '') || !empty($errorPartial ?? '')) is-invalid @endif"
        value="{{$value}}" name="{{$name}}" up-validate
    >
    @if(!empty($errorMsg ?? ''))
    <small class="text-danger">{{$errorMsg}}</small>
    @else
    @if(!empty($errorPartial ?? ''))
    {{$errorPartial}}
    @endif
    @endif
</div>
{{$slot}}
