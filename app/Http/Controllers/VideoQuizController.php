<?php

namespace App\Http\Controllers;

use App\Models\VideoQuiz;
use Illuminate\Http\Request;

class VideoQuizController extends Controller
{
    public function index(Request $request)
    {
        $query = VideoQuiz::query();

        if ($request->has('emp_id') && $request->emp_id !== 'null') {
            $query->where('emp_id', 'LIKE', '%' . $request->emp_id . '%');
        }

        if ($request->has('name') && $request->name !== 'null') {
            $query->whereHas('video_quiz', function ($q) use ($request) {
                $q->where('name', 'LIKE', '%' . $request->name . '%');
            });
        }

        if ($request->has('email') && $request->email !== 'null') {
            $query->whereHas('video_quiz', function ($q) use ($request) {
                $q->where('email', 'LIKE', '%' . $request->email . '%');
            });
        }

        $video_quiz = $query->paginate(10);

        return response()->json([
            'result' => $video_quiz
        ], 200);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'emp_id' => [
                'required',
                'numeric',
                // Custom validation logic:
                function ($attribute, $value, $fail) use ($request) {
                    $exists = VideoQuiz::where('emp_id', $value)
                        ->where('name', $request->name)
                        ->where('type', $request->type)
                        ->exists();

                    if ($exists) {
                        $fail("duplicate");
                    }
                }
            ],
            'email' => 'required|email|max:255',
            'type' => 'required|string|max:255',
        ]);

        VideoQuiz::create($validated);

        return response()->json(['message' => 'Saved successfully'], 200);
    }
}
