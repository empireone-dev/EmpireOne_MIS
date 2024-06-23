<?php

namespace App\Http\Controllers;

use App\Models\UploadMemo;
use Illuminate\Http\Request;

class UploadMemoController extends Controller
{
    public function index(){
        $upload_memo = UploadMemo::get();
        return response()->json([
            'data' => $upload_memo
        ], 200);
    }
}
