<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureAdminRole
{
    /**
     * Block employee role (role_id == 7) and sourcing role (role_id == 10) from accessing admin routes.
     * Redirect them to their own dashboard.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if ($user && ($user->role_id == 7)) {
            return redirect('/employee/dashboard');
        }

        if ($user && ($user->role_id == 10)) {
            return redirect('/employee/erf_record');
        }

        return $next($request);
    }
}
