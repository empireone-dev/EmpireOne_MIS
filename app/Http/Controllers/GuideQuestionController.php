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
}
