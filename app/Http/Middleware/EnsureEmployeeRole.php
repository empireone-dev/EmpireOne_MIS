<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureEmployeeRole
{
    /**
     * Block non-employee roles from accessing employee routes.
     * Only role_id == 7 (employee) may access /employee/* routes.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if ($user && ($user->role_id != 7 && $user->role_id != 10)) {
            return redirect('/admin/dashboard');
        }

        return $next($request);
    }
}
