<?php

namespace App\Http\Controllers;

use App\Models\IncidentReport;
use Illuminate\Http\Request;

class IncidentReportController extends Controller
{
    public function store(Request $request)
    {
        IncidentReport::create($request->all());
        return response()->json([
            'data' => 'success'
        ], 200);
    }
}
