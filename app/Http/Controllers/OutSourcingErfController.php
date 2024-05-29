<?php

namespace App\Http\Controllers;

use App\Models\OutSourcingErf;
use Illuminate\Http\Request;

class OutSourcingErfController extends Controller
{
   public function get_outsourcing_dashboard(){
    $active = OutSourcingErf::where('status','=','Approved')->count();
    $pending = OutSourcingErf::where('status','=','Pending')->count();
    return response()->json([
        'active' =>$active,
        'pending' =>$pending,
    ], 200);
   }

   public function index(){
    $erfrec = OutSourcingErf::with('user')->get();
    return response()->json([
        'data' => $erfrec
    ], 200);
}
}
