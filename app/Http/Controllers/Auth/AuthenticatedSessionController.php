<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        // if (Auth::user()->created_at !== Auth::user()->updated_at) {
        if (Auth::user()->role_id == 1) {
            return redirect()->intended(RouteServiceProvider::ADMIN_DASHBOARD);
        } else if (Auth::user()->role_id == 2) {
            return redirect()->intended(RouteServiceProvider::HR_DASHBOARD);
        } else if (Auth::user()->role_id == 3) {
            return redirect()->intended(RouteServiceProvider::IT_DASHBOARD);
        } else if (Auth::user()->role_id == 4) {
            return redirect()->intended(RouteServiceProvider::ACCOUNTING_DASHBOARD);
        } else if (Auth::user()->role_id == 5) {
            return redirect()->intended(RouteServiceProvider::MANAGER_DASHBOARD);
        } else if (Auth::user()->role_id == 6) {
            return redirect()->intended(RouteServiceProvider::ENGAGEMENT_DASHBOARD);
        } else if (Auth::user()->role_id == 7) {
            return redirect()->intended(RouteServiceProvider::EMPLOYEE_DASHBOARD);
        } else if (Auth::user()->role_id == 10) {
            return redirect()->intended(RouteServiceProvider::ERF_DASHBOARD);
        }
        // }
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
