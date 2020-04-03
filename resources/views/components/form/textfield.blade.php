@php
$type = $type ?? 'text'
@endphp

<div class="form-group">
    <label for="{{$name}}">{{$label ?? $name}}</label>
    <input type="{{$type}}" id="{{$name}}"
        class="form-control @if(!empty($errorMsg ?? '') || !empty($errorPartial ?? '')) is-invalid @endif"
        value="{{$value}}" name="{{$name}}"
        @if(!empty($validationUrl ?? ''))
        ic-post-to="{{$validationUrl}}"
        ic-trigger-on="input"
        ic-target="closest div"
        ic-trigger-delay="1000"
        ic-include="closest form"
        @endif
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
