<tr>
    @foreach ($header as $key => $value)
    <td>
        @if($params['orderBy'] === $key)
        @php
        $url = urlGenerator($srcUrl, $params, ['orderAsc' => (int) !$params['orderAsc']]);
        @endphp
        <a href="{{$url}}" ic-get-from="{{$url}}" ic-target="div.datatable" ic-select-from-response="div.datatable"
            ic-push-url="true">
            {{$value}}
            @if($params['orderAsc'])
            <i class="fas fa-angle-up"></i>
            @else
            <i class="fas fa-angle-down"></i>
            @endif
        </a>
        @else
        @php
        $url = urlGenerator($srcUrl, $params, ['orderBy' => $key, 'orderAsc' => 1]);
        @endphp
        <a href="{{$url}}" ic-get-from="{{$url}}" ic-target="div.datatable" ic-select-from-response="div.datatable"
            ic-push-url="true">{{$value}}</a>
        @endif
    </td>
    @endforeach

    @if($addActionColumn)
    <td>{{$actionColumnCaption ?? ''}}</td>
    @endif
</tr>
