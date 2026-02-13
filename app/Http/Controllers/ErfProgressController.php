<?php

namespace App\Http\Controllers;

use App\Models\ErfProgress;
use Illuminate\Http\Request;

class ErfProgressController extends Controller
{
    public function index()
    {
        $erfProgress = ErfProgress::all();
        return view('erf_progress.index', compact('erfProgress'));
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'ref_id' => 'required|integer',
            'status' => 'nullable|string',
            'remarks' => 'nullable|string',
            'approved_by' => 'nullable|string',
            'date_time' => 'nullable|string',
        ]);

        ErfProgress::create($validatedData);

        return redirect()->back()->with('success', 'ERF progress updated successfully.');
    }
}
