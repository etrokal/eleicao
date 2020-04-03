<?php

namespace App\Http\Middleware;

use Closure;

class XLocationMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $response = $next($request);
        $response->header('X-IC-SetLocation', url()->current());

        return $response;
    }
}
