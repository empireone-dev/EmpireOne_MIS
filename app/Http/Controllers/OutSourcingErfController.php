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
}
