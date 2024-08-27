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
        MedicineRecord::create($request->all());
        return response()->json([
            'status' => 'success',
           'data'=>$this->index()->original['data']
        ], 200);
    }

    public function update(Request $request, $id){
        $med_rec = MedicineRecord::find($id);
        $med_rec->update($request->all());

        return response()->json([
            'data' => $this->index()->original['data']
        ], 200);
    }

    public function destroy($id)
    {
        $med_rec = MedicineRecord::find($id);
        if (!$med_rec) {
            return response()->json([
                'status' => 'error',
                'message' => 'Medicine not found'
            ], 404);
        }
    
        $med_rec->delete();
    
        $med_rec = MedicineRecord::get();
        return response()->json([
            'status' => 'success',
            'data' => $med_rec
        ], 200);
    }
}
