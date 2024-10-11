<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    public function index()
    {
        $department = Department::get();
        return response()->json([
            'result' => $department
        ], 200);
    }
    public function store(Request $request)
    {
        Department::create($request->all());
    }
    public function show($id)
    {
        $department = Department::where('id', $id)->first();
        return response()->json([
            'result' => $department
        ], 200);
    }
}
