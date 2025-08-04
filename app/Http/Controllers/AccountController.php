<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Http\Request;

class AccountController extends Controller
{
    public function index()
    {
        $account = Account::orderBy('id', 'desc')->get();
        return response()->json([
            'result' => $account
        ], 200);
    }

    public function store(Request $request)
    {
        Account::create([
            'acc' => $request->acc,
            'site' => $request->site,
        ]);
    }

    public function update(Request $request, $id)
    {
        $account = Account::where('id', $id)->first();

        if (!$account) {
            return response()->json([
                'message' => 'Account not found.',
            ], 404);
        }

        $account->update($request->all());

        return response()->json([
            'data' => Account::with('user')->get()
        ], 200);
    }

    public function destroy($id)
    {
        if (!Account::where('id', $id)->exists()) {
            return response()->json([
                'message' => 'Account not found.',
            ], 404);
        }

        $account = Account::where('id', $id)->first();
        $account->delete();
        return response()->json([
            'result' => $account
        ], 200);
    }
}
