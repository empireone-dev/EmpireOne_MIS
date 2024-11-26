<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RedirectBasedOnRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $account = $request->user();
        if ($account) {
            if ($account->role_id == 1) {
                return redirect('/admin/dashboard');
            } else if ($account->role_id == 2) {
                return redirect('/admin/dashboard');
            } else if ($account->role_id == 3) {
                return redirect('/admin/dashboard');
            } else if ($account->role_id == 4) {
                return redirect('/admin/dashboard');
            } else if ($account->role_id == 5) {
                return redirect('/admin/dashboard');
            } else if ($account->role_id == 6) {
                return redirect('/admin/dashboard');
            } else if ($account->role_id == 7) {
                return redirect('/employee/dashboard');
            }
        }
        return $next($request);
    }
}
