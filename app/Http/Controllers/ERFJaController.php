<?php

namespace App\Http\Controllers;

use App\Models\ERFJa;
use Illuminate\Http\Request;

class ERFJaController extends Controller
{
    public function update(Request $request,$id){
        $res = ERFJa::where('ref_id',$id)->first();
        $res->update([
            'content'=>$request->form['ja']
        ]);
        return response()->json([
            'data' => 'success'
        ], 200);
    }
}
