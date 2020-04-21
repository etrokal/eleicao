@php
$pagesBeforeAndAfter = $pagesBeforeAndAfter ?? 3;
$qtdPaginas = ceil($total / $params['limit']);

$currentPage = floor($params['offset'] / $params['limit']) + 1;

$numInterations = 2 * $pagesBeforeAndAfter + 1;
@endphp

@if(!empty($total))
<nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
        @if($currentPage == 1)
        <li class="page-item">
            <span class="page-link text-secondary">Anterior</span>
        </li>
        @else
        <li class="page-item">
            <a class="page-link" href="{{getUrlFromPageNumber($srcUrl, $currentPage - 1, $params)}}"
                up-target="div.datatable">
                Anterior
            </a>
        </li>
        @endif

        @for($i = $currentPage - $pagesBeforeAndAfter; $i <= $numInterations; $i++) @php if($i < 1 || $i> $qtdPaginas)
            continue;
            @endphp
            <li class="page-item {{$currentPage === $i ? 'active' : ''}}">
                <a class="page-link" href="{{getUrlFromPageNumber($srcUrl, $i, $params)}}" up-target="div.datatable">
                    {{$i}}
                </a>
            </li>
            @endfor

            @if($currentPage == $qtdPaginas)
            <li class="page-item">
                <span class="page-link text-secondary">Próximo</span>
            </li>
            @else
            <li class="page-item">
                <a class="page-link" href="{{getUrlFromPageNumber($srcUrl, $currentPage + 1, $params)}}"
                    up-target="div.datatable">
                    Próximo
                </a>
            </li>
            @endif
    </ul>
</nav>
@endif
