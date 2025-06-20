<?php

namespace App\Http\Controllers;

use App\Models\VideoQuiz;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class VideoQuizController extends Controller
{
    public function index(Request $request)
    {
        // First, apply filters
        $filtered = VideoQuiz::query();



        // Get latest record per emp_id
        $latestPerEmp = $filtered
            ->select('video_quiz.*')
            ->whereIn('id', function ($query) use ($request) {
                $sub = DB::table('video_quiz')
                    ->selectRaw('MAX(id)')
                    ->groupBy('emp_id');


                if ($request->filled('searching')) {
                    $sub->where('name', 'LIKE', '%' . $request->searching . '%');
                    $sub->orWhere('emp_id', 'LIKE', '%' . $request->searching . '%');
                    $sub->orWhere('email', 'LIKE', '%' . $request->searching . '%');
                }


                $query->fromSub($sub, 'latest_ids');
            })
            ->orderByDesc('id');

        // Paginate result manually (since it's a collection)
        $page = $request->get('page', 1);
        $perPage = $request->get('per_page', 10);
        $all = $latestPerEmp->get();
        $pagedData = $all->forPage($page, $perPage)->values();

        return response()->json([
            'result' => [
                'data' => $pagedData,
                'total' => $all->count(),
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


    public function get_video_quiz_by_emp_id($id){


        
    }
}
