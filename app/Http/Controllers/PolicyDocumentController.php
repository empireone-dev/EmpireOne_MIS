<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PolicyDocumentController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:pdf|max:51200',
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:100',
        ]);

        $file = $request->file('file');
        $originalName = $file->getClientOriginalName();

        // Sanitize filename to prevent path traversal
        $safeName = basename($originalName);
        $destination = public_path('documents');

        // If a file with the same name exists, append a counter
        if (file_exists($destination . DIRECTORY_SEPARATOR . $safeName)) {
            $nameWithoutExt = pathinfo($safeName, PATHINFO_FILENAME);
            $ext = pathinfo($safeName, PATHINFO_EXTENSION);
            $counter = 1;
            do {
                $safeName = $nameWithoutExt . " ({$counter})." . $ext;
                $counter++;
            } while (file_exists($destination . DIRECTORY_SEPARATOR . $safeName));
        }

        $file->move($destination, $safeName);

        return response()->json([
            'name'     => $request->input('name'),
            'file'     => $safeName,
            'category' => $request->input('category'),
        ], 201);
    }

    public function destroy(Request $request)
    {
        $request->validate([
            'file' => 'required|string|max:255',
        ]);

        // Sanitize to prevent path traversal
        $safeName = basename($request->input('file'));
        $filePath = public_path('documents') . DIRECTORY_SEPARATOR . $safeName;

        if (!file_exists($filePath)) {
            return response()->json(['message' => 'File not found.'], 404);
        }

        unlink($filePath);

        return response()->json(['message' => 'File deleted successfully.'], 200);
    }
}
