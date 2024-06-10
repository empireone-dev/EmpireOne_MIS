<?php

namespace App\Http\Controllers;

use App\Models\MedicineRecord;
use Illuminate\Http\Request;

class MedicineRecordController extends Controller
{
    public function index(){
        $med_rec = MedicineRecord::get();
        return response()->json([
            'data' => $med_rec
        ], 200);
    }
}
