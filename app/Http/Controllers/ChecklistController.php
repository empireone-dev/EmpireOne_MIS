<?php

namespace App\Http\Controllers;

use App\Models\Checklist;
use Illuminate\Http\Request;

class ChecklistController extends Controller
{
    public function index()
    {
        $checklist = Checklist::orderBy('id', 'desc')->get();
        return response()->json([
            'data' => $checklist
        ], 200);
    }

    public function store(Request $request)
    {
        Checklist::create($request->validate([
            'reqs' => 'required|unique:checklist',
            'remarks' => 'required',
        ]));
        return response()->json([
            'status' => 'success',
            'data' => $this->index()->original['data']
        ], 200);
    }
}
