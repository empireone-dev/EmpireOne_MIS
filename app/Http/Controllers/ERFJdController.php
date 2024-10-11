<?php

namespace App\Http\Controllers;

use App\Models\ERFJd;
use Illuminate\Http\Request;

class ERFJdController extends Controller
{
  public function update(Request $request, $id)
  {
    $res = ERFJd::where('ref_id', $id)->first();
    $res->update([
      'content' => $request->form['jd']
    ]);
    return response()->json([
      'data' => 'success'
    ], 200);
  }
}
