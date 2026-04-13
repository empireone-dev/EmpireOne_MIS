<?php

namespace App\Http\Controllers;

use App\Models\VideoQuiz;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class VideoQuizController extends Controller
{
    public function index(Request $request)
    {
        $query = VideoQuiz::with('employees')
            ->whereIn('id', function ($sub) {
                $sub->from('video_quiz')
                    ->selectRaw('MAX(id)')
                    ->groupBy('emp_id');
            });

        // Apply search AFTER getting latest records
        if ($request->filled('searching')) {
            $search = $request->searching;

            $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('emp_id', 'LIKE', "%{$search}%")
                    ->orWhere('email', 'LIKE', "%{$search}%");
            });
        }

        // Use Laravel pagination
        $perPage = $request->get('per_page', 10);

        $result = $query->orderByDesc('id')->paginate($perPage);

        return response()->json([
            'result' => $result
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


    public function get_video_quiz_by_emp_id($emp_id)
    {
        $video_quiz = VideoQuiz::where('emp_id', $emp_id)->get();
        return response()->json($video_quiz, 200);
    }

    public function destroy($id)
    {
        $video_quiz = VideoQuiz::where('id', $id)->first();
        if ($video_quiz) {
            $video_quiz->delete();
        }

        return response()->json(['message' => 'Video quiz deleted successfully']);
    }
}
