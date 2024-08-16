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

    public function store(Request $request)
    {
        MedicineRecord::create($request->validate([
            'medicine' => 'required|unique:medicine_records',
        ]));
        return response()->json([
            'status' => 'success',
           'data'=>$this->index()->original['data']
        ], 200);
    }
}
