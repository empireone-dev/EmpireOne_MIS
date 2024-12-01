<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    public function index()
    {
        $department = Department::with(['user'])->get();
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
        $department = Department::where('id', $id)->with(['user'])->first();
        return response()->json([
            'result' => $department
        ], 200);
    }

    public function destroy($id)
    {
        $department = Department::where('id', $id)->first();
        $department->delete();
        return response()->json([
            'result' => $department
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $department = Department::where('id',$id)->first();

        if (!$department) {
            return response()->json([
                'message' => 'Department not found.',
            ], 404);
        }

        $department->update($request->all());

        return response()->json([
            'data' => Department::with('user')->get()
        ], 200);
    }
}
