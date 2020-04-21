<div class="datatable">
    <div class="row mb-2">
        <div class="col-md-3 col-sm-12">
            <div class=".quantity-selector">
                <div class="form-inline">
                    <label for="datatable-limit" class="mr-1">
                        Quantidade por página:
                    </label>
                    <select id="datatable-limit" name="limit" class="form-control FormTrigger" form="form-datatable"
                        id="limit">
                        @foreach([1, 15, 30, 50, 100] as $qt)
                        <option {{$params['limit'] == $qt ? 'selected' : ''}}>{{$qt}}</option>
                        @endforeach
                    </select>
                </div>
            </div>
        </div>
        <div class="offset-md-5 col-md-4 col-sm-12">
            <input id="filter" type="text" name="filter" class="form-control FormTrigger"
                placeholder="Filtrar Registros" value="{{$params['filter']}}" form="form-datatable">

        </div>
    </div>
    <table class="table">
        <thead>
            @component('components.datatable.datatable-header', [
            'header' => $header,
            'params' => $params,
            'addActionColumn' => $addActionColumn,
            'actionColumnCaption' => $actionColumnCaption,
            'srcUrl' => $srcUrl,
            ])

            @endcomponent
        </thead>
        <tbody>{{ $slot }}</tbody>
    </table>
    <div class="row mt-2">
        <div class="col-md-3 col-sm-12">
            Mostrando {{count($records) + $params['offset']}} de {{$total}}
        </div>
        <div class="offset-md-5 col-md-4 col-sm-12">
            @component('components.datatable.pagination', [
            'params' => $params,
            'total' => $rowCount,
            'srcUrl' => $srcUrl,
            ])
            @endcomponent
        </div>
    </div>
    <form action="" method="GET" id="form-datatable" up-target="table.datatable" up-autosubmit up-delay="1000">
        <input type="hidden" name="orderBy" value="{{$params['orderBy']}}">
        <input type="hidden" name="orderAsc" value="{{$params['orderAsc']}}">
        <input type="hidden" name="offset" value="{{$params['offset']}}">
    </form>
</div>
