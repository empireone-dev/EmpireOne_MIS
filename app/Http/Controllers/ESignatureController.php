<?php

namespace App\Http\Controllers;

use App\Models\ESignature;
use Illuminate\Http\Request;

class ESignatureController extends Controller
{
    public function get_e_signature_by_app_id(Request $request, $app_id)
    {
        $res = ESignature::where('app_id', $app_id)->get();
        if ($res->isEmpty()) {
            return response()->json([
                'message' => 'E Signature not found'
            ], 404);
        }

        return response()->json([
            'data' => $res
        ], 200);
    }
}
