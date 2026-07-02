<?php

namespace App\Http\Controllers;

use App\Models\ResourceHubItem;
use Illuminate\Http\Request;

class ResourceHubController extends Controller
{
    public function index()
    {
        $items = ResourceHubItem::orderBy('category')->orderBy('id')->get();
        return response()->json(['data' => $items], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'        => 'required|string|max:255',
            'url'         => 'required|string|max:2048',
            'category'    => 'required|string|max:255',
            'color'       => 'required|string|max:50',
            'description' => 'nullable|string',
        ]);

        $item = ResourceHubItem::create($request->only('name', 'url', 'category', 'color', 'description'));

        return response()->json(['data' => $item], 201);
    }

    public function destroy($id)
    {
        $item = ResourceHubItem::findOrFail($id);
        $item->delete();
        return response()->json(['message' => 'Deleted'], 200);
    }
}
