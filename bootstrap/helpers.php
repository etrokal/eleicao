<?php

function urlGenerator($baseUrl = '/', $queryParams = [], $mergeParams = [])
{
    $url = $baseUrl;
    $params = array_merge($queryParams, $mergeParams);

    if (!empty($params)) {
        $url .= '?';
    }

    foreach ($params as $key => $value) {
        $url .= "{$key}=" . urlencode($value) . '&';
    }

    if ($url[-1] == '&') {
        $url = substr($url, 0, strlen($url) - 1);
    }

    return $url;
}

function getUrlFromPageNumber($srcUrl, $pageNumber, $params) {
    $newOffset = ($pageNumber - 1) * $params['limit'];
    return urlGenerator($srcUrl, $params, ['offset' => $newOffset]);
}
