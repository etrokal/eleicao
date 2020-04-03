<?php

namespace App\Services;

class DatatableService
{

    protected $query;
    protected $offset;
    protected $limit;
    protected $orderAsc;
    protected $orderBy;
    protected $filter = '';

    protected $defaultOffset = 0;
    protected $defaultLimit = 15;
    protected $defaultOrderAsc = true;

    public function __construct($queryBuilder, \Closure $filterClosure)
    {
        $this->query = $queryBuilder;
        $this->filterClosure = $filterClosure;
    }

    public function setOffset($offset)
    {
        $this->offset = $offset;
    }

    public function setLimit($limit)
    {
        $this->limit = $limit;
    }

    public function setFilter($filter)
    {
        $this->filter = $filter;
    }

    public function setOrderBy($orderBy)
    {
        $this->orderBy = preg_replace('/\W/', '', $orderBy);
    }

    public function setOrderAsc($orderAsc)
    {
        $this->orderAsc = $orderAsc;
    }

    public function getOrderAsc()
    {
        return $this->orderAsc ?? $this->defaultOrderAsc;
    }

    private function getDbOrderAsc()
    {
        return $this->getOrderAsc() ? 'asc' : 'desc';
    }

    public function getOffset()
    {
        return $this->offset ?? $this->defaultOffset;
    }

    public function getLimit()
    {
        return $this->limit ?? $this->defaultLimit;
    }

    public function getFilter()
    {
        return $this->filter;
    }

    public function getQuery()
    {
        return $this->query;
    }

    public function setQuery($query)
    {
        $this->query = $query;
    }

    public function getOrderBy()
    {
        return $this->orderBy;
    }

    public function getFilterClosure()
    {
        return $this->filterClosure;
    }

    public function getResults()
    {
        $query = $this->getQuery();
        $limit = $this->getLimit();
        $offset = $this->getOffset();
        $orderBy = $this->getOrderBy();
        $dbOrderAsc = $this->getDbOrderAsc();
        $filter = $this->getFilter();

        $result = [];

        $result['total'] = $query->count();

        $query->orderBy($orderBy, $dbOrderAsc);

        $closure = $this->getFilterClosure();
        if (!empty($closure))
            $closure($query, $filter);

        $result['rowCount'] = $query->count();

        $result['records'] = $query
            ->skip($offset)
            ->take($limit)
            ->get();

        return $result;
    }
}
