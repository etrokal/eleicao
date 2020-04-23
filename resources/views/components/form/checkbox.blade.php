<div class="form-check" up-fieldset>
    <input class="form-check-input @if(!empty($errorMsg ?? '') || !empty($errorPartial ?? '')) is-invalid @endif"
        type="checkbox" value="{{$value}}" {{$checked ? 'checked': ''}} id="{{$name}}" name="{{$name}}" up-validate >
    <label class="form-check-label" for="{{$name}}">
        {{$label ?? $name}}
    </label>
    @if(!empty($errorMsg ?? ''))
    <small class="text-danger">{{$errorMsg}}</small>
    @else
    @if(!empty($errorPartial ?? ''))
    {{$errorPartial}}
    @endif
    @endif
</div>
