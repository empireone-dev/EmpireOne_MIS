<?php

namespace App\Http\Controllers;

use App\Models\CompanyForm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class CompanyFormController extends Controller
{
    public function index()
    {
        $forms = CompanyForm::orderBy('id', 'desc')->get();
        return response()->json([
            'data' => $forms
        ], 200);
    }

    public function store(Request $request)
    {
        // Only validate non-file fields — keeping 'file' out of validate() prevents
        // Laravel's implicit `uploaded` rule from firing when isValid() is false.
        $request->validate([
            'title' => 'required|string|max:255',
        ]);

        // Access the file directly from the raw files bag to bypass hasFile/isValid checks.
        $file = $request->files->get('file');

        Log::info('CompanyForm upload attempt', [
            'has_file'   => !is_null($file),
            'error_code' => $file ? $file->getError() : 'n/a',
            'is_valid'   => $file ? $file->isValid() : false,
            'file_name'  => $file ? $file->getClientOriginalName() : 'n/a',
        ]);

        if (!$file) {
            return response()->json([
                'message' => 'A file is required.',
                'errors'  => ['file' => ['A file is required.']],
            ], 422);
        }

        if (!$file->isValid()) {
            Log::error('CompanyForm file upload PHP error', ['error_code' => $file->getError()]);
            return response()->json([
                'message' => 'The file could not be processed. Please try again.',
                'errors'  => ['file' => ['The file could not be processed. Please try again.']],
            ], 422);
        }

        if ($file->getSize() > 104857600) {
            return response()->json([
                'message' => 'The file size cannot exceed 100MB.',
                'errors'  => ['file' => ['The file size cannot exceed 100MB.']],
            ], 422);
        }

        $fileName = $file->getClientOriginalName();
        $path     = $file->store('company_forms', 'public');

        $form = CompanyForm::create([
            'title'       => $request->title,
            'description' => $request->description,
            'file_path'   => $path,
            'file_name'   => $fileName,
            'uploaded_by' => $request->uploaded_by,
        ]);

        return response()->json([
            'data'    => $form,
            'message' => 'Form uploaded successfully.',
        ], 201);
    }

    public function destroy($id)
    {
        $form = CompanyForm::findOrFail($id);
        Storage::disk('public')->delete($form->file_path);
        $form->delete();

        return response()->json([
            'message' => 'Form deleted successfully.',
        ], 200);
    }
}
