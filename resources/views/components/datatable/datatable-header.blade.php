<tr>
    @foreach ($header as $key => $value)
    <td>
        @if($params['orderBy'] === $key)
        @php
        $url = urlGenerator($srcUrl, $params, ['orderAsc' => (int) !$params['orderAsc']]);
        @endphp
        <a href="{{$url}}" up-dash="div.datatable">
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
        <a href="{{$url}}" up-dash="div.datatable">{{$value}}</a>
        @endif
    </td>
    @endforeach

    @if($addActionColumn)
    <td>{{$actionColumnCaption ?? ''}}</td>
    @endif
</tr>
