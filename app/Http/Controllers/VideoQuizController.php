<?php

namespace App\Http\Controllers;

use App\Models\VideoQuiz;
use Illuminate\Http\Request;

class VideoQuizController extends Controller
{
    public function index()
    {
        $video_quiz = VideoQuiz::get();
        return response()->json([
            'result' => $video_quiz
        ], 200);
    }

    public function store(Request $request)
    {
        VideoQuiz::create($request->all());
    }
}
