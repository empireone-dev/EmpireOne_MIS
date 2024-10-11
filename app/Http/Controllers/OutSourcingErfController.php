<?php

namespace App\Http\Controllers;

use App\Models\OutSourcingErf;
use Illuminate\Http\Request;

class OutSourcingErfController extends Controller
{
    public function index()
    {
        $erfrec = OutSourcingErf::with('user')->get();
        return response()->json([
            'data' => $erfrec
        ], 200);
    }
    public function store(Request $request){
        
        return response()->json([
            'data' => $request->all()
        ], 200);
    }
}
