<?php

namespace App\Http\Controllers;

use App\Models\CompanyFormFolder;
use Illuminate\Http\Request;

class CompanyFormFolderController extends Controller
{
    public function index()
    {
        $folders = CompanyFormFolder::withCount('forms')
            ->orderBy('name')
            ->get();

        return response()->json(['data' => $folders], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:company_form_folders,name',
        ]);

        $folder = CompanyFormFolder::create([
            'name'        => $request->name,
            'description' => $request->description,
        ]);

        $folder->forms_count = 0;

        return response()->json([
            'data'    => $folder,
            'message' => 'Folder created successfully.',
        ], 201);
    }

    public function destroy($id)
    {
        $folder = CompanyFormFolder::findOrFail($id);
        // Unassign all files from this folder before deleting
        $folder->forms()->update(['folder_id' => null]);
        $folder->delete();

        return response()->json([
            'message' => 'Folder deleted successfully.',
        ], 200);
    }
}
