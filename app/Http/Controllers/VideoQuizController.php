<?php

namespace App\Http\Controllers;

use App\Models\VideoQuiz;
use Illuminate\Http\Request;

class VideoQuizController extends Controller
{
    public function index(Request $request)
    {
        $query = VideoQuiz::query();

        if ($request->filled('emp_id')) {
            $query->where('emp_id', 'LIKE', '%' . $request->emp_id . '%');
        }

        if ($request->filled('name')) {
            $query->where('name', 'LIKE', '%' . $request->name . '%');
        }

        if ($request->filled('email')) {
            $query->where('email', 'LIKE', '%' . $request->email . '%');
        }

        // Get all distinct entries
        $distinctEntries = $query
            ->select('emp_id', 'name', 'email')
            ->distinct()
            ->get();

        // Manual pagination
        $page = $request->get('page', 1);
        $perPage = $request->get('per_page', 10);
        $pagedData = $distinctEntries->forPage($page, $perPage)->values();

        return response()->json([
            'result' => [
                'data' => $pagedData,
                'total' => $distinctEntries->count(),
                'current_page' => (int) $page,
                'per_page' => (int) $perPage,
            ]
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
