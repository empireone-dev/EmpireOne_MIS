<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Http\Request;

class AccountController extends Controller
{
    public function index()
    {
        $department = Account::get();
        return response()->json([
            'result' => $department
        ], 200);
    }
}
