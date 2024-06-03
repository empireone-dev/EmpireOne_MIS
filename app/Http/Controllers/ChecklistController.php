<?php

namespace App\Http\Controllers;

use App\Models\Checklist;
use Illuminate\Http\Request;

class ChecklistController extends Controller
{
    public function index(){
        $checklist = Checklist::get();
        return response()->json([
            'data' => $checklist
        ], 200);
    }
}
