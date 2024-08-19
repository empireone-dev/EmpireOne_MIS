<?php

namespace App\Http\Controllers;

use App\Models\GuideQuestion;
use Illuminate\Http\Request;

class GuideQuestionController extends Controller
{
    public function index(){
        $guideq = GuideQuestion::get();
        return response()->json([
            'data' => $guideq
        ], 200);
    }

    public function store(Request $request)
    {
        GuideQuestion::create($request->validate([
            'guideqs' => 'required|unique:guideq',
        ]));
        return response()->json([
            'status' => 'success',
           'data'=>$this->index()->original['data']
        ], 200);
    }

    public function update(Request $request, $id){
        $guideq = GuideQuestion::find($id);
        $guideq->update($request->all());

        return response()->json([
            'data' => $this->index()->original['data']
        ], 200);
    }

    public function destroy($id)
    {
        $guideq = GuideQuestion::find($id);
        if (!$guideq) {
            return response()->json([
                'status' => 'error',
                'message' => 'Guide question not found'
            ], 404);
        }
    
        $guideq->delete();
    
        $guideq = GuideQuestion::get();
        return response()->json([
            'status' => 'success',
            'data' => $guideq
        ], 200);
    }
}
